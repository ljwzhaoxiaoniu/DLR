// Invalid-round classification. Transport kills / timeouts / finals-less streams
// land in questions.csv as FAIL + 0 tokens; without this split they read as
// capability regressions (thrombosis_secA q1149/1150/1152 are the precedent).
/**
 * @param {object} p
 * @param {object|null} p.ev       parsed ndjson QEvent (may be null/empty)
 * @param {number|null} p.rc       process exit code (null when killed/errored)
 * @param {boolean} p.killed       our timeout killed it
 * @param {string[]} p.errFatal    fatal lines from the .err (classifyDshErr)
 * @returns {{invalid: boolean, kind: string, detail: string}}
 */
export function classifyRound({ ev = null, rc = null, killed = false, errFatal = [] } = {}) {
  const emptyStream = !ev || (ev.tools === 0 && ev.steps === 0 && !ev.hasFinal && !ev.session);
  if (emptyStream) return { invalid: true, kind: "empty_stream", detail: "no events parsed" };
  if (killed) return { invalid: true, kind: "timeout", detail: "killed by timeout" };
  const reason = ev.turnEndReason;
  if (reason?.kind === "error") {
    const err = reason.error ?? {};
    if (err.code === "TRANSPORT" || /TRANSPORT/i.test(String(err.message ?? ""))) {
      return { invalid: true, kind: "transport", detail: err.message ?? "TRANSPORT" };
    }
    return { invalid: true, kind: "dsh_error", detail: err.message ?? JSON.stringify(reason) };
  }
  if (!reason) {
    return { invalid: true, kind: "no_turn_end", detail: "stream ended without turn_end (interrupted or killed)" };
  }
  if (reason.kind === "aborted") return { invalid: true, kind: "no_turn_end", detail: "turn aborted" };
  if (!ev.hasFinal || !ev.final.trim()) return { invalid: true, kind: "no_final", detail: "no non-empty final text" };
  if (rc !== null && rc !== 0) return { invalid: true, kind: "dsh_error", detail: `exit code ${rc}` };
  if (errFatal.length) return { invalid: true, kind: "dsh_error", detail: errFatal[0] };
  return { invalid: false, kind: "ok", detail: "" };
}
