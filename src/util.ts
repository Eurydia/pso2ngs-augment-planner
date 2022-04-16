import DATA from "./assets/data/augments";
import {
    Effect,
    AugmentData,
    AugmentSignature,
    EquipmentData,
} from "./types";

export const EFFECT_NAME: { [keys: string]: string } = {
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

export const EFFECT_NAME_TRANSLATE: {
    [keys: string]: { emoji: string; name: string };
} = {
    HP: { emoji: "🩸", name: "HP" },
    PP: { emoji: "💦", name: "PP" },
    MEL_POT: { emoji: "🔪", name: "MEL pot" },
    RNG_POT: { emoji: "🔫", name: "RNG pot" },
    TEC_POT: { emoji: "🔮", name: "TEC pot" },
    FLOOR_POT: { emoji: "📈", name: "floor pot" },
    DAMAGE_RES: { emoji: "💪", name: "DMG resist" },
    BURN_RES: { emoji: "🥵", name: "burn resist" },
    FREEZE_RES: { emoji: "🥶", name: "freeze resist" },
    SHOCK_RES: { emoji: "😱", name: "shock resist" },
    BLIND_RES: { emoji: "😵", name: "blind resist" },
    PANIC_RES: { emoji: "😳", name: "panic resist" },
    POISON_RES: { emoji: "🤢", name: "poison resist" },
    PHYDOWN_RES: { emoji: "🤕", name: "physical down resist" },
};

// ---------------------------------------------
// For checking effect type
export const isAddEffect = (effect: string) => {
    return effect === EFFECT_NAME.HP || effect === EFFECT_NAME.PP;
};
// ---------------------------------------------

// ---------------------------------------------
// For converting numbers into roman
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
// ---------------------------------------------

// ---------------------------------------------
export const collectEffects = (
    objs: (AugmentData | EquipmentData | null)[],
) => {
    let effects: Effect[] = [];
    for (const obj of objs) {
        if (obj === null) {
            continue;
        }
        if (obj.effs) {
            effects = effects.concat(obj.effs);
        }
    }
    return effects;
};

// collect total stats
export const getTotalStats = (effects: Effect[]) => {
    let total_stats: { [key: string]: number } = {};
    for (const effect of effects) {
        const { eff, amt } = effect;
        if (total_stats[eff] === undefined) {
            total_stats[eff] = amt;
        } else {
            if (isAddEffect(eff)) {
                total_stats[eff] += amt;
            } else {
                total_stats[eff] *= amt;
            }
        }
    }
    return total_stats;
};
// ---------------------------------------------

// ---------------------------------------------
export const parseStat = (value: number, is_add: boolean) => {
    let parsed_value: string;
    let sign = "+";
    if (is_add) {
        if (value < 0) {
            sign = "";
        }
        parsed_value = value.toString();
    } else {
        if (value < 1) {
            sign = "";
        }
        const _value = value * 100 - 100;
        parsed_value = `${_value.toPrecision(3)}%`;
    }
    return `${sign}${parsed_value}`;
};

// parse stats
export const parseStats = (stats: { [key: string]: number }) => {
    let res: { [key: string]: string } = {};
    const keys = Object.keys(stats);
    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const value = stats[key];
        const parsed_value = parseStat(value, isAddEffect(key));
        res[key] = parsed_value;
    }
    return res;
};
// ---------------------------------------------

// ---------------------------------------------
// strip augmentData
export const augmentToSignature = (augment: AugmentData) => {
    const { name, level } = augment;
    return {
        name,
        level,
    };
};

// get augmentData
export const augmentFromSignature = (signature: AugmentSignature) => {
    for (let i = 0; i < DATA.length; i++) {
        const augment = DATA[i];
        const { name, level } = augment;
        if (name === signature.name && level === signature.level) {
            return augment;
        }
    }
    return null;
};
// ---------------------------------------------
