from dataclasses import dataclass
from typing import Tuple

from effect import Effect


@dataclass
class Weapon:
    name: str
    effects: Tuple[Effect, ...]
    group: str
