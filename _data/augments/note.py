from typing import List

from ._augment import (
    Augment,
)
from ._augment_groups import NOTE
from effect import *


GROUP = NOTE
CONFLICT = (GROUP,)

augments: List[Augment] = []


_names = ("a", "b", "c", "d")
_bp = (5, 4, 4, 4)

# -----------------------------------------------
_ael_effs = (
    (Effect(HP, 5), Effect(PP, 3)),
    *map(
        lambda effs: effects_with_amount(effs, 1.01),
        (
            (MEL_POT, RNG_POT),
            (MEL_POT, TEC_POT),
            (RNG_POT, TEC_POT),
        ),
    ),
)
for name, bp, effs in zip(_names, _bp, _ael_effs):
    augments.append(Augment(f"ael note {name}", 0, bp, effs, GROUP, CONFLICT))
# -----------------------------------------------

_ael_combat = ("magnus", "lab", "resola")
for name, eff in zip(_ael_combat, OFFENSIVE_POT):
    augments.append(
        Augment(
            f"{name} note",
            0,
            5,
            (Effect(eff, 1.015),),
            GROUP,
            CONFLICT,
        )
    )
# -----------------------------------------------

_ret_effs = (
    (Effect(HP, 10),),
    *map(
        lambda effs: (
            Effect(HP, 5),
            *effects_with_amount(effs, 1.0075),
        ),
        (
            (MEL_POT, RNG_POT),
            (MEL_POT, TEC_POT),
            (RNG_POT, TEC_POT),
        ),
    ),
)
for name, bp, effs in zip(_names, _bp, _ret_effs):
    augments.append(
        Augment(
            f"ret note {name}",
            0,
            bp,
            effs,
            GROUP,
            CONFLICT,
        )
    )
# -----------------------------------------------

augments.append(
    Augment(
        "alno note",
        0,
        5,
        (
            Effect(HP, 10),
            Effect(PP, 3),
            Effect(FLOOR_POT, 1.02),
        ),
        GROUP,
        CONFLICT,
    )
)

augments.append(
    Augment(
        "maqea note",
        0,
        5,
        effects_with_amount(OFFENSIVE_POT, 1.0125),
        GROUP,
        CONFLICT,
    )
)
