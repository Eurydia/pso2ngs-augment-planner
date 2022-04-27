from typing import List

from ._augment import Augment
from ._augment_groups import AugmentGroups
from effect import *
from effect import EffectTypes as ET

GROUP = AugmentGroups.DREAD
CONFLICT = (GROUP,)

augments: List[Augment] = []

# -------------------------------------------
_amts = (1.01, 1.015, 1.02)
augments.extend(
    Augment.from_list(
        "dread keeper",
        3,
        (7, 7.5, 10),
        (
            EffectWithManyAmount(ET.HP, (10, 15, 30)),
            EffectWithManyAmount(ET.PP, (3, 4, 7)),
            EffectWithManyAmount(ET.FLOOR_POT, _amts),
            EffectWithManyAmount(ET.DMG_RES, _amts),
        ),
        GROUP,
        CONFLICT,
    )
)
# -------------------------------------------
