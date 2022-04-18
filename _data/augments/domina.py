from typing import List

from ._augment import (
    Augment,
)
from ._augment_groups import DOMINA
from effect import *


GROUP = DOMINA
CONFLICT = (GROUP,)

augments: List[Augment] = []

augments.append(
    Augment(
        "ael domina",
        0,
        8,
        (
            Effect(HP, 5),
            Effect(PP, 3),
            *effects_with_amount(OFFENSIVE_POT, 1.015),
        ),
        GROUP,
        CONFLICT,
    )
)

augments.append(
    Augment(
        "ret domina",
        0,
        10,
        (
            Effect(HP, 15),
            *effects_with_amount(OFFENSIVE_POT, 1.015),
        ),
        GROUP,
        CONFLICT,
    )
)
