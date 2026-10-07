#!/usr/bin/env node
// dsh-eval entry point: parse argv, dispatch, set the process exit code.
import { main } from "../lib/cli.mjs";

process.exitCode = await main(process.argv.slice(2));
