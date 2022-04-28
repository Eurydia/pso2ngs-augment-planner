from dataclasses import dataclass
from typing import Tuple

from .effect_types import EffectTypes


@dataclass
class Effect:
    """An effect needs to have two types information.
    1. What kind of effect type it is, and
    2. What is the magnitude.
    """

    eff: EffectTypes
    amt: float


@dataclass
class EffectWithManyAmount:
    """Effect with more than many amount."""

    eff: str
    amts: Tuple[float, ...]

    def getLevel(self, level: int) -> Effect:
        return Effect(
            self.eff,
            self.amts[level],
        )
