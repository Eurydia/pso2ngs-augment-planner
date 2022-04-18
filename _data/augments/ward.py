from typing import List

from ._augment import (
    Augment,
    EffectMultiLevel,
    augment_from_list,
    multi_with_amount,
)
from ._augment_groups import WARD
from effect import *


GROUP = WARD
CONFLICT = (GROUP,)

augments: List[Augment] = []

_wards = (
    "burn",
    "freeze",
    "shock",
    "blind",
    "panic",
    "poison",
    "pain",
)
for name, eff in zip(_wards, AILMENT_RES):
    augments.extend(
        augment_from_list(
            f"{name} ward",
            3,
            (4, 5, 6),
            (EffectMultiLevel(eff, (1.2, 1.25, 1.3)),),
            GROUP,
            CONFLICT,
        )
    )
# --------------------------------------

augments.extend(
    augment_from_list(
        "sovereign ward",
        3,
        (6, 8, 10),
        multi_with_amount(AILMENT_RES, (1.2, 1.25, 1.3)),
        GROUP,
        CONFLICT,
    )
)
