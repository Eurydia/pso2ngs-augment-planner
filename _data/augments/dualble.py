from itertools import combinations
from typing import List

from ._augment import (
    Augment,
    augment_from_list,
    multi_with_amount,
)
from ._augment_groups import DUALBLE
from effect import *


GROUP = DUALBLE
CONFLICT = (GROUP,)

augments: List[Augment] = []


# -------------------------------------------
_names = ("melra", "meltech", "ratech")
_amounts = (1.0075, 1.0125, 1.0175)
for name, effs in zip(_names, combinations(OFFENSIVE_POT, 2)):
    augments.extend(
        augment_from_list(
            f"{name} dualble",
            3,
            (4, 5, 6),
            multi_with_amount(effs, _amounts),
            GROUP,
            CONFLICT,
        )
    )
# -------------------------------------------
