from typing import List

from ._augment import (
    Augment,
    EffectMultiLevel,
    augment_from_list,
    multi_with_amount,
)
from ._augment_groups import BASIC, FUSED
from effect import *


GROUP = BASIC
CONFLICT = (FUSED,)

augments: List[Augment] = []


augments.extend(
    augment_from_list(
        "stamina",
        3,
        (3, 4, 5),
        (EffectMultiLevel(HP, (5, 10, 15)),),
        GROUP,
        CONFLICT,
    )
)

augments.extend(
    augment_from_list(
        "spirit",
        3,
        (2, 3, 4),
        (EffectMultiLevel(PP, (3, 4, 5)),),
        GROUP,
        CONFLICT,
    )
)

_atk_augments = (
    "might",
    "precision",
    "technique",
)
for name, eff in zip(_atk_augments, OFFENSIVE_POT):
    augments.extend(
        augment_from_list(
            name,
            3,
            (4, 5, 6),
            (EffectMultiLevel(eff, (1.01, 1.015, 1.02)),),
            GROUP,
            CONFLICT,
        )
    )

augments.extend(
    augment_from_list(
        "deftness",
        3,
        (3, 4, 5),
        (EffectMultiLevel(FLOOR_POT, (1.01, 1.015, 1.02)),),
        GROUP,
        CONFLICT,
    )
)

augments.extend(
    augment_from_list(
        "guard",
        3,
        (2, 3, 4),
        (EffectMultiLevel(DMG_RES, (1.01, 1.015, 1.02)),),
        GROUP,
        CONFLICT,
    )
)

_mastery_amount = (1.005, 1.01, 1.015, 1.025)
augments.extend(
    augment_from_list(
        "mastery",
        4,
        (6, 8, 10, 12),
        (
            *multi_with_amount(OFFENSIVE_POT, _mastery_amount),
            EffectMultiLevel(FLOOR_POT, _mastery_amount),
            EffectMultiLevel(DMG_RES, _mastery_amount),
        ),
        GROUP,
        [],
    )
)
