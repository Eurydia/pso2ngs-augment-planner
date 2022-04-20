import { Effect, AugmentData, EquipmentData } from "./types";

/**
 * Enums to use when referencing a effect.
 * So I don't have top write out the string every time.
 */
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

/**
 * For converting an effect' internal name to something that is presentable.
 */
export const EFFECT_NAME_TRANSLATE: {
    [keys: string]: { emoji: string; name: string };
} = {
    HP: { emoji: "🩸", name: "HP" },
    PP: { emoji: "💦", name: "PP" },
    MEL_POT: { emoji: "🔪", name: "MEL pot" },
    RNG_POT: { emoji: "🔫", name: "RNG pot" },
    TEC_POT: { emoji: "🔮", name: "TEC pot" },
    FLOOR_POT: { emoji: "📈", name: "FLR pot" },
    DAMAGE_RES: { emoji: "💪", name: "DMG res" },
    BURN_RES: { emoji: "🥵", name: "BRN res" },
    FREEZE_RES: { emoji: "🥶", name: "FRZ res" },
    SHOCK_RES: { emoji: "😱", name: "SHK res" },
    BLIND_RES: { emoji: "😵", name: "BLD res" },
    PANIC_RES: { emoji: "😳", name: "PNC res" },
    POISON_RES: { emoji: "🤢", name: "PSN res" },
    PHYDOWN_RES: { emoji: "🤕", name: "PHYDWN res" },
};

// ---------------------------------------------
/**
 * Verify if an effect stack by addition or not.
 * Since different operantions are performed based on the stacking type
 * @param effect Name of the effect to check
 * @returns
 */
export const isAddEffect = (effect: string) => {
    return effect === EFFECT_NAME.HP || effect === EFFECT_NAME.PP;
};
// ---------------------------------------------

// ---------------------------------------------
/**
 * For converting numbers into roman.
 * @param num number in arabic
 * @returns roman number
 */
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
/**
 * Isolate `Effect`s from Array of `AugmentData` and `EquipmentData`.
 * @param objs Array of objetcs with signature
 * @returns an array of `Effect`
 */
export const collectEffectsFromArray = (
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

/**
 * Generate stats object from array of `Effect`.
 * @param effects Array of `Effect`
 * @returns stats object
 */
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
/**
 * Parse the value into a string by adding plus sign if positive,
 * and percent sign if mutiplicative.
 * @param value
 * @param is_add
 * @returns string of parsed value
 */
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

/**
 * Macro for calling multiple `parseStat()`.
 * Parse every stats in the object.
 * @param stats a stats object
 * @returns a stats object with parsed value
 */
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
