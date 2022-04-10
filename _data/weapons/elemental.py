from typing import List

from ._weapon import Weapon
from ._weapon_groups import ELEMENTRAL as WEAPON_GRP
from effect import *

weapons: List[Weapon] = []

weapons.append(
    Weapon(
        "elemental weapon", (Effect(FLOOR_POT, 1.7),), WEAPON_GRP
    )
)
