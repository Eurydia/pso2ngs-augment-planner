from dataclasses import dataclass
from typing import Iterable, List, Tuple

# ADD = "ADD"
# MULTIPLY = "MUL"


# @dataclass
# class EffectType:
#     name: str
#     stacking: str = MULTIPLY


@dataclass
class Effect:
    eff: str
    amt: float


def effects_with_amount(
    effs: Iterable[str],
    amount: float,
) -> Tuple[Effect]:

    res: List[Effect] = []
    for eff in effs:
        new_effect = Effect(eff, amount)
        res.append(new_effect)

    return tuple(res)
