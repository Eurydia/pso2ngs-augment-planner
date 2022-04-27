from typing import List

from ._unit import Unit
from ._unit_groups import UnitGroups
from effect import EffectTypes as ET, Effect

RARITY = UnitGroups.THREE_RARITY

units: List[Unit] = []

units.append(
    Unit(
        "theseus armor & gold primm armor",
        (
            Effect(ET.HP, 10),
            Effect(ET.PP, 1),
        ),
        RARITY,
    )
)
