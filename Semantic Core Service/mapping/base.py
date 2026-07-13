"""
Semantic Mapper — abstract base + scenario models.

Two concrete scenario models:
  - ERScenarioModel  : ER paradigm (BizEntity / BizAttribute / BizRelation)
  - DLRScenarioModel  : DLR paradigm (LogicalEntity / PhysicalEntity / PASRelation)

Each mapper's parse() consumes (config_dict, physical_tables) and returns one of
these models. BuildService.build(model) dispatches on model type.
"""
from abc import ABC, abstractmethod
from dataclasses import dataclass, field
from typing import Any, Dict, List, Optional

# Re-export the concrete domain models so downstream code can import from one place.
from models.semantic_models import (
    # ER models
    BizEntity,
    BizAttribute,
    BizRelation,
    # DLR models
    PhysicalEntity,
    PhysicalAttribute,
    PhysicalRelation,
    LogicalEntity,
    LogicalAttribute,
    LogicalRelation,
    PASRelation,
    PASPredicate,
    ARCSSatellite,
)
from models.physical_models import PhysicalTable


def _extract_le_names_from_id(relation_id: str):
    """Extract (from_le_name, to_le_name) from relation_id like 'LOGICAL.变压器_TO_LOGICAL.线损'."""
    parts = relation_id.split("_TO_")
    if len(parts) == 2:
        from_le = parts[0].split(".")[-1] if "." in parts[0] else parts[0]
        to_le = parts[1].split(".")[-1] if "." in parts[1] else parts[1]
        return from_le, to_le
    return relation_id, ""


# ---------------------------------------------------------------------------
# Scenario Models — the unified output of every mapper
# ---------------------------------------------------------------------------

@dataclass
class ScenarioModel:
    """Base class for all mapping-type-specific scenario outputs.

    Subclasses carry the concrete entity/relation lists. BuildService
    dispatches on isinstance() to call the correct Kuzu/FAISS writer.
    """
    mapping_type: str = ""
    scenario_name: str = ""
    schema_version: str = "1.0"
    databases: Dict[str, str] = field(default_factory=dict)


@dataclass
class ERScenarioModel(ScenarioModel):
    """Output of ERSemanticMapper — ER paradigm."""
    mapping_type: str = "er"
    biz_entities: List[BizEntity] = field(default_factory=list)
    biz_relations: List[BizRelation] = field(default_factory=list)


@dataclass
class DLRScenarioModel(ScenarioModel):
    """Output of DLRSemanticMapper — DLR (Logical-Physical Dual Layer) paradigm."""
    mapping_type: str = "dlr"
    logical_entities: List[LogicalEntity] = field(default_factory=list)
    physical_entities: List[PhysicalEntity] = field(default_factory=list)
    pas_relations: List[PASRelation] = field(default_factory=list)


# ---------------------------------------------------------------------------
# Abstract Mapper
# ---------------------------------------------------------------------------

class SemanticMapperABC(ABC):
    """Abstract base for all semantic mappers.

    Subclasses must set ``mapping_type`` and implement ``parse``.
    """

    mapping_type: str = ""

    @abstractmethod
    def parse(
        self,
        config: Dict[str, Any],
        physical_tables: Optional[List[PhysicalTable]] = None,
    ) -> ScenarioModel:
        """Parse YAML config + physical tables into a ScenarioModel.

        Args:
            config: Parsed YAML scenario config dict.
            physical_tables: List of PhysicalTable from PhysicalScanner.
                Some mappers (e.g. ER) need this to resolve column data types;
                others (e.g. DLR) can ignore it.

        Returns:
            A ScenarioModel subclass (ERScenarioModel or DLRScenarioModel).
        """
        ...

    def validate(self, model: ScenarioModel) -> bool:
        """Optional post-parse validation. Override in subclass if needed."""
        return True
