from typing import List

from ._augment import (
    Augment,
)
from ._augment_groups import TRIA
from effect import *


GROUP = TRIA
CONFLICT = (TRIA,)

augments: List[Augment] = []

_primary_names = ("mel", "ra", "tech")
_primary_effs = effects_with_amount(OFFENSIVE_POT, 1.0225)

_secondary_names = ("staro", "spiro", "deftro", "guaro")
_secondary_effs = (
    Effect(HP, -5),
    Effect(PP, -3),
    Effect(FLOOR_POT, 0.99),
    Effect(DMG_RES, 0.99),
)

for pri_name, pri_eff in zip(_primary_names, _primary_effs):
    for sec_name, sec_eff in zip(_secondary_names, _secondary_effs):
        if sec_eff.eff == "HP" or sec_eff.eff == "PP":
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
                f"tria {sec_name}{pri_name}",
                0,
                8,
                effect,
                GROUP,
                CONFLICT,
            )
        )
