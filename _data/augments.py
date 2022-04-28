import json
from dataclasses import asdict
from typing import List

from augments import all_augments, Augment


with open(f"./_data/result/augments.json", "w") as f:
    augs: List[Augment] = []
    for group in all_augments:
        augs.extend(group)

    json.dump([*map(lambda aug: asdict(aug), augs)], f, default=str)
