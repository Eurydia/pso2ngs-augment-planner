from ctypes import util
from typing import List

from numpy import fromfunction

from ._augment import Augment
from ._augment_groups import AugmentGroups
from effect import *
from effect import EffectTypes as ET
from util import many_effs_with_same_amount

GROUP = AugmentGroups.TRIA
CONFLICT = (GROUP,)

augments: List[Augment] = []


_primary_names = ("mel", "ra", "tech")
_primary_effs = many_effs_with_same_amount(OFFENSIVE_POT, 1.0225)

_secondary_names = ("staro", "spiro", "deftro", "guaro")
_secondary_effs = (
    Effect(ET.HP, -5),
    Effect(ET.PP, -3),
    Effect(ET.FLOOR_POT, 0.99),
    Effect(ET.DMG_RES, 0.99),
)

# -----------------------------------------------
for pri_name, pri_eff in zip(_primary_names, _primary_effs):
    for sec_name, sec_eff in zip(_secondary_names, _secondary_effs):

        # make sure order of the effects is correct.
        if sec_eff.eff in ADDITIVE_EFFECT_TYPE:
            effs = (sec_eff, pri_eff)
        else:
            effs = (pri_eff, sec_eff)

        augments.append(
            Augment(
                f"tria {sec_name}{pri_name}",
                0,
                6,
                effs,
                GROUP,
                CONFLICT,
            )
        )
# -----------------------------------------------
