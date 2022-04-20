from typing import List

from ._unit import Unit, SUFFIX
from ._unit_groups import FIVE_STAR as RARITY
from effect import *


units: List[Unit] = []

units.append(Unit("vidal armor", (Effect(HP, 70),), RARITY))

# ------------------------------------------------------
units.append(
    Unit(
        "vijf armor",
        (
            Effect(HP, 30),
            Effect(PP, 4),
        ),
        RARITY,
    )
)

for suf, effs in SUFFIX:
    _effs = (
        Effect(HP, 20),
        Effect(PP, 7),
        *effects_with_amount(effs, 1.01),
    )

    units.append(Unit(f"vijf armor {suf}", _effs, RARITY))
# ------------------------------------------------------

units.append(
    Unit(
        "vios armor",
        (
            Effect(PP, 8),
            *effects_with_amount(OFFENSIVE_POT, 1.01),
        ),
        RARITY,
    )
)

units.append(
    Unit(
        "vindalun armor",
        (Effect(HP, 70),),
        RARITY,
    )
)

units.append(
    Unit(
        "viosel armor",
        (Effect(PP, 14), *effects_with_amount(AILMENT_RES, 1.20)),
        RARITY,
    )
)

units.append(
    Unit(
        "greas armor",
        (
            Effect(HP, -40),
            Effect(PP, 13),
            *effects_with_amount(OFFENSIVE_POT, 1.02),
            *effects_with_amount(AILMENT_RES, 0.5),
        ),
        RARITY,
    )
)

# ------------------------------------------------------

_names = "schwarzest", "schwarzgarde", "schwarzrosso"
for name, eff_type in zip(_names, OFFENSIVE_POT):
    effs = (
        Effect(HP, 25),
        Effect(PP, 3),
        Effect(eff_type, 1.02),
        Effect(DMG_RES, 1.01),
    )

    units.append(Unit(f"{name} armor", effs, RARITY))
# ------------------------------------------------------
