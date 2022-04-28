from typing import Iterable, Tuple, List

from effect import EffectTypes, Effect, EffectWithManyAmount


def many_effs_with_same_amount(
    eff_types: Iterable[EffectTypes],
    amount: float,
) -> Tuple[Effect]:
    """
    Assign the same amount to all effect types given.
    """
    effs: List[Effect] = []
    for eff_type in eff_types:
        effs.append(Effect(eff_type, amount))
    return tuple(effs)


def many_effs_with_same_many_amounts(
    eff_types: Iterable[EffectTypes],
    amounts: Tuple[float, ...],
) -> Tuple[EffectWithManyAmount]:
    """Assign the same **set of amounts** to all effect types given."""

    effs: List[EffectWithManyAmount] = []
    for eff_type in eff_types:
        effs.append(EffectWithManyAmount(eff_type, amounts))

    return tuple(effs)
