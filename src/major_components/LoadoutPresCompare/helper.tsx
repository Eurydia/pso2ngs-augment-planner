import { StatItemValue } from "../../components/StatsDisplay";

import {
    getTotalStats,
    collectEffectsFromArray,
    isAddEffect,
    parseStat,
} from "../../util";
import { AugmentData, Equipment, EquipmentData } from "../../types";

// ---------------------------------------------

const getTotalStatsFromEquipmentArray = (equipment: Equipment[]) => {
    let eq_and_augs: (EquipmentData | AugmentData)[] = [];
    for (const eq of equipment) {
        if (eq.equipment) {
            eq_and_augs.push(eq.equipment);
        }
        eq_and_augs = eq_and_augs.concat(eq.augments);
    }
    const effs = collectEffectsFromArray(eq_and_augs);
    return getTotalStats(effs);
};

const removeDuplicateKeys = (a: string[], b: string[]) => {
    const keys_with_duplicate = [...a, ...b];
    const keys_without_duplicate = new Set(keys_with_duplicate);
    return Array.from(keys_without_duplicate);
};

export const compareStats = (
    subject: Equipment[],
    comparand: Equipment[],
) => {
    // -----------------------
    // collect the effects of subject and comparand
    const subj_stats = getTotalStatsFromEquipmentArray(subject);
    const comp_stats = getTotalStatsFromEquipmentArray(comparand);
    // -----------------------

    // -----------------------
    // Get all keys from both stats without duplicate
    const keys = removeDuplicateKeys(
        Object.keys(subj_stats),
        Object.keys(comp_stats),
    );
    // -----------------------

    let stats: { [key: string]: StatItemValue } = {};
    for (const key of keys) {
        const is_add_eff = isAddEffect(key);
        const default_value = is_add_eff ? 0 : 1;

        const s_value: number = subj_stats[key] || default_value;
        const c_value: number = comp_stats[key] || default_value;
        const difference = s_value - c_value + default_value;

        // Parsing value like adding plus sign and toPrecision()
        const parsed_s_value = parseStat(s_value, is_add_eff);
        const parsed_difference = parseStat(difference, is_add_eff);

        stats[key] = {
            value: parsed_s_value,
            diff: parsed_difference,
            negative: difference < default_value,
        };
    }
    let subj_bp = 0;
    let comp_bp = 0;
    for (let i = 0; i < 4; i++) {}
    return stats;
};
// ---------------------------------------------
