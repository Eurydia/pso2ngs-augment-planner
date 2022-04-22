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
_primary_effs = effects_with_amount(OFFENSIVE_POT, 1.02)

_secondary_names = ("sta", "spi", "deft", "gua")
_secondary_effs = (
    Effect(HP, 15),
    Effect(PP, 5),
    Effect(FLOOR_POT, 1.02),
    Effect(DMG_RES, 1.02),
)

# ----------------------------------------------------------------
for pri_name, pri_eff in zip(_primary_names, _primary_effs):
    for sec_name, sec_eff in zip(_secondary_names, _secondary_effs):
        if sec_eff.eff in ADDITIVE_EFFECT_TYPE:
            effect = (
                sec_eff,
                pri_eff,
            )
        else:
            effect = (
                pri_eff,
                sec_eff,
            )
        augments.append(
            Augment(
                f"{sec_name} {pri_name}",
                0,
                8,
                effect,
                GROUP,
                CONFLICT,
            )
        )
# ----------------------------------------------------------------
