from typing import List

from ._unit import Unit
from ._unit_groups import UnitGroups
from effect import EffectTypes as ET, Effect

RARITY = UnitGroups.TWO_STAR

units: List[Unit] = []

units.append(
    Unit(
        "tzvia armor & silver primm armor",
        (Effect(ET.PP, 2),),
        RARITY,
    )
)
