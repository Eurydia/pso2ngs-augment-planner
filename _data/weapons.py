import json
from dataclasses import asdict
from typing import List

from weapons import all_weapons, Weapon

with open(f"./_data/result/weapons.json", "w") as f:
    weapons: List[Weapon] = []
    for group in all_weapons:
        weapons.extend(group)

    json.dump([*map(lambda weapon: asdict(weapon), weapons)], f, default=str)
