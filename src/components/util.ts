export const EFFECT_NAME = {
    HP: "HP",
    PP: "PP",
    MEL_POT: "MEL_POT",
    RNG_POT: "RNG_POT",
    TEC_POT: "TEC_POT",
    FLOOR_POT: "FLOOR_POT",
    DAMAGE_RES: "DAMAGE_RES",
    BURN_RES: "BURN_RES",
    FREEZE_RES: "FREEZE_RES",
    SHOCK_RES: "SHOCK_RES",
    BLIND_RES: "BLIND_RES",
    PANIC_RES: "PANIC_RES",
    POISON_RES: "POISON_RES",
    PHYDOWN_RES: "PHYDOWN_RES",
};
export const EFFECT_NAME_TRANSLATE: { [key: string]: string } = {
    HP: "🩸 HP",
    PP: "💦 PP",
    MEL_POT: "🔪 MEL pot",
    RNG_POT: "🔫 RNG pot",
    TEC_POT: "🔮 TEC pot",
    FLOOR_POT: "📈 floor pot",
    DAMAGE_RES: "💪 DMG resist",
    BURN_RES: "🥵 burn resist",
    FREEZE_RES: "🥶 freeze resist",
    SHOCK_RES: "😱 shock resist",
    BLIND_RES: "😵 blind resist",
    PANIC_RES: "😳 panic resist",
    POISON_RES: "🤢 poison resist",
    PHYDOWN_RES: "🤕 physical down resist",
};

export const isAddEffect = (effect: string) => {
    return effect === EFFECT_NAME.HP || effect === EFFECT_NAME.PP;
};
