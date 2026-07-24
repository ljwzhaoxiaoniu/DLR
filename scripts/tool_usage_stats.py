"""Analyze tool usage from Stage 1 logs across all paradigms and verdicts."""
import os, json, csv
from collections import defaultdict

BASE = 'Evaluation/outputs/01_logs'

# Collect verdicts from CSVs (all paradigms, all runs)
verdicts = {}  # (paradigm, qid) -> verdict
output_dir = 'Evaluation/outputs'
for d in os.listdir(output_dir):
    if not d.startswith('072') or not d.endswith('_EDR'):
        continue
    for p in ['er', 'dlr', 'rdf']:
        csv_path = f'{output_dir}/{d}/03_reports/{p}.csv'
        if not os.path.exists(csv_path):
            continue
        with open(csv_path, encoding='utf-8') as f:
            reader = csv.DictReader(f)
            for row in reader:
                qid = row.get('q_id', '')
                verdict = row.get('verdict', 'INCORRECT')
                verdicts[(p, qid)] = verdict

# Tool usage stats
tool_stats = defaultdict(lambda: {'total': 0, 'correct': 0, 'incorrect': 0, 'tokens': []})

for run_dir in sorted(os.listdir(BASE)):
    run_path = os.path.join(BASE, run_dir)
    if not os.path.isdir(run_path):
        continue
    for p in ['er', 'dlr', 'rdf']:
        p_dir = os.path.join(run_path, p)
        if not os.path.isdir(p_dir):
            continue
        for fname in os.listdir(p_dir):
            if not fname.endswith('.json'):
                continue
            qid = fname.replace('.json', '')
            verdict = verdicts.get((p, qid), 'UNKNOWN')

            with open(os.path.join(p_dir, fname), encoding='utf-8') as f:
                for line in f:
                    try:
                        data = json.loads(line)
                    except:
                        continue
                    if data.get('type') == 'tool_use':
                        tool_name = data['part']['tool']
                        # Strip prefix for readability
                        short_name = tool_name.replace('semantic-core_', '')

                        tool_stats[(p, short_name)]['total'] += 1
                        if verdict == 'CORRECT':
                            tool_stats[(p, short_name)]['correct'] += 1
                        elif verdict == 'INCORRECT':
                            tool_stats[(p, short_name)]['incorrect'] += 1
                    elif data.get('type') == 'step_finish':
                        tokens = data['part'].get('tokens', {}).get('total', 0)
                        # We can't associate tokens with specific tools,
                        # but we can track total tokens per run

# Print results
for paradigm in ['er', 'dlr', 'rdf']:
    print(f'\n{"="*60}')
    print(f'  {paradigm.upper()} 工具使用统计')
    print(f'{"="*60}')
    print(f'{"Tool":<30} {"Total":>6} {"Correct":>8} {"Wrong":>8} {"Rate":>8}')
    print(f'{"-"*60}')

    tools = [(k, v) for (p, k), v in tool_stats.items() if p == paradigm]
    tools.sort(key=lambda x: x[1]['total'], reverse=True)

    for name, stats in tools:
        if stats['total'] < 2:  # Skip very rare tools
            continue
        correct = stats['correct']
        total = stats['total']
        incorrect = stats['incorrect']
        rate = f'{correct/total*100:.0f}%' if total > 0 else '-'
        print(f'{name:<30} {total:>6} {correct:>8} {incorrect:>8} {rate:>8}')
