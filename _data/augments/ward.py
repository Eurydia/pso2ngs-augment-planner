from typing import List

from ._augment import Augment
from ._augment_groups import AugmentGroups
from effect import *
from util import many_effs_with_same_many_amounts

GROUP = AugmentGroups.WARD
CONFLICT = (GROUP,)

augments: List[Augment] = []

_wards = (
    "burn",
    "freeze",
    "shock",
    "blind",
    "panic",
    "poison",
    "pain",
)
# -----------------------------------------------
for name, eff in zip(_wards, AILMENT_RES):
    augments.extend(
        Augment.from_list(
            f"{name} ward",
            3,
            (4, 5, 6),
            (EffectWithManyAmount(eff, (1.2, 1.25, 1.3)),),
            GROUP,
            CONFLICT,
        )
    )
# -----------------------------------------------

# -----------------------------------------------
augments.extend(
    Augment.from_list(
        "sovereign ward",
        3,
        (6, 8, 10),
        many_effs_with_same_many_amounts(AILMENT_RES, (1.2, 1.25, 1.3)),
        GROUP,
        CONFLICT,
    )
)
# -----------------------------------------------
