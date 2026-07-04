#!/usr/bin/env python3
"""Fix straight apostrophes in user-visible copy to smart quotes."""
import os, re

def fix_apostrophes(s):
    """Replace ' in contractions and possessives with smart quote."""
    return re.sub(r"([A-Za-z])'([A-Za-z])", lambda m: m.group(1) + "\u2019" + m.group(2), s)

def process_file(path):
    with open(path, 'r') as f:
        original = f.read()
    
    new = original
    
    # Fix in double-quoted strings
    def fix_dq(m):
        return '"' + fix_apostrophes(m.group(1)) + '"'
    new = re.sub(r'"([^"\n]*)"', fix_dq, new)
    
    # Fix in backtick strings (template literals)
    def fix_bt(m):
        return '`' + fix_apostrophes(m.group(1)) + '`'
    new = re.sub(r'`([^`]*?)`', fix_bt, new, flags=re.DOTALL)
    
    if new != original:
        count = original.count("'") - new.count("'")
        with open(path, 'w') as f:
            f.write(new)
        return count
    return 0

total = 0
for root, dirs, files in os.walk('src'):
    for f in files:
        if f.endswith(('.tsx', '.ts')):
            path = os.path.join(root, f)
            n = process_file(path)
            if n > 0:
                print(f"  {n} fixes in {path}")
                total += n

print(f"Total: {total} apostrophes fixed")
