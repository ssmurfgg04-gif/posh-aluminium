#!/usr/bin/env python3
"""
Replace em-dashes (—) per taste-skill v2 complete em-dash ban.
Rules:
- In CSS comments or JS/TS comments: leave alone (not user-visible copy)
- In string literals / JSX text: replace based on context:
  - "word — word" (clause separator) → "word. Word" or "word, word"
  - "08:00 — 18:00" (range) → "08:00 to 18:00"
  - "Item — description" (label separator) → "Item: description"
  - Standalone em-dash at sentence start → bullet or remove
"""
import os, re

# Files to process
TARGET_DIRS = ["src"]

def replace_emdash_in_string(s: str) -> str:
    """Replace em-dashes in a string value with appropriate punctuation."""
    # Range pattern: "NN:NN — NN:NN" or "NN — NN" → "NN:NN to NN:NN"
    s = re.sub(r'(\d+(?::\d+)?)\s*—\s*(\d+(?::\d+)?)', r'\1 to \2', s)
    # Range pattern: "YYYY — YYYY" → "YYYY to YYYY"
    s = re.sub(r'(\d{4})\s*—\s*(\d{4})', r'\1 to \2', s)
    # Label pattern: "Word — description" where Word is short (1-3 words, no verb)
    # → "Word: description"
    s = re.sub(r'^([A-Z][A-Za-z\s&]{1,30}?)\s*—\s+', r'\1: ', s)
    s = re.sub(r'([A-Z][A-Za-z\s&]{1,30}?)\s*—\s+', r'\1: ', s)
    # Mid-sentence clause separator " — " → ". " (start new sentence) if next word is Capitalized
    s = re.sub(r'\s*—\s+([A-Z])', r'. \1', s)
    # Otherwise " — " → ", "
    s = re.sub(r'\s*—\s*', ', ', s)
    return s

def process_file(path: str) -> int:
    """Process a file, return number of replacements made."""
    with open(path, 'r') as f:
        original = f.read()
    
    if '—' not in original:
        return 0
    
    new_content = original
    
    # Replace in double-quoted strings: "..."
    def replace_in_dq(m):
        return '"' + replace_emdash_in_string(m.group(1)) + '"'
    new_content = re.sub(r'"([^"\n]*)"', replace_in_dq, new_content)
    
    # Replace in single-quoted strings: '...'
    def replace_in_sq(m):
        return "'" + replace_emdash_in_string(m.group(1)) + "'"
    new_content = re.sub(r"'([^'\n]*)'", replace_in_sq, new_content)
    
    # Replace in template literals: `...` (handle multi-line)
    def replace_in_template(m):
        return '`' + replace_emdash_in_string(m.group(1)) + '`'
    new_content = re.sub(r'`([^`]*?)`', replace_in_template, new_content, flags=re.DOTALL)
    
    # Replace in JSX text content: >text with em-dash<
    # Match text between > and < that contains em-dash
    def replace_in_jsx_text(m):
        return '>' + replace_emdash_in_string(m.group(1)) + '<'
    new_content = re.sub(r'>([^<>{}\n]*—[^<>{}\n]*)<', replace_in_jsx_text, new_content)
    
    if new_content != original:
        replacements = original.count('—') - new_content.count('—')
        with open(path, 'w') as f:
            f.write(new_content)
        return replacements
    return 0

total = 0
files_changed = 0
for root, dirs, files in os.walk('src'):
    for f in files:
        if f.endswith(('.tsx', '.ts')):
            path = os.path.join(root, f)
            n = process_file(path)
            if n > 0:
                files_changed += 1
                total += n
                print(f"  {n:3d} replacements in {path}")

print(f"\nTotal: {total} em-dashes replaced across {files_changed} files")
