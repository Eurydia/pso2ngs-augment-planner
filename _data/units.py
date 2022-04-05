import json
from dataclasses import asdict
from typing import List

from units import all_units, Unit

with open(f"./_data/result/units.json", "w") as f:
    units: List[Unit] = []
    for group in all_units:
        units.extend(group)

    json.dump([*map(lambda unit: asdict(unit), units)], f)
