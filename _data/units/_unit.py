from dataclasses import dataclass
from typing import Tuple

from effect import Effect


@dataclass
class Unit:
    name: str
    effs: Tuple[Effect, ...]
    group: str


SUFFIX = ("arga", "belta", "sheza")
