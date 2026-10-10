/**
 * dlr-state 模型检索（服务路径，v2 口径）：问题 / 对象名 → 模型切片
 *
 * 返回三组，组内按 score 降序：
 *   - objects：命中的 LE（服务 / 节点 / 命名空间）+ 其观测面一览（名字出现时最有用）
 *   - surfaces：命中的观测面（PE，如 "<服务> pods / deployment / logs"）
 *   - relations：命中的 PAS 调用边
 *
 * 口径同 dlr_semantic_query（semanticQuery.ts）：全量召回 → 各组阈值优先 + 补满（每组至多 topK）。
 * 领路说明：本形态题面是症状、且措辞跨链重载——**症状 → 入口链的映射在 L2**（dlr_search_consensus），
 * 本工具供"走动中出现的对象/面名"与结构确认（L1 按对象名供给；症状裸问可能低分，属预期）。
 * 召回走 LanceDB `entities` 表（loadState v2 写入）；明细每次从场景 YAML 回填——源即真相，改源 rebuild 生效。
 */
import * as fs from "node:fs";
import * as path from "node:path";
import { parse } from "yaml";
import type { LanceHit, LanceStore } from "../store/lance.js";
import type { StateScenarioYaml } from "../model/types.js";
import { YAML_DIR } from "../config.js";

export interface StateModelSliceResult {
  success: boolean;
  confidence: number;
  data: {
    objects: {
      id: string;
      name: string;
      kind: string;
      description: string;
      score: number;
      surfaces: { id: string; kind: string; s: string; read: string }[];
    }[];
    surfaces: {
      id: string;
      name: string;
      owner: string;
      owner_name: string;
      resource: string;
      s: string;
      read: string;
      cardinality: string;
      attributes: { name: string; description: string }[];
      score: number;
    }[];
    relations: {
      id: string;
      name: string;
      from: string;
      to: string;
      from_name: string;
      to_name: string;
      verb: string;
      reverse_verb: string;
      a_attribute: string;
      s: string;
      score: number;
    }[];
  };
}

const lastSeg = (id: string): string => id.split(".").pop() ?? id;
const kindOf = (leId: string): string =>
  /\.node\./.test(leId) ? "node" : /\.namespace$/.test(leId) ? "namespace" : "service";

/**
 * 锚定读法（剪枝谓词）：面（PE）按锚取数的调用模板——ARCS 锚 = 取数时的 WHERE 键。
 * 返回体 = 该对象的薄切片而不是集群全量；agent 拿到即用（不试错、不反复拉全量清单）。
 */
function readHint(kind: string, ownerName: string, nsValue: string): string {
  switch (kind) {
    case "deployment":
      return `GetAppYAML(app_name=${ownerName})（列表可用 GetResources(deployments, label_selector=app=${ownerName})）`;
    case "pods":
      return `GetResources(pods, label_selector=app=${ownerName})；单 pod 详情用 DescribeResource(resource_type=pod, name=<命中名>)`;
    case "service_endpoints":
      return `GetResources(services, name=${ownerName})；端点对照 GetResources(endpoints, name=${ownerName})`;
    case "telemetry":
      return `GetAlerts()（按实体名 ${ownerName} 收窄阅读；告警是指针，证据回对象层闭环）`;
    case "logs":
      return `GetRecentLogs(service_name=${ownerName}) / GetErrorLogs(service_name=${ownerName})`;
    case "code":
      return `ListCodeFiles(service_name=${ownerName}) → GetSourceCode(app_name=…, file_path=<命中项>)`;
    case "node":
      return `DescribeResource(resource_type=node, name=${ownerName})；集群配置 GetClusterConfiguration()`;
    case "node_services":
      return `CheckNodeServiceStatus(node_name=${ownerName}, service_name=kubelet|containerd|kube-proxy|…)`;
    case "serviceaccounts":
      return `GetResources(serviceaccounts, namespace=${nsValue})`;
    case "rolebindings":
      return `GetResources(rolebindings, namespace=${nsValue})`;
    case "resourcequotas":
      return `GetResources(resourcequota, namespace=${nsValue})`;
    case "networkpolicies":
      return `GetResources(networkpolicies, namespace=${nsValue})`;
    case "config_objects":
      return `GetResources(configmaps|secrets|persistentvolumeclaims, namespace=${nsValue})`;
    default:
      return "";
  }
}

interface Index {
  les: Map<string, { name: string; kind: string; description: string; ns: string }>;
  pes: Map<
    string,
    { id: string; leId: string; kind: string; resource: string; s: string; cardinality: string; attributes: { name: string; description: string }[] }
  >;
  pas: Map<string, { id: string; name: string; from: string; to: string; verb: string; reverse: string; a: string; s: string }>;
  surfacesByLe: Map<string, { id: string; kind: string; s: string }[]>;
}

