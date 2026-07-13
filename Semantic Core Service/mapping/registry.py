"""
Mapper registry — dispatch by mapping_type.

Usage:
    from mapping.registry import get_mapper
    mapper = get_mapper("er")      # returns ERSemanticMapper instance
    model = mapper.parse(config, physical_tables)
"""
from typing import Dict

from mapping.base import SemanticMapperABC

# Lazy imports avoid circular dependencies and heavy module loading at startup.
_REGISTRY: Dict[str, type] = {}


def register(mapping_type: str):
    """Decorator to register a mapper class for a given mapping_type."""
    def decorator(cls: type):
        cls.mapping_type = mapping_type
        _REGISTRY[mapping_type] = cls
        return cls
    return decorator


def get_mapper(mapping_type: str) -> SemanticMapperABC:
    """Return a mapper instance for the given mapping_type.

    Raises:
        ValueError: if mapping_type is unknown.
    """
    cls = _REGISTRY.get(mapping_type)
    if cls is None:
        available = ", ".join(sorted(_REGISTRY.keys())) or "(none)"
        raise ValueError(
            f"Unknown mapping_type '{mapping_type}'. Available: {available}"
        )
    return cls()


def available_types():
    """Return list of registered mapping types."""
    return list(_REGISTRY.keys())


# ---------------------------------------------------------------------------
# Trigger registration of concrete mappers.
# Importing these modules executes the @register decorator.
# ---------------------------------------------------------------------------
def _ensure_registry():
    """Import concrete mappers to populate the registry (idempotent)."""
    for mod_name in ("mapping.er", "mapping.dlr", "mapping.rdf"):
        try:
            __import__(mod_name)
        except ImportError:
            pass


# Auto-populate on first get_mapper call.
_original_get_mapper = get_mapper


def get_mapper(mapping_type: str) -> SemanticMapperABC:  # noqa: F811
    _ensure_registry()
    return _original_get_mapper(mapping_type)
