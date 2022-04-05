from itertools import combinations
from typing import List

from ._unit import Unit, SUFFIX
from ._unit_groups import FOUR_STAR as RARITY
from effect import *


units: List[Unit] = []

# ------------------------------------------------------
units.append(
    Unit(
        "qual de armor",
        (Effect(PP, 6),),
        RARITY,
    )
)

for suf, effs in zip(SUFFIX, combinations(OFFENSIVE_POT, 2)):
    _effs = (
        Effect(PP, 4),
        *effects_with_amount(effs, 1.01),
    )

    units.append(Unit(f"qual de armor {suf}", _effs, RARITY))
# ------------------------------------------------------

units.append(
    Unit(
        "cattleya armor", (Effect(HP, 20), Effect(PP, 2)), RARITY
    )
)

# ------------------------------------------------------
units.append(
    Unit(
        "vialto armor",
        (
            Effect(HP, 30),
            Effect(DMG_RES, 1.01),
        ),
        RARITY,
    )
)

for suf, effs in zip(SUFFIX, combinations(OFFENSIVE_POT, 2)):
    _effs = (
        Effect(HP, 25),
        *effects_with_amount(effs, 1.01),
        Effect(DMG_RES, 1.01),
    )

    units.append(Unit(f"vialto armor {suf}", _effs, RARITY))
# ------------------------------------------------------

units.append(
    Unit(
        "geant armor",
        (
            Effect(HP, -20),
            Effect(PP, 10),
            *effects_with_amount(OFFENSIVE_POT, 1.02),
            *effects_with_amount(AILMENT_RES, 0.5),
        ),
        RARITY,
    )
)
