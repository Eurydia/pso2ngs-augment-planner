from typing import List

from ._augment import (
    Augment,
)
from ._augment_groups import FUSIA
from effect import *


GROUP = FUSIA
CONFLICT = (GROUP,)

augments: List[Augment] = []

augments.append(
    Augment(
        f"megas fusia",
        0,
        effects_with_amount(OFFENSIVE_POT, 1.01),
        GROUP,
        CONFLICT,
    )
)
