from typing import List

from ._augment import Augment
from ._augment_groups import AugmentGroups
from effect import *
from util import many_effs_with_same_amount

GROUP = AugmentGroups.ELE
CONFLICT = (GROUP,)

augments: List[Augment] = []

# -------------------------------------------
_eles = ("fire", "ice", "lightning", "wind", "light")
for ele in _eles:
    augments.append(
        Augment(
            f"{ele} exploit",
            1,
            6,
            many_effs_with_same_amount(
                OFFENSIVE_POT,
                1.025,
            ),
            GROUP,
            CONFLICT,
            f"against enemies weak to {ele}.",
        )
    )
# -------------------------------------------
