from typing import List

from ._augment import Augment
from ._augment_groups import AugmentGroups
from effect import *
from effect import EffectTypes as ET


GROUP = AugmentGroups.GIGAS
CONFLICT = (GROUP,)

augments: List[Augment] = []

# ----------------------------------------------------------------
_names = ("might", "precision", "technique")
for name, eff in zip(_names, OFFENSIVE_POT):
    augments.extend(
        Augment.from_list(
            f"gigas {name}",
            3,
            (6, 8, 10),
            (
                EffectWithManyAmount(ET.HP, (10, 15, 30)),
                EffectWithManyAmount(eff, (1.015, 1.02, 1.025)),
            ),
            GROUP,
            CONFLICT,
        )
    )
# ----------------------------------------------------------------
