from typing import List

from ._augment import Augment
from ._augment_groups import AugmentGroups
from effect import *
from effect import EffectTypes as ET
from util import many_effs_with_same_many_amounts

GROUP = AugmentGroups.DUALBLE
CONFLICT = (GROUP,)

augments: List[Augment] = []


# -------------------------------------------
# implicite is better than explicite
_dualble = (
    ("melra", (ET.MEL_POT, ET.RNG_POT)),
    ("meltech", (ET.MEL_POT, ET.TEC_POT)),
    ("ratech", (ET.RNG_POT, ET.MEL_POT)),
)
for name, effs in _dualble:
    augments.extend(
        Augment.from_list(
            f"{name} dualble",
            3,
            (4, 5, 6),
            many_effs_with_same_many_amounts(effs, (1.0075, 1.0125, 1.0175)),
            GROUP,
            CONFLICT,
        )
    )
# -------------------------------------------
