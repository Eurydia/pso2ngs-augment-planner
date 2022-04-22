import { Effect, AugmentData, EquipmentData } from "../types";

export const EFFECT_NAME: { [keys: string]: string } = {
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
        effect === EFFECT_NAME.BP ||
        effect === EFFECT_NAME.HP ||
        effect === EFFECT_NAME.PP
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
 * Isolate effects from array of objects
 * @param objs
 * @returns
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
 * Tally the total effects from array of Effects.
 * @param effects
 * @returns
 */
export const getTotalStatsFromEffs = (effects: Effect[]) => {
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
 * Parse a single stat into something a `StatItem` can understand.
 * @param value
 * @param is_add
 * @returns
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
 * Macro. Calling parseStat on all values of a stat object.
 * @param stats_bobj
 * @returns
 */
export const parseStats = (stats_obj: { [key: string]: number }) => {
    let parsed_obj: { [key: string]: string } = {};
    const keys = Object.keys(parsed_obj);
    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const value = stats_obj[key];
        const parsed_value = parseStat(value, isAddEffect(key));
        parsed_obj[key] = parsed_value;
    }
    return parsed_obj;
};
// ---------------------------------------------
