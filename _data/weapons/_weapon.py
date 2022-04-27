from dataclasses import dataclass
from typing import Tuple

from effect import Effect


@dataclass
class Weapon:
    """Describe a weapon."""

    name: str
    effs: Tuple[Effect, ...]
    group: str
