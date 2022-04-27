from typing import List

from ._unit import Unit, SUFFIX
from ._unit_groups import UnitGroups
from effect import *
from effect import EffectTypes as ET
from util import many_effs_with_same_amount

RARITY = UnitGroups.FOUR_STAR

units: List[Unit] = []

# ------------------------------------------------------
# qual de and qual de + suffix
units.append(
    Unit(
        "qual de armor",
        (Effect(ET.PP, 6),),
        RARITY,
    )
)

for suf, effs in SUFFIX:
    _effs = (
        Effect(ET.PP, 4),
        *many_effs_with_same_amount(effs, 1.01),
    )

    units.append(Unit(f"qual de armor {suf}", _effs, RARITY))
# ------------------------------------------------------

units.append(Unit("cattleya armor", (Effect(ET.HP, 20), Effect(ET.PP, 2)), RARITY))

# ------------------------------------------------------
# vialto and vialto + suffix
units.append(
    Unit(
        "vialto armor",
        (
            Effect(ET.HP, 30),
            Effect(ET.DMG_RES, 1.01),
        ),
        RARITY,
    )
)

for suf, effs in SUFFIX:
    _effs = (
        Effect(ET.HP, 25),
        *many_effs_with_same_amount(effs, 1.01),
        Effect(ET.DMG_RES, 1.01),
    )

    units.append(Unit(f"vialto armor {suf}", _effs, RARITY))
# ------------------------------------------------------

# ------------------------------------------------------
units.append(
    Unit(
        "geant armor",
        (
            Effect(ET.HP, -20),
            Effect(ET.PP, 10),
            *many_effs_with_same_amount(OFFENSIVE_POT, 1.02),
            *many_effs_with_same_amount(AILMENT_RES, 0.5),
        ),
        RARITY,
    )
)
# ------------------------------------------------------
