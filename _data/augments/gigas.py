from typing import List

from ._augment import (
    Augment,
    EffectMultiLevel,
    augment_from_list,
)
from ._augment_groups import GIGAS
from effect import *


GROUP = GIGAS
CONFLICT = (GROUP,)

augments: List[Augment] = []

# ----------------------------------------------------------------
_names = ("might", "precision", "technique")
for name, eff in zip(_names, OFFENSIVE_POT):
    augments.extend(
        augment_from_list(
            f"gigas {name}",
            3,
            (6, 8, 10),
            (
                EffectMultiLevel(HP, (10, 15, 30)),
                EffectMultiLevel(eff, (1.015, 1.02, 1.025)),
            ),
            GROUP,
            CONFLICT,
        )
    )
# ----------------------------------------------------------------
