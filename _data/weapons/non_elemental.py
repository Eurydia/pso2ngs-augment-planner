from typing import List

from ._weapon import Weapon
from ._weapon_groups import WeaponGroup
from effect import EffectTypes as ET, Effect

TYPE = WeaponGroup.NORMAL

weapons: List[Weapon] = []

weapons.append(
    Weapon(
        "non elemental weapon",
        (Effect(ET.FLOOR_POT, 1.75),),
        TYPE,
    )
)
