from typing import List

from ._unit import Unit, SUFFIX
from ._unit_groups import UnitGroups
from effect import *
from effect import EffectTypes as ET
from util import many_effs_with_same_amount

RARITY = UnitGroups.FIVE_STAR

units: List[Unit] = []

# ------------------------------------------------------
# vidal
units.append(Unit("vidal armor", (Effect(ET.HP, 70),), RARITY))
# ------------------------------------------------------

# ------------------------------------------------------
# vijf and vifj + suffix
units.append(
    Unit(
        "vijf armor",
        (
            Effect(ET.HP, 30),
            Effect(ET.PP, 4),
        ),
        RARITY,
    )
)
for suf, effs in SUFFIX:
    _effs = (
        Effect(ET.HP, 20),
        Effect(ET.PP, 7),
        *many_effs_with_same_amount(effs, 1.01),
    )

    units.append(Unit(f"vijf armor {suf}", _effs, RARITY))
# ------------------------------------------------------

# ------------------------------------------------------
units.append(
    Unit(
        "vios armor",
        (
            Effect(ET.PP, 8),
            *many_effs_with_same_amount(OFFENSIVE_POT, 1.01),
        ),
        RARITY,
    )
)
# ------------------------------------------------------

# ------------------------------------------------------
units.append(
    Unit(
        "vindalun armor",
        (Effect(ET.HP, 70),),
        RARITY,
    )
)
# ------------------------------------------------------

# ------------------------------------------------------
units.append(
    Unit(
        "viosel armor",
        (Effect(ET.PP, 14), *many_effs_with_same_amount(AILMENT_RES, 1.20)),
        RARITY,
    )
)
# ------------------------------------------------------

# ------------------------------------------------------
units.append(
    Unit(
        "greas armor",
        (
            Effect(ET.HP, -40),
            Effect(ET.PP, 13),
            *many_effs_with_same_amount(OFFENSIVE_POT, 1.02),
            *many_effs_with_same_amount(AILMENT_RES, 0.5),
        ),
        RARITY,
    )
)
# ------------------------------------------------------

# ------------------------------------------------------
_names = "schwarzest", "schwarzgarde", "schwarzrosso"
for name, eff_type in zip(_names, OFFENSIVE_POT):
    effs = (
        Effect(ET.HP, 25),
        Effect(ET.PP, 3),
        Effect(eff_type, 1.02),
        Effect(ET.DMG_RES, 1.01),
    )

    units.append(Unit(f"{name} armor", effs, RARITY))
# ------------------------------------------------------
