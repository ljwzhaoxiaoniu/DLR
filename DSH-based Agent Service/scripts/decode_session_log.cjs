// 解码 dsh 的 session.v4.jsonl.zstd（多帧拼接）：
// Node 的 zstdDecompressSync / createZstdDecompress 只解第一帧，
// 这里按 zstd 魔数切帧、逐帧独立解码后拼接。
const { zstdDecompressSync } = require("zlib");
const fs = require("fs");

function decodeAll(file) {
  const b = fs.readFileSync(file);
  const magic = [0x28, 0xb5, 0x2f, 0xfd];
  const cuts = [];
  for (let i = 0; i + 3 < b.length; i++) {
    if (b[i] === magic[0] && b[i + 1] === magic[1] && b[i + 2] === magic[2] && b[i + 3] === magic[3]) cuts.push(i);
  }
  cuts.push(b.length);
  const outs = [];
  let i = 0;
  while (i < cuts.length - 1) {
    let done = false;
    for (let j = i + 1; j < cuts.length; j++) {
      try { outs.push(zstdDecompressSync(b.subarray(cuts[i], cuts[j]))); i = j; done = true; break; } catch {}
    }
    if (!done) break;
  }
  return Buffer.concat(outs).toString("utf8");
}

for (const f of process.argv.slice(2)) {
  try {
    const t = decodeAll(f);
    const recs = t.split("\n").filter(Boolean);
    const types = {};
    for (const r of recs) { try { const o = JSON.parse(r); types[o.type] = (types[o.type] || 0) + 1; } catch {} }
    console.log("FILE", f.split("/").slice(-2)[0]);
    console.log("  records=", recs.length, "bytes=", t.length, "types=", JSON.stringify(types));
    for (const key of ["dlr_search_consensus", "dlr_semantic_query", "execute_sql", "skill"]) console.log("   contains", key, "=", t.includes(key));
    console.log("   tail:", recs[recs.length - 1].slice(0, 150));
  } catch (e) { console.log("FILE", f, "ERROR", e.message); }
}
