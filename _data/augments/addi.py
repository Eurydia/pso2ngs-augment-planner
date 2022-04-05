from typing import List

from ._augment import (
    Augment,
)
from ._augment_groups import ADDI
from effect import *


GROUP = ADDI
CONFLICT = (GROUP,)

augments: List[Augment] = []


_primary_names = ("mel", "ra", "tech")
_primary_effs = effects_with_amount(OFFENSIVE_POT, 1.025)

# ------------------------------------------
_secondary_names = ("sta", "spi", "deft", "gua")
_secondary_effs = (
    Effect(HP, 20),
    Effect(PP, 6),
    Effect(FLOOR_POT, 1.025),
    Effect(DMG_RES, 1.025),
)

for pri_name, pri_eff in zip(_primary_names, _primary_effs):
    for sec_name, sec_eff in zip(
        _secondary_names, _secondary_effs
    ):
        augments.append(
            Augment(
                f"addi {sec_name}{pri_name}",
                0,
                (pri_eff, sec_eff),
                GROUP,
                CONFLICT,
            )
        )
# ------------------------------------------

for name, eff in zip(_primary_names, _primary_effs):
    augments.append(
        Augment(
            f"addi staspi{name}",
            0,
            (
                Effect(HP, 10),
                Effect(PP, 3),
                eff,
            ),
            GROUP,
            CONFLICT,
        )
    )
# ------------------------------------------

_ward_amount = 1.20
for name, eff in zip(_primary_names, _primary_effs):
    augments.append(
        Augment(
            f"addi ward{name}",
            0,
            (
                eff,
                *effects_with_amount(AILMENT_RES, _ward_amount),
            ),
            GROUP,
            CONFLICT,
        )
    )
