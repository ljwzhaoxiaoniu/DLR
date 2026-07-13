"""
Mapping package — semantic model adapters.

Each adapter parses a scenario YAML config + physical tables into a ScenarioModel,
which BuildService then persists into Kuzu + FAISS.

Supported mapping types:
  - "er"  : Entity-Relation (BizEntity / BizAttribute / BizRelation)
  - "dlr" : Logical-Physical Dual Layer (LogicalEntity / PhysicalEntity / PASRelation / ARCSSatellite)
  - "rdf" : R2RDF (reserved, not yet implemented)
"""

from mapping.base import (
    SemanticMapperABC,
    ScenarioModel,
    ERScenarioModel,
    DLRScenarioModel,
)
from mapping.registry import get_mapper

__all__ = [
    "SemanticMapperABC",
    "ScenarioModel",
    "ERScenarioModel",
    "DLRScenarioModel",
    "get_mapper",
]
