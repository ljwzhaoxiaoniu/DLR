import os, glob, csv, io, shutil

ROOT = r'D:\Code_Proj\DLR Proj'

# Load v2 tokens
v2 = {}
with open(os.path.join(ROOT, 'docs', 'results_v2.md'), encoding='utf-8') as f:
    for line in f:
        if not line.startswith('| ') or 'q' not in line[:20]:
            continue
        parts = [p.strip().replace(',','').replace('**','') for p in line.split('|')]
        if len(parts) < 15:
            continue
        qid = parts[2].lstrip('q')
        try:
            er = int(parts[12]) if parts[12] and parts[12] != chr(8212) else 0  # em-dash
            dlr = int(parts[13]) if parts[13] and parts[13] != chr(8212) else 0
            rdf = int(parts[14]) if parts[14] and parts[14] != chr(8212) else 0
            v2[qid] = {'er': er, 'dlr': dlr, 'rdf': rdf}
        except:
            pass

print(f'v2: {len(v2)} questions')

outputs_dir = os.path.join(ROOT, 'Evaluation', 'outputs')

# Phase 1: match by token
out_index = {}
for d in sorted(glob.glob(os.path.join(outputs_dir, '*/'))):
    stats = os.path.join(d, 'agent_stats.csv')
    if not os.path.exists(stats):
        continue
    with open(stats, encoding='utf-8-sig') as f:
        content = f.read()
    reader = csv.reader(io.StringIO(content))
    header = next(reader)
    cols = {h.strip().strip('"'): i for i, h in enumerate(header)}
    for row in reader:
        if not row or not row[0].strip().strip('"').isdigit():
            continue
        qid = row[cols.get('question_id', cols.get('q_id', 0))].strip().strip('"')
        paradigm = row[cols.get('paradigm', 1)].strip().strip('"').lower()
        tok_field = cols.get('tokens_total', cols.get('total_tokens', 3))
        token = 0
        if tok_field < len(row):
            try:
                token = int(row[tok_field].strip().strip('"'))
            except:
                pass
        if paradigm in ('er', 'dlr', 'rdf') and token > 0:
            out_index[(qid, paradigm, token)] = d

print(f'outputs index: {len(out_index)} entries')

# Phase 2: build fallback index (any run, any token)
fallback = {}
for d in sorted(glob.glob(os.path.join(outputs_dir, '*/'))):
    pred_dir = os.path.join(d, '02_predictions')
    if not os.path.exists(pred_dir):
        continue
    for p in ['er', 'dlr', 'rdf']:
        pp = os.path.join(pred_dir, p)
        if not os.path.exists(pp):
            continue
        for f in glob.glob(os.path.join(pp, '*.json')):
            qid = os.path.splitext(os.path.basename(f))[0]
            key = (qid, p)
            if key not in fallback:
                fallback[key] = f

print(f'fallback index: {len(fallback)} entries')

# Copy
copied = {'er': 0, 'dlr': 0, 'rdf': 0}
missed = {'er': [], 'dlr': [], 'rdf': []}

for qid, tokens in sorted(v2.items()):
    for p in ['er', 'dlr', 'rdf']:
        target = os.path.join(ROOT, 'validated_results', 'round_1', p, f'{qid}.json')
        if os.path.exists(target):
            continue
        tok = tokens[p]
        # Phase 1: exact token match
        key = (qid, p, tok)
        if key in out_index:
            src = os.path.join(out_index[key], '02_predictions', p, f'{qid}.json')
            if os.path.exists(src):
                shutil.copy2(src, target)
                copied[p] += 1
                continue
        # Phase 2: fallback - any run
        fkey = (qid, p)
        if fkey in fallback:
            shutil.copy2(fallback[fkey], target)
            copied[p] += 1
        else:
            missed[p].append(qid)

for p in ['er', 'dlr', 'rdf']:
    total = len(glob.glob(os.path.join(ROOT, 'validated_results', 'round_1', p, '*.json')))
    print(f'{p}: +{copied[p]} = {total}/132')
    if missed[p]:
        print(f'  缺: {missed[p][:10]}')
