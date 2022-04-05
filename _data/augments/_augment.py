from __future__ import annotations
from dataclasses import dataclass
from typing import Iterable, Tuple, List

from effect import Effect


@dataclass
class Augment:
    name: str
    level: int
    effs: Tuple[Effect, ...]
    group: str
    conflict: Tuple[str, ...]


@dataclass
class EffectMultiLevel:
    effect: str
    amounts: Tuple[float, ...]
    condition: str = ""

    def getLevel(self, level: int) -> Effect:
        return Effect(self.effect, self.amounts[level], self.condition)


def multi_with_amount(
    effs: Iterable[str],
    amounts: Tuple[float, ...],
    condition: str = "",
) -> Tuple[EffectMultiLevel]:
    return tuple(
        map(
            lambda eff: EffectMultiLevel(eff, amounts, condition),
            effs,
        )
    )


def augment_from_list(
    name: str,
    levels: int,
    multi_level_effs: Tuple[EffectMultiLevel, ...],
    group: str,
    conflict: Tuple[str, ...],
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
            effs,
            group,
            _conflict,
        )

        augs.append(aug)

    return tuple(augs)
