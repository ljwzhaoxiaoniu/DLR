"""
RDFSemanticMapper — R2RDF paradigm (RESERVED, not yet implemented).

This is a placeholder stub. The R2RDF adapter will parse a YAML config
with W3C R2R-style triple mappings (subject_template + predicate_object)
and produce an RDFScenarioModel.

To implement: subclass SemanticMapperABC, implement parse(), and add
RDFScenarioModel to mapping/base.py.
"""
from typing import Any, Dict, List, Optional

from models.physical_models import PhysicalTable
from utils.logger import logger

from mapping.base import ScenarioModel, SemanticMapperABC
from mapping.registry import register


@register("rdf")
class RDFSemanticMapper(SemanticMapperABC):
    """R2RDF paradigm mapper — reserved, not yet implemented."""

    mapping_type = "rdf"

    def parse(
        self,
        config: Dict[str, Any],
        physical_tables: Optional[List[PhysicalTable]] = None,
    ) -> ScenarioModel:
        raise NotImplementedError(
            "RDFSemanticMapper is not yet implemented. "
            "Contribute an RDFScenarioModel + parse() to mapping/rdf.py."
        )
