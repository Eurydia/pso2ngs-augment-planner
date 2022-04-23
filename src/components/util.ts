import { Effect, AugmentData, EquipmentData } from "../types";

export const EFFECT_NAMES = {
    BP: "BP",
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
    BP: { emoji: "🔢", name: "BP*" },
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
 * check whether an effect is `add` type or not.
 * @param effect
 * @returns
 */
export const isAddEffect = (effect: string) => {
    return (
        effect === EFFECT_NAMES.BP ||
        effect === EFFECT_NAMES.HP ||
        effect === EFFECT_NAMES.PP
    );
};
// ---------------------------------------------

// ---------------------------------------------
/**
 * Convert a number to roman string
 * @param num
 * @returns
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
 * Collect total BP from Array of Augments
 * @param augments
 * @returns
 */
export const collectBPFromAugments = (augments: AugmentData[]) => {
    let bp = 0;
    for (const aug of augments) {
        bp += aug.bp;
    }
    return bp;
};
/**
 * Isolate effects from array of objects
 * @param objs
 * @returns
 */
export const collectEffsFromArr = (
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
 * Iterating over the same key twice will result in
 * an incorrect stats. This function remove any duplicate keys.
 * @param keys_with_duplicates
 * @returns
 */
export const removeDuplicateKeys = (
    keys_with_duplicates: string[],
) => {
    const duplicates_removed = new Set(keys_with_duplicates);
    return Array.from(duplicates_removed);
};
/**
 * Tally the total effects from array of Effects.
 * @param effects
 * @returns
 */
export const getTotalStatsFromEffsArr = (effects: Effect[]) => {
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
 * Parse value according to the stacking type.
 * @param value
 * @param is_add
 * @returns
 */
export const parseEffectValue = (value: number, is_add: boolean) => {
    let parsed_value: string;
    let default_value: number;
    if (is_add) {
        default_value = 0;
        parsed_value = value.toString();
    } else {
        default_value = 1;
        const temp = value * 100 - 100;
        parsed_value = `${temp.toPrecision(3)}%`;
    }

    let sign = value < default_value ? "" : "+";
    return `${sign}${parsed_value}`;
};
// ---------------------------------------------
