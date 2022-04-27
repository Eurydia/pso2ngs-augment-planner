from typing import List

from ._unit import Unit
from ._unit_groups import UnitGroups
from effect import EffectTypes as ET, Effect

RARITY = UnitGroups.ONE_STAR

units: List[Unit] = []

units.append(Unit("primm armor", (Effect(ET.HP, 10),), RARITY))
