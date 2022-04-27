from typing import List

from ._augment import Augment
from ._augment_groups import AugmentGroups
from effect import OFFENSIVE_POT
from util import many_effs_with_same_amount

GROUP = AugmentGroups.FUSIA
CONFLICT = (GROUP,)

augments: List[Augment] = []

# ----------------------------------------------------------------
augments.append(
    Augment(
        f"megas fusia",
        0,
        4,
        many_effs_with_same_amount(OFFENSIVE_POT, 1.01),
        GROUP,
        CONFLICT,
    )
)
# ----------------------------------------------------------------
