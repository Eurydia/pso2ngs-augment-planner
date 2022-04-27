from __future__ import annotations
from dataclasses import dataclass
from typing import Iterable, Tuple, List

from effect import Effect, EffectWithManyAmount


@dataclass
class Augment:
    """Describe an augment."""

    name: str
    level: int
    bp: float
    effs: Tuple[Effect, ...]
    group: str
    conflict: Tuple[str, ...]
    condition: str = ""

    @staticmethod
    def from_list(
        name: str,
        levels: int,
        bp: List[float],
        multi_level_effs: Tuple[EffectWithManyAmount, ...],
        group: str,
        conflict: Tuple[str, ...],
        condition: str = "",
    ) -> Tuple[Augment]:
        """Make multiple level of an augment."""
        augments: List[Augment] = []

        _conflict = tuple()
        if conflict:
            _conflict = conflict

        for level in range(levels):
            # Extract effect amount from each level.
            effs: List[Effect] = []
            for eff in multi_level_effs:
                effs.append(eff.getLevel(level))

            augments.append(
                Augment(
                    name,
                    level + 1,
                    bp[level],
                    tuple(effs),
                    group,
                    _conflict,
                    condition,
                )
            )
        return tuple(augments)
