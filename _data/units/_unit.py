from dataclasses import dataclass
from typing import Tuple

from effect import *


@dataclass
class Unit:
    """Describe a unit"""

    name: str
    effs: Tuple[Effect, ...]
    group: str


SUFFIX = (
    ("arga", (MEL_POT, RNG_POT)),
    ("belta", (RNG_POT, TEC_POT)),
    ("sheza", (MEL_POT, TEC_POT)),
)
