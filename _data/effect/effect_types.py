from enum import Enum


class EffectTypes(str, Enum):
    """Enum for types of effect."""

    HP = "HP"
    PP = "PP"

    MEL_POT = "MEL_POT"
    RNG_POT = "RNG_POT"
    TEC_POT = "TEC_POT"
    FLOOR_POT = "FLOOR_POT"

    DMG_RES = "DAMAGE_RES"
    BURN_RES = "BURN_RES"
    FREEZE_RES = "FREEZE_RES"
    SHOCK_RES = "SHOCK_RES"
    BLIND_RES = "BLIND_RES"
    PANIC_RES = "PANIC_RES"
    POISON_RES = "POISON_RES"
    PHYDOWN_RES = "PHYDOWN_RES"


OFFENSIVE_POT = (EffectTypes.MEL_POT, EffectTypes.RNG_POT, EffectTypes.TEC_POT)

AILMENT_RES = (
    EffectTypes.BURN_RES,
    EffectTypes.FREEZE_RES,
    EffectTypes.SHOCK_RES,
    EffectTypes.BLIND_RES,
    EffectTypes.PANIC_RES,
    EffectTypes.POISON_RES,
    EffectTypes.PHYDOWN_RES,
)

ADDITIVE_EFFECT_TYPE = (EffectTypes.HP, EffectTypes.PP)
