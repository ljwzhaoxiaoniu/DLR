// Small shared helpers.
import crypto from "node:crypto";
import fs from "node:fs";

/** Keep in sync with package.json. */
export const VERSION = "0.1.0";

/** Errors that carry a user-facing message (cli.mjs prints evalMessage, exit 3). */
export class EvalError extends Error {
  constructor(msg) {
    super(msg);
    this.name = "EvalError";
    this.evalMessage = msg;
  }
}

export function sha1Text(s) {
  return crypto.createHash("sha1").update(s).digest("hex");
}

export function sha1File(file) {
  return sha1Text(fs.readFileSync(file));
}

export function readJson(file) {
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

export function exists(p) {
  try {
    fs.accessSync(p);
    return true;
  } catch {
    return false;
  }
}

/** Compact a whitespace run (same caliber as grade.ts display columns). */
export function squeeze(s) {
  return String(s ?? "").replace(/\s+/g, " ").trim();
}
