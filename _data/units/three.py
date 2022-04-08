from typing import List

from ._unit import Unit
from ._unit_groups import THREE_RARITY as RARITY
from effect import *


units: List[Unit] = []

units.append(
    Unit(
        "theseus armor/gold primm armor",
        (
            Effect(HP, 10),
            Effect(PP, 1),
        ),
        RARITY,
    )
)
