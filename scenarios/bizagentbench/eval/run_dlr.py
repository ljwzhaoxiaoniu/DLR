"""BizAgentBench runner: DLR retrieval tools instead of upstream knowledge tools.

Agent surface becomes:
  dlr_l1 / dlr_l2 / dlr_l3  +  search_records / get_record / get_clock /
  unlock_discoverable_agent_tool / call_discoverable_agent_tool / execute_request /
  record_case_outcome

Everything else (user simulator, environment, deterministic verifier) is unchanged.
Paths: BIZAGENTBENCH_DIR points to the dataset checkout (default: the local copy).
"""

from __future__ import annotations

import os
import sys
from pathlib import Path

HERE = Path(__file__).resolve().parent
BENCH = Path(os.environ.get("BIZAGENTBENCH_DIR", "D:/Code_Proj/Dataset/BizAgentBench-main"))
sys.path[:0] = [str(BENCH), str(BENCH / "third_party" / "tau2-bench" / "src"), str(HERE)]

import dlr_tools  # noqa: E402
import payment.runtime.interaction.domain as domain  # noqa: E402

_ORIGINAL = domain.get_environment
_ADDED = {
    "dlr_l1": dlr_tools.dlr_l1,
    "dlr_l2": dlr_tools.dlr_l2,
    "dlr_l3": dlr_tools.dlr_l3,
}
_POLICY_NOTE = (
    " Retrieval is provided by dlr_l1 (business objects, record surfaces, mounted capabilities, "
    "lifecycles and relations), dlr_l2 (cross-object conventions) and dlr_l3 (the problem-class "
    "playbook). There is no free-text knowledge search and no document reader; read actual records "
    "with search_records and get_record."
)


def _augment(env):
    callbacks = env.tools._callbacks
    callbacks.pop("search_knowledge", None)
    callbacks.pop("read_document", None)
    callbacks.update(_ADDED)
    env.policy = env.policy + _POLICY_NOTE
    return env


def get_environment(*args, **kwargs):
    return _augment(_ORIGINAL(*args, **kwargs))


domain.get_environment = get_environment

def _system_for_numbers(argv: list[str]) -> str:
    """Cases 1-30 are Operations Desk; 31-50 are Payment Expansion (psp)."""
    nums: list[str] = []
    for i, a in enumerate(argv):
        if a == "--numbers" and i + 1 < len(argv):
            nums = [x.strip() for x in argv[i + 1].split(",") if x.strip()]
        elif a.startswith("--numbers="):
            nums = [x.strip() for x in a.split("=", 1)[1].split(",") if x.strip()]
    if nums and all(n.isdigit() and int(n) >= 31 for n in nums):
        return "psp"
    return "operations_desk"


if __name__ == "__main__":
    dlr_tools.set_system(_system_for_numbers(sys.argv[1:]))
    from tools.evaluate import main

    main()
