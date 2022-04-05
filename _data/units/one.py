from typing import List

from ._unit import Unit
from ._unit_groups import ONE_STAR as RARITY
from effect import *


units: List[Unit] = []

units.append(Unit("primm armor", (Effect(HP, 10),), RARITY))
