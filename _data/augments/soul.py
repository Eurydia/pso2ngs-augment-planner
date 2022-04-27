from typing import List

from ._augment import Augment
from ._augment_groups import AugmentGroups
from effect import *
from effect import EffectTypes as ET
from util import many_effs_with_same_many_amounts

GROUP = AugmentGroups.SOUL
CONFLICT = (GROUP,)

augments: List[Augment] = []

# -----------------------------------------------
augments.extend(
    Augment.from_list(
        f"alts soul",
        3,
        (5, 7, 9),
        (
            EffectWithManyAmount(ET.HP, (5, 10, 15)),
            EffectWithManyAmount(ET.DMG_RES, (1.01, 1.02, 1.025)),
        ),
        GROUP,
        CONFLICT,
    )
)
# -----------------------------------------------

# -----------------------------------------------
augments.extend(
    Augment.from_list(
        f"dolz soul",
        3,
        (5, 6, 7),
        (
            EffectWithManyAmount(ET.PP, (5, 5, 5)),
            EffectWithManyAmount(ET.FLOOR_POT, (1.01, 1.02, 1.025)),
        ),
        GROUP,
        CONFLICT,
    )
)
# ------------------------------------------------

# -----------------------------------------------
_forms_name = ("forms", "forms machini", "form sand")
for name, eff in zip(_forms_name, OFFENSIVE_POT):
    augments.extend(
        Augment.from_list(
            f"{name} soul",
            3,
            (6, 8, 9),
            (
                EffectWithManyAmount(eff, (1.02, 1.02, 1.02)),
                EffectWithManyAmount(ET.DMG_RES, (1, 1.02, 1.025)),
            ),
            GROUP,
            CONFLICT,
        )
    )
# ------------------------------------------------

# -----------------------------------------------
_boss_one = ("daityl", "pettas", "nex")
for name, eff in zip(_boss_one, OFFENSIVE_POT):
    augments.extend(
        Augment.from_list(
            f"{name} soul",
            3,
            (7, 8, 10),
            (
                EffectWithManyAmount(ET.PP, (5, 5, 5)),
                EffectWithManyAmount(eff, (1.01, 1.02, 1.025)),
            ),
            GROUP,
            CONFLICT,
        )
    )
# ------------------------------------------------

# -----------------------------------------------
_boss_two = ("dust", "ragras", "renus")
for name, eff in zip(_boss_two, OFFENSIVE_POT):
    augments.extend(
        Augment.from_list(
            f"{name} soul",
            3,
            (7, 8, 10),
            (
                EffectWithManyAmount(ET.HP, (15, 15, 15)),
                EffectWithManyAmount(eff, (1.01, 1.02, 1.025)),
            ),
            GROUP,
            CONFLICT,
        )
    )
# ------------------------------------------------

# -----------------------------------------------
augments.extend(
    Augment.from_list(
        "eradi soul",
        3,
        (7, 8, 10),
        (
            EffectWithManyAmount(ET.HP, (10, 10, 10)),
            EffectWithManyAmount(ET.PP, (4, 4, 4)),
            *many_effs_with_same_many_amounts(OFFENSIVE_POT, (1.0125, 1.0175, 1.0225)),
        ),
        GROUP,
        CONFLICT,
    )
)
# -----------------------------------------------