/** 场景 YAML（v2 文件）→ 明细索引；每次调用重建（百行级，开销可忽略） */
function loadIndex(): Index {
  const idx: Index = { les: new Map(), pes: new Map(), pas: new Map(), surfacesByLe: new Map() };
  for (const f of fs.readdirSync(YAML_DIR).filter((f) => f.endsWith(".yaml"))) {
    const sc = parse(fs.readFileSync(path.join(YAML_DIR, f), "utf8")) as StateScenarioYaml;
    if (sc.mapping_type !== "dlr-state" || !(sc.logical_entities ?? []).length) continue;
    const sysName = String((sc.source as Record<string, unknown> | undefined)?.system ?? "");
    const nsValue = sysName === "trainticket" ? "train-ticket" : sysName || "default";
    for (const le of sc.logical_entities ?? []) {
      idx.les.set(le.logical_entity_id, {
        name: le.biz_name,
        kind: kindOf(le.logical_entity_id),
        description: le.description ?? "",
        ns: nsValue,
      });
      for (const pe of le.physical_entities ?? []) {
        const kind = lastSeg(pe.physical_entity_id);
        idx.pes.set(pe.physical_entity_id, {
          id: pe.physical_entity_id,
          leId: le.logical_entity_id,
          kind,
          resource: pe.resource ?? "",
          s: pe.S ?? "",
          cardinality: pe.A?.cardinality ?? "",
          attributes: (pe.attributes ?? []).map((a) => ({ name: a.name, description: a.description ?? "" })),
        });
        const list = idx.surfacesByLe.get(le.logical_entity_id) ?? [];
        list.push({ id: pe.physical_entity_id, kind, s: pe.S ?? "" });
        idx.surfacesByLe.set(le.logical_entity_id, list);
      }
    }
    for (const r of sc.pas_relations ?? []) {
      const parts = r.relation_id.split("_TO_");
      if (parts.length !== 2) continue;
      idx.pas.set(r.relation_id, {
        id: r.relation_id,
        name: r.relation_name ?? "",
        from: parts[0],
        to: parts[1],
        verb: r.P?.forward?.verb ?? "",
        reverse: r.P?.reverse?.verb ?? "",
        a: typeof r.A === "string" ? r.A : "",
        s: r.S ?? "",
      });
    }
  }
  return idx;
}

/** 阈值优先 + 补满（同 semanticQuery 口径） */
function pick(hits: LanceHit[], topK: number, threshold: number): LanceHit[] {
  const above = hits.filter((h) => h.score >= threshold);
  const rest = hits.filter((h) => h.score < threshold);
  return (above.length >= topK ? above : above.concat(rest)).slice(0, topK);
}

const round4 = (n: number) => Math.round(n * 10000) / 10000;

export async function stateModelQuery(
  store: LanceStore,
  question: string,
  opts: { topK?: number; threshold?: number } = {},
): Promise<StateModelSliceResult> {
  const topK = opts.topK ?? 5;
  const threshold = opts.threshold ?? 0.5;

  const hits = (await store.search("entities", question)).sort((a, b) => b.score - a.score);
  const idx = loadIndex();

  const objHits = pick(hits.filter((h) => h.type === "logical_entity"), topK, threshold);
  const surHits = pick(hits.filter((h) => h.type === "entity"), topK, threshold);
  const relHits = pick(hits.filter((h) => h.type === "relation"), topK, threshold);

  const data: StateModelSliceResult["data"] = {
    objects: objHits.map((h) => {
      const r = idx.les.get(h.id ?? "");
      const ownerName = r?.name ?? h.name ?? "";
      const nsValue = r?.ns ?? "default";
      return {
        id: h.id ?? "",
        name: ownerName,
        kind: r?.kind ?? "",
        description: r?.description ?? h.description ?? "",
        score: round4(h.score),
        surfaces: (idx.surfacesByLe.get(h.id ?? "") ?? []).map((s) => ({
          ...s,
          read: readHint(s.kind, ownerName, nsValue),
        })),
      };
    }),
    surfaces: surHits.map((h) => {
      const r = idx.pes.get(h.id ?? "");
      const ownerName = idx.les.get(r?.leId ?? "")?.name ?? "";
      const nsValue = idx.les.get(r?.leId ?? "")?.ns ?? "default";
      return {
        id: h.id ?? "",
        name: r ? `${ownerName} ${r.kind}` : (h.name ?? ""),
        owner: r?.leId ?? "",
        owner_name: ownerName,
        resource: r?.resource ?? "",
        s: r?.s ?? "",
        read: r ? readHint(r.kind, ownerName, nsValue) : "",
        cardinality: r?.cardinality ?? "",
        attributes: r?.attributes ?? [],
        score: round4(h.score),
      };
    }),
    relations: relHits.map((h) => {
      const r = idx.pas.get(h.id ?? "");
      return {
        id: h.id ?? "",
        name: r?.name ?? h.name ?? "",
        from: r?.from ?? "",
        to: r?.to ?? "",
        from_name: idx.les.get(r?.from ?? "")?.name ?? lastSeg(r?.from ?? ""),
        to_name: idx.les.get(r?.to ?? "")?.name ?? lastSeg(r?.to ?? ""),
        verb: r?.verb ?? "",
        reverse_verb: r?.reverse ?? "",
        a_attribute: r?.a ?? "",
        s: r?.s ?? "",
        score: round4(h.score),
      };
    }),
  };

  const selected = [...objHits, ...surHits, ...relHits];
  const confidence = selected.length ? round4(Math.max(...selected.map((h) => h.score))) : 0;
  return { success: true, confidence, data };
}
