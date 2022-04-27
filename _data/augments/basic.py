from typing import List

from ._augment import (
    Augment,
    many_effs_with_same_many_amounts,
)
from ._augment_groups import AugmentGroups
from effect import *
from effect import EffectTypes as ET

GROUP = AugmentGroups.BASIC
CONFLICT = (AugmentGroups.FUSED,)

augments: List[Augment] = []

# -------------------------------------------
# stamina
augments.extend(
    Augment.from_list(
        "stamina",
        3,
        (3, 4, 5),
        (EffectWithManyAmount(ET.HP, (5, 10, 15)),),
        GROUP,
        CONFLICT,
    )
)
# -------------------------------------------

# -------------------------------------------
# spirit
augments.extend(
    Augment.from_list(
        "spirit",
        3,
        (2, 3, 4),
        (EffectWithManyAmount(ET.PP, (3, 4, 5)),),
        GROUP,
        CONFLICT,
    )
)
# -------------------------------------------

# -------------------------------------------
# might precision technique
_off_aug_names = (
    "might",
    "precision",
    "technique",
)
for name, eff in zip(_off_aug_names, OFFENSIVE_POT):
    augments.extend(
        Augment.from_list(
            name,
            3,
            (4, 5, 6),
            (EffectWithManyAmount(eff, (1.01, 1.015, 1.02)),),
            GROUP,
            CONFLICT,
        )
    )
# -------------------------------------------

# -------------------------------------------
# deftness
augments.extend(
    Augment.from_list(
        "deftness",
        3,
        (3, 4, 5),
        (EffectWithManyAmount(ET.FLOOR_POT, (1.01, 1.015, 1.02)),),
        GROUP,
        CONFLICT,
    )
)
# -------------------------------------------

# -------------------------------------------
# guard
augments.extend(
    Augment.from_list(
        "guard",
        3,
        (2, 3, 4),
        (EffectWithManyAmount(ET.DMG_RES, (1.01, 1.015, 1.02)),),
        GROUP,
        CONFLICT,
    )
)
# -------------------------------------------

# -------------------------------------------
# mastery
_mastery_amts = (1.005, 1.01, 1.015, 1.025)
augments.extend(
    Augment.from_list(
        "mastery",
        4,
        (6, 8, 10, 12),
        (
            *many_effs_with_same_many_amounts(OFFENSIVE_POT, _mastery_amts),
            EffectWithManyAmount(ET.FLOOR_POT, _mastery_amts),
            EffectWithManyAmount(ET.DMG_RES, _mastery_amts),
        ),
        GROUP,
        tuple(),
    )
)
# -------------------------------------------
