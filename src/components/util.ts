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

export interface Effect {
    eff: string;
    amt: number;
}

export interface AugmentData {
    name: string;
    level: number;
    effs: Effect[];
    group: string;
    conflict: string[];
    condition: string;
}

export interface EquipmentData {
    name: string;
    effs: Effect[];
    group: string;
}

export const isAddEffect = (effect: string) => {
    return effect === EFFECT_NAME.HP || effect === EFFECT_NAME.PP;
};

export const convertToRoman = (num: number) => {
    if (num === 0) {
        return "";
    }

    const roman_keys: { [key: string]: number } = {
        M: 1000,
        CM: 900,
        D: 500,
        CD: 400,
        C: 100,
        XC: 90,
        L: 50,
        XL: 40,
        X: 10,
        IX: 9,
        V: 5,
        IV: 4,
        I: 1,
    };
    let _num = num;
    let roman = "";

    for (const key of Object.keys(roman_keys)) {
        const q = Math.floor(_num / roman_keys[key]);
        _num -= q * roman_keys[key];
        roman += key.repeat(q);
    }
    return roman;
};
