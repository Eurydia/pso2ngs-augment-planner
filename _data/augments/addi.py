from typing import List

from ._augment import (
    Augment,
)
from ._augment_groups import AugmentGroups
from effect import *
from effect import EffectTypes as ET
from util import many_effs_with_same_amount

GROUP = AugmentGroups.ADDI
CONFLICT = (GROUP,)

augments: List[Augment] = []


_primary_names = ("mel", "ra", "tech")
_primary_effs = many_effs_with_same_amount(OFFENSIVE_POT, 1.025)

# ------------------------------------------
_secondary_names = ("sta", "spi", "deft", "gua")
_secondary_effs = (
    Effect(ET.HP, 20),
    Effect(ET.PP, 6),
    Effect(ET.FLOOR_POT, 1.025),
    Effect(ET.DMG_RES, 1.025),
)
# addi sta spi deft gau
for pri_name, pri_eff in zip(_primary_names, _primary_effs):
    for sec_name, sec_eff in zip(_secondary_names, _secondary_effs):
        # To make sure the order of the effects is correct.
        # HP and PP should appears before multiplcative effects.
        if sec_eff.eff in ADDITIVE_EFFECT_TYPE:
            effs = (sec_eff, pri_eff)
        else:
            effs = (pri_eff, sec_eff)

        augments.append(
            Augment(
                f"addi {sec_name}{pri_name}",
                0,
                10,
                effs,
                GROUP,
                CONFLICT,
            )
        )
# ------------------------------------------

# ------------------------------------------
# addi staspi
for name, eff in zip(_primary_names, _primary_effs):
    augments.append(
        Augment(
            f"addi staspi{name}",
            0,
            10,
            (
                Effect(ET.HP, 10),
                Effect(ET.PP, 3),
                eff,
            ),
            GROUP,
            CONFLICT,
        )
    )
# ------------------------------------------

# ------------------------------------------
# addi ward
for name, eff in zip(_primary_names, _primary_effs):
    augments.append(
        Augment(
            f"addi ward{name}",
            0,
            10,
            (
                eff,
                *many_effs_with_same_amount(AILMENT_RES, 1.20),
            ),
            GROUP,
            CONFLICT,
        )
    )
# ------------------------------------------
