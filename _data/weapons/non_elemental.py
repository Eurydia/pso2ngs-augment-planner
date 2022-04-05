from typing import List

from ._weapon import Weapon
from ._weapon_groups import NON_ELEMENTRAL as WEAPON_GRP
from effect import *

weapons: List[Weapon] = []

weapons.append(
    Weapon(
        "non elemental weapon",
        (Effect(FLOOR_POT, 0.75),),
        WEAPON_GRP,
    )
)
