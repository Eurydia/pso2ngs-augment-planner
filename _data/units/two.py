from typing import List

from ._unit import Unit
from ._unit_groups import TWO_STAR as RARITY
from effect import *


units: List[Unit] = []

units.append(Unit("tzvia armor", (Effect(PP, 2),), RARITY))
units.append(
    Unit("silver primm armor", (Effect(PP, 2),), RARITY)
)
