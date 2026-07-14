"""Verify auto-generated RDF: detect duplicate TM IRIs and validate parentTriplesMap."""
import re
import pathlib
import sys

sys.stdout.reconfigure(encoding="utf-8")

rdf_dir = pathlib.Path(__file__).parent.parent / "configs" / "scenarios" / "RDF"


def analyze(text):
    """Analyze one TTL. Returns (unique_tms, refs, dups)."""
    # Unique TM IRIs: lines matching "<IRI> a rr:TriplesMap"
    tm_iri_pattern = re.compile(
        r"^<http://example\.org/tm/([^>]+)>\s*a\s+rr:TriplesMap", re.MULTILINE
    )
    all_tm_iris = tm_iri_pattern.findall(text)
    seen = {}
    for t in all_tm_iris:
        seen[t] = seen.get(t, 0) + 1
    dups = {k: v for k, v in seen.items() if v > 1}

    # parentTriplesMap references (any line with it)
    refs = []
    for ref in re.finditer(
        r"rr:parentTriplesMap <http://example\.org/tm/([^>]+)> ;"
        r" rr:joinCondition \[ rr:child \"([^\"]+)\" ;"
        r" rr:parent \"([^\"]+)\" \] \] \]",
        text,
    ):
        ref_table = ref.group(1).split("/")[-1]
        # find which TM block this belongs to: find preceding <IRI> a rr:TriplesMap
        pos = ref.start()
        pre = text[:pos]
        m = tm_iri_pattern.findall(pre)
        if m:
            tm_name = m[-1]
        else:
            tm_name = "?"
        refs.append((tm_name, ref_table, ref.group(2), ref.group(3)))

    return seen, refs, dups


print("=" * 70)
print("AUTO-GENERATED RDF VERIFICATION")
print("=" * 70)

total_issues = 0
for rdf_file in sorted(rdf_dir.glob("*.ttl")):
    db = rdf_file.stem
    text = rdf_file.read_text(encoding="utf-8")
    seen, refs, dups = analyze(text)
    has_issue = bool(dups)
    flag = "⚠️ " if has_issue else "✓"
    total_issues += len(dups)
    print(f"\n{flag}[{db}] unique_TMs={len(seen)}  parentTriplesMaps={len(refs)}")
    if dups:
        print(f"     DUPLICATE TM IRIs: {dups}")
    for t, rt, c, p in refs:
        print(f"     {t:18s} --({c:18s})--> {rt:18s}")

print(f"\n{'='*70}")
if total_issues:
    print(f"❌ TOTAL ISSUES: {total_issues} duplicate TM declarations found")
else:
    print("✓ ALL CLEAR: no duplicates")
