"""DLR retrieval tools for the BizAgentBench agent surface.

These three tools replace search_knowledge/read_document in the agent surface.
They call the local DLR bridge (eval/dlr_server.mjs).
"""

from __future__ import annotations

import httpx

BASE = "http://127.0.0.1:28797"

# Active model system for this runner: "operations_desk" (cases 1-30) or "psp" (cases 31-50).
# run_dlr.py sets it from --numbers before the evaluation starts.
SYSTEM = "operations_desk"


def set_system(system: str) -> None:
    global SYSTEM
    SYSTEM = system


def _post(path: str, payload: dict) -> dict:
    with httpx.Client(timeout=30) as client:
        response = client.post(BASE + path, json=payload)
        response.raise_for_status()
        return response.json()


def dlr_l1(question: str) -> dict:
    """L1 model query: a business question or object name returns the matching business objects.

    Each object carries its business lifecycle and the capabilities (APIs) mounted on it, each
    capability with its anchor parameter and guard. Record surfaces give the exact collection and
    the anchored read template (search_records filter). Relations give the neighbouring objects.
    Use this instead of searching knowledge documents when you need to know which object a request
    concerns, where it is read from, or which APIs act on it.
    The response also lists public_resources: the only collection names search_records accepts in
    this portal. Do not guess collection names.

    Args:
        question: natural-language business question, customer request or object name.
    """
    return _post("/l1", {"question": question, "system": SYSTEM})


def dlr_l2(question: str, namespace: str = "") -> dict:
    """L2 domain consensus: cross-object conventions and product rules, not raw records.

    Returns short knowledge entries: units, quotes vs settlement, per-payment fees, reserve
    conditions, amendment vs allocation, evidence versions, service and rail rules. Leave
    namespace empty for a cross-object recall; otherwise pass the namespace shown by dlr_l1
    ("operations_desk" or "psp").

    Args:
        question: the convention or rule you need, in business terms.
        namespace: optional namespace, normally operations_desk or psp.
    """
    return _post("/l2", {"question": question, "namespace": namespace, "system": SYSTEM})


def dlr_l3(question: str) -> dict:
    """L3 SOP: the problem-class playbook for this customer request, if one exists.

    match=exact means the section title restates this problem verbatim; that section is the
    authoritative playbook for the case. match=similar means the customer paraphrased the opening or
    the candidates are near neighbours: read them and adopt one only if its section restates the same
    customer request; otherwise solve from L1 and L2. match=none means no L3 section for this case.

    Args:
        question: the customer's opening request, verbatim when possible.
    """
    return _post("/l3", {"question": question, "system": SYSTEM})
