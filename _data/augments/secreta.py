from typing import List

from ._augment import Augment
from ._augment_groups import AugmentGroups
from effect import *
from effect import EffectTypes as ET
from util import many_effs_with_same_many_amounts

GROUP = AugmentGroups.SECRETA
CONFLICT = (GROUP,)

augments: List[Augment] = []

# -----------------------------------------------
augments.extend(
    Augment.from_list(
        f"alts secreta",
        3,
        (3, 4, 5),
        (
            EffectWithManyAmount(ET.HP, (-10, -10, -10)),
            *many_effs_with_same_many_amounts(OFFENSIVE_POT, (1.01, 1.015, 1.02)),
            EffectWithManyAmount(ET.FLOOR_POT, (1.01, 1.015, 1.02)),
            EffectWithManyAmount(ET.DMG_RES, (0.985, 0.985, 0.985)),
        ),
        GROUP,
        CONFLICT,
    )
)
# -----------------------------------------------
