from typing import List

from ._augment import (
    Augment,
    EffectMultiLevel,
    augment_from_list,
    multi_with_amount,
)
from ._augment_groups import SECRETA
from effect import *


GROUP = SECRETA
CONFLICT = (GROUP,)

augments: List[Augment] = []

# -----------------------------------------------
augments.extend(
    augment_from_list(
        f"alts secreta",
        3,
        (3, 4, 5),
        (
            EffectMultiLevel(HP, (-10, -10, -10)),
            *multi_with_amount(OFFENSIVE_POT, (1.01, 1.015, 1.02)),
            EffectMultiLevel(FLOOR_POT, (1.01, 1.015, 1.02)),
            EffectMultiLevel(DMG_RES, (0.985, 0.985, 0.985)),
        ),
        GROUP,
        CONFLICT,
    )
)
# -----------------------------------------------
