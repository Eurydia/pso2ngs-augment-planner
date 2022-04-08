from typing import List

from ._augment import (
    Augment,
    EffectMultiLevel,
    augment_from_list,
    multi_with_amount,
)
from ._augment_groups import SOUL
from effect import *


GROUP = SOUL
CONFLICT = (GROUP,)

augments: List[Augment] = []

augments.extend(
    augment_from_list(
        f"alts soul",
        3,
        (
            EffectMultiLevel(HP, (5, 10, 15)),
            EffectMultiLevel(DMG_RES, (1.01, 1.02, 1.025)),
        ),
        GROUP,
        CONFLICT,
    )
)

augments.extend(
    augment_from_list(
        f"dolz soul",
        3,
        (
            EffectMultiLevel(PP, (5, 5, 5)),
            EffectMultiLevel(FLOOR_POT, (1.01, 1.02, 1.025)),
        ),
        GROUP,
        CONFLICT,
    )
)
# ------------------------------------------------

_forms_name = ("forms", "forms machini", "form sand")
for name, eff in zip(_forms_name, OFFENSIVE_POT):
    augments.extend(
        augment_from_list(
            f"{name} soul",
            3,
            (
                EffectMultiLevel(eff, (1.02, 1.02, 1.02)),
                EffectMultiLevel(DMG_RES, (1, 1.02, 1.025)),
            ),
            GROUP,
            CONFLICT,
        )
    )
# ------------------------------------------------

_boss_one = ("daityl", "pettas", "nex")
for name, eff in zip(_boss_one, OFFENSIVE_POT):
    augments.extend(
        augment_from_list(
            f"{name} soul",
            3,
            (
                EffectMultiLevel(PP, (5, 5, 5)),
                EffectMultiLevel(eff, (1.01, 1.02, 1.025)),
            ),
            GROUP,
            CONFLICT,
        )
    )
# ------------------------------------------------

_boss_two = ("dust", "ragras", "renus")
for name, eff in zip(_boss_two, OFFENSIVE_POT):
    augments.extend(
        augment_from_list(
            f"{name} soul",
            3,
            (
                EffectMultiLevel(HP, (15, 15, 15)),
                EffectMultiLevel(eff, (1.01, 1.02, 1.025)),
            ),
            GROUP,
            CONFLICT,
        )
    )
# ------------------------------------------------

augments.extend(
    augment_from_list(
        "eradi soul",
        3,
        (
            EffectMultiLevel(HP, (10, 10, 10)),
            EffectMultiLevel(PP, (4, 4, 4)),
            *multi_with_amount(
                OFFENSIVE_POT, (1.0125, 1.0175, 1.0225)
            ),
        ),
        GROUP,
        CONFLICT,
    )
)
