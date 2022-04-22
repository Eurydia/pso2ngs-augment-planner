from __future__ import annotations
from dataclasses import dataclass
from typing import Iterable, Tuple, List

from effect import Effect


@dataclass
class Augment:
    """Describe an augment."""

    name: str
    level: int
    bp: int | float
    effs: Tuple[Effect, ...]
    group: str
    conflict: Tuple[str, ...]
    condition: str = ""


@dataclass
class EffectMultiLevel:
    """An effect with amount for each level."""

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
    """Apply the `amounts` to given `effs`. Useful when multiple effects share the same amount.
    Like `Sovereign ward`.

    Args:
        effs (Iterable[str]):
        amounts (Tuple[float, ...]): _description_

    Returns:
        Tuple[EffectMultiLevel]:
    """

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
    """Make multiple level of the same augment in one macro.
    Use conjuction with `multi_with_amount()` and `EffectMultiLevel`.

    Args:
        name (str): _description_
        levels (int): _description_
        bp (List[int  |  float]): _description_
        multi_level_effs (Tuple[EffectMultiLevel, ...]): _description_
        group (str): _description_
        conflict (Tuple[str, ...]): _description_
        condition (str, optional): _description_. Defaults to "".

    Returns:
        Tuple[Augment]: _description_
    """
    augs: List[Augment] = []

    _conflict = tuple()
    if conflict:
        _conflict = conflict

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
