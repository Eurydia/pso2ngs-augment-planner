from __future__ import annotations
from dataclasses import dataclass
from typing import Iterable, Tuple, List

from effect import Effect


@dataclass
class Augment:
    name: str
    level: int
    bp: int | float
    effs: Tuple[Effect, ...]
    group: str
    conflict: Tuple[str, ...]
    condition: str = ""


@dataclass
class EffectMultiLevel:
    effect: str
    amounts: Tuple[float, ...]

    def getLevel(self, level: int) -> Effect:
        return Effect(
            self.effect,
            self.amounts[level],
        )


def multi_with_amount(
    effs: Iterable[str],
    amounts: Tuple[float, ...],
) -> Tuple[EffectMultiLevel]:
    return tuple(
        map(
            lambda eff: EffectMultiLevel(eff, amounts),
            effs,
        )
    )


def augment_from_list(
    name: str,
    levels: int,
    bp: List[int | float],
    multi_level_effs: Tuple[EffectMultiLevel, ...],
    group: str,
    conflict: Tuple[str, ...],
    condition: str = "",
) -> Tuple[Augment]:
    augs: List[Augment] = []

    if conflict:
        _conflict = conflict
    else:
        _conflict = tuple()

    for level in range(levels):

        effs = tuple((eff.getLevel(level) for eff in multi_level_effs))

        aug = Augment(
            name,
            level + 1,
            bp[level],
            effs,
            group,
            _conflict,
            condition,
        )

        augs.append(aug)

    return tuple(augs)
