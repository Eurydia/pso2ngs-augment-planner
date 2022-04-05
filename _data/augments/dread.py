from typing import List

from ._augment import (
    Augment,
    EffectMultiLevel,
    augment_from_list,
)
from ._augment_groups import DREAD
from effect import *


GROUP = DREAD
CONFLICT = (GROUP,)

augments: List[Augment] = []


_amount = (1.01, 1.015, 1.02)
augments.extend(
    augment_from_list(
        "dread keeper",
        3,
        (
            EffectMultiLevel(HP, (10, 15, 30)),
            EffectMultiLevel(PP, (3, 4, 7)),
            EffectMultiLevel(FLOOR_POT, _amount),
            EffectMultiLevel(DMG_RES, _amount),
        ),
        GROUP,
        CONFLICT,
    )
)
