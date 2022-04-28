from typing import List

from ._augment import Augment
from ._augment_groups import AugmentGroups
from effect import *
from effect import EffectTypes as ET
from util import many_effs_with_same_amount


GROUP = AugmentGroups.DOMINA
CONFLICT = (GROUP,)

augments: List[Augment] = []

# -------------------------------------------
# ael
augments.append(
    Augment(
        "ael domina",
        0,
        8,
        (
            Effect(ET.HP, 5),
            Effect(ET.PP, 3),
            *many_effs_with_same_amount(OFFENSIVE_POT, 1.015),
        ),
        GROUP,
        CONFLICT,
    )
)
# -------------------------------------------

# -------------------------------------------
# ret
augments.append(
    Augment(
        "ret domina",
        0,
        10,
        (
            Effect(ET.HP, 15),
            *many_effs_with_same_amount(OFFENSIVE_POT, 1.015),
        ),
        GROUP,
        CONFLICT,
    )
)
# -------------------------------------------
