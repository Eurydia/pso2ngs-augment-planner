from dataclasses import dataclass
from typing import Tuple

from effect import EffectTypes as ET, Effect


@dataclass
class Unit:
    """Describe a unit"""

    name: str
    effs: Tuple[Effect, ...]
    group: str


SUFFIX = (
    ("arga", (ET.MEL_POT, ET.RNG_POT)),
    ("belta", (ET.RNG_POT, ET.TEC_POT)),
    ("sheza", (ET.MEL_POT, ET.TEC_POT)),
)
