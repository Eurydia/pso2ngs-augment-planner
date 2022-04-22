from typing import List

from ._augment import (
    Augment,
)
from ._augment_groups import ELE
from effect import *


GROUP = ELE
CONFLICT = (GROUP,)

augments: List[Augment] = []

# -------------------------------------------
_eles = ("fire", "ice", "lightning", "wind", "light")
for element in _eles:
    augments.append(
        Augment(
            f"{element} exploit",
            1,
            6,
            effects_with_amount(
                OFFENSIVE_POT,
                1.025,
            ),
            GROUP,
            CONFLICT,
            f"against enemies weak to {element}.",
        )
    )
# -------------------------------------------
