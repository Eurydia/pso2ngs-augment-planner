from typing import List

from ._augment import Augment
from ._augment_groups import AugmentGroups
from effect import *
from effect import EffectTypes as ET
from util import many_effs_with_same_amount

GROUP = AugmentGroups.FUSED
CONFLICT = (GROUP, AugmentGroups.BASIC)

augments: List[Augment] = []

_primary_names = ("might", "precision", "technique")
_primary_effs = many_effs_with_same_amount(OFFENSIVE_POT, 1.02)

_secondary_names = ("sta", "spi", "deft", "gua")
_secondary_effs = (
    Effect(ET.HP, 15),
    Effect(ET.PP, 5),
    Effect(ET.FLOOR_POT, 1.02),
    Effect(ET.DMG_RES, 1.02),
)

# ----------------------------------------------------------------
for pri_name, pri_eff in zip(_primary_names, _primary_effs):
    for sec_name, sec_eff in zip(_secondary_names, _secondary_effs):
        # Make sure order of the effects is correct.
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
