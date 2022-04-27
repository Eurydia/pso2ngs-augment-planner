from typing import List

from ._augment import Augment
from ._augment_groups import AugmentGroups
from effect import *
from effect import EffectTypes as ET
from util import many_effs_with_same_amount

GROUP = AugmentGroups.NOTE
CONFLICT = (GROUP,)

augments: List[Augment] = []


_names = ("a", "b", "c", "d")
_bps = (5, 4, 4, 4)

# -----------------------------------------------
_ael_amt = 1.01
_ael_effs = (
    (Effect(ET.HP, 5), Effect(ET.PP, 3)),
    many_effs_with_same_amount((ET.MEL_POT, ET.RNG_POT), _ael_amt),
    many_effs_with_same_amount((ET.MEL_POT, ET.TEC_POT), _ael_amt),
    many_effs_with_same_amount((ET.RNG_POT, ET.TEC_POT), _ael_amt),
)

for name, bp, effs in zip(_names, _bps, _ael_effs):
    augments.append(Augment(f"ael note {name}", 0, bp, effs, GROUP, CONFLICT))
# -----------------------------------------------

# -----------------------------------------------
_ael_combat_names = ("magnus", "lab", "resola")
for name, eff in zip(_ael_combat_names, OFFENSIVE_POT):
    augments.append(
        Augment(
            f"{name} note",
            0,
            5,
            (Effect(eff, 1.015),),
            GROUP,
            CONFLICT,
        )
    )
# -----------------------------------------------

# -----------------------------------------------
_ret_amt = 1.0075
_ret_effs = (
    (Effect(ET.HP, 10),),
    (Effect(ET.HP, 5), *many_effs_with_same_amount((ET.MEL_POT, ET.RNG_POT), _ret_amt)),
    (Effect(ET.HP, 5), *many_effs_with_same_amount((ET.MEL_POT, ET.TEC_POT), _ret_amt)),
    (Effect(ET.HP, 5), *many_effs_with_same_amount((ET.RNG_POT, ET.TEC_POT), _ret_amt)),
)

for name, bp, effs in zip(_names, _bps, _ret_effs):
    augments.append(
        Augment(
            f"ret note {name}",
            0,
            bp,
            effs,
            GROUP,
            CONFLICT,
        )
    )
# -----------------------------------------------

# -----------------------------------------------
augments.append(
    Augment(
        "alno note",
        0,
        5,
        (
            Effect(ET.HP, 10),
            Effect(ET.PP, 3),
            Effect(ET.FLOOR_POT, 1.02),
        ),
        GROUP,
        CONFLICT,
    )
)
augments.append(
    Augment(
        "maqea note",
        0,
        5,
        many_effs_with_same_amount(OFFENSIVE_POT, 1.0125),
        GROUP,
        CONFLICT,
    )
)
# -----------------------------------------------
