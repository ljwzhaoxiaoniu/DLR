// Child-process helpers: shell-free spawn only (Windows `spawn("dsh")` -> ENOENT;
// shell:true would re-split arguments). Kill via child.kill() so no orphan trees.
import fs from "node:fs";
import { spawn } from "node:child_process";

/** Spawn with inherited stdio (live output), optional timeout kill. */
export function runInherit(cmd, argv, { cwd, env, timeoutMs = 0 } = {}) {
  return new Promise((resolve) => {
    const child = spawn(cmd, argv, { cwd, env, stdio: "inherit", windowsHide: true });
    let killed = false;
    const timer = timeoutMs
      ? setTimeout(() => {
          killed = true;
          child.kill();
        }, timeoutMs)
      : null;
    child.on("error", (e) => {
      if (timer) clearTimeout(timer);
      resolve({ rc: null, killed, error: String(e?.message ?? e) });
    });
    child.on("close", (rc) => {
      if (timer) clearTimeout(timer);
      resolve({ rc, killed });
    });
  });
}

/** Capture stdout/stderr with a timeout. */
export function runCapture(cmd, argv, { cwd, env, timeoutMs = 30000, input = null } = {}) {
  return new Promise((resolve) => {
    const child = spawn(cmd, argv, { cwd, env, stdio: ["pipe", "pipe", "pipe"], windowsHide: true });
    let out = "";
    let err = "";
    let killed = false;
    const timer = timeoutMs
      ? setTimeout(() => {
          killed = true;
          child.kill();
        }, timeoutMs)
      : null;
    child.stdout.on("data", (d) => (out += d));
    child.stderr.on("data", (d) => (err += d));
    child.on("error", (e) => {
      if (timer) clearTimeout(timer);
      resolve({ rc: null, killed, out, err, error: String(e?.message ?? e) });
    });
    child.on("close", (rc) => {
      if (timer) clearTimeout(timer);
      resolve({ rc, killed, out, err });
    });
    if (input !== null) child.stdin.end(input);
    else child.stdin.end();
  });
}

/**
 * Spawn with stdout/stderr redirected to files (equivalents of `> out 2> err`),
 * optional timeout via kill. Returns rc/killed/ms; used by the runner.
 */
export function runToFiles(cmd, argv, { cwd, env, outFile, errFile, timeoutMs = 0 } = {}) {
  const startedAt = Date.now();
  return new Promise((resolve) => {
    let outFd;
    let errFd;
    try {
      outFd = fs.openSync(outFile, "w");
      errFd = fs.openSync(errFile, "w");
    } catch (e) {
      resolve({ rc: null, killed: false, ms: 0, error: `cannot open output files: ${e.message}` });
      return;
    }
    const child = spawn(cmd, argv, { cwd, env, stdio: ["ignore", outFd, errFd], windowsHide: true });
    let killed = false;
    let settled = false;
    const timer = timeoutMs
      ? setTimeout(() => {
          killed = true;
          child.kill();
        }, timeoutMs)
      : null;
    const finish = (rc, error) => {
      if (settled) return;
      settled = true;
      if (timer) clearTimeout(timer);
      try {
        fs.closeSync(outFd);
        fs.closeSync(errFd);
      } catch {
        /* already closed */
      }
      resolve({ rc, killed, ms: Date.now() - startedAt, error });
    };
    child.on("error", (e) => finish(null, String(e?.message ?? e)));
    child.on("close", (rc) => finish(rc));
  });
}
