from dataclasses import dataclass
from typing import Tuple

from effect import Effect, MEL_POT, RNG_POT, TEC_POT


@dataclass
class Unit:
    name: str
    effs: Tuple[Effect, ...]
    group: str


SUFFIX = (
    ("arga", (MEL_POT, RNG_POT)),
    ("belta", (RNG_POT, TEC_POT)),
    ("sheza", (MEL_POT, TEC_POT)),
)
