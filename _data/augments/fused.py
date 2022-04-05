from typing import List

from ._augment import (
    Augment,
)
from ._augment_groups import BASIC, FUSED
from effect import *


GROUP = FUSED
CONFLICT = (GROUP, BASIC)

augments: List[Augment] = []

_primary_names = ("might", "precision", "technique")
_primary_amount = 1.02
_primary_effs = effects_with_amount(
    OFFENSIVE_POT, _primary_amount
)


_secondary_names = ("sta", "spi", "deft", "gua")
_secondary_effs = (
    Effect(HP, 15),
    Effect(PP, 5),
    Effect(FLOOR_POT, _primary_amount),
    Effect(DMG_RES, _primary_amount),
)

for pri_name, pri_eff in zip(_primary_names, _primary_effs):
    for sec_name, sec_eff in zip(
        _secondary_names, _secondary_effs
    ):
        augments.append(
            Augment(
                f"{sec_name} {pri_name}",
                0,
                (pri_eff, sec_eff),
                GROUP,
                CONFLICT,
            )
        )
