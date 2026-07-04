#!/usr/bin/env python3
"""Replace all Unsplash URLs in seed.ts with sfile.chatglm.cn Pinterest-quality URLs."""
import re

with open('/home/z/my-project/scripts/seed.ts', 'r') as f:
    content = f.read()

# Map Unsplash photo IDs to sfile.chatglm.cn replacement URLs
replacements = {
    # Project cover/gallery images
    'photo-1486406146926-c627a92ad1ab': '3798af9c6489',
    'photo-1600585154340-be6161a56a0c': '0024c6d74d40',
    'photo-1600596542815-ffad4c1539a9': 'd58f925cbb33',
    'photo-1538108149393-fbbd81895907': '7c5d190eeeb0',
    'photo-1562774053-701939374585': '2312697e1bf1',
    'photo-1566073771259-6a8506099945': '8fb05022dd78',
    'photo-1545324418-cc1a3fa10c00': 'b58aaa3097a1',
    'photo-1517089596392-fb9a9033e05b': '7e42ed57f175',
    # Service images
    'photo-1460317442991-0ec209395118': '6a06cefd6137',
    'photo-1505691938895-1758d7feb511': '16c0f2275b34',
    'photo-1497366811353-6870744d04b2': 'd93b8e9a44c3',
    'photo-1552321554-5fefe8c9ef14': '2409dae87492',
    'photo-1497366754035-f200968a6e72': '2923585a1383',
    'photo-1600585154526-990dced4db0d': 'd0e13f2c2f9e',
    'photo-1556909114-f6e7ad7d3136': '88d97ce59786',
    # Gallery extras
    'photo-1600566753190-17f0baa2a6c3': '16c0f2275b34',
    'photo-1600210492486-724fe5c67fb0': 'b224852c803a',
    'photo-1551882547-ff40c63fe5fa': 'be97eb1927e8',
    'photo-1618773928121-c3a42e63a8e0': 'be97eb1927e8',
    'photo-1512917774080-9991f1c4c750': '5f39f7695409',
    'photo-1551076805-e1869033e561': '9c98b45a3629',
    'photo-1586773860418-d37222d8fce3': 'c2a22867029d',
    'photo-1580582932707-520aed937b7b': 'c2a22867029d',
    'photo-1441986300917-64674bd600d8': 'be97eb1927e8',
    'photo-1620626011761-996317b8d101': '48db90ca7854',
    'photo-1565008447742-97f6f38c985c': '5f39f7695409',
    # Testimonial avatars — set to null
    'photo-1507003211169-0a1dd7228f2d': None,
    'photo-1494790108377-be9c29b29330': None,
    'photo-1612349317150-e413f6a5b16d': None,
    'photo-1438761681033-6461ffad8d80': None,
    'photo-1500648767791-00dcc994a43e': None,
    'photo-1573497019940-1c28c88b4f3e': None,
}

for old_id, new_id in replacements.items():
    if new_id is None:
        # Replace avatar URL with null
        content = re.sub(
            r'avatar:\s*"https://images\.unsplash\.com/' + re.escape(old_id) + r'[^"]*"',
            'avatar: null',
            content
        )
    else:
        # Replace the full URL
        old_pattern = r'https://images\.unsplash\.com/' + re.escape(old_id) + r'[^"]*'
        new_url = f'https://sfile.chatglm.cn/images-ppt/{new_id}.jpg'
        content = re.sub(old_pattern, new_url, content)

remaining = content.count('unsplash')
print(f'Remaining unsplash references: {remaining}')

with open('/home/z/my-project/scripts/seed.ts', 'w') as f:
    f.write(content)
print('Seed file updated.')
