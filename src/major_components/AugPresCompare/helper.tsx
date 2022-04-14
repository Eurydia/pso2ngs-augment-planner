import {
    getTotalStats,
    getEffectsForStats,
    isAddEffect,
    parseStat,
} from "../../util";
import { AugmentData, EquipmentData } from "../../types";

// ---------------------------------------------

export const compareStats = (
    subject_augment: AugmentData[],
    subject_equipment: EquipmentData | null,
    comparand_augment: AugmentData[],
    comparand_equipment: EquipmentData | null,
) => {
    // -----------------------
    // collect the effects of subject
    const subject_effs = getEffectsForStats(
        [subject_equipment, ...subject_augment].filter((val) =>
            Boolean(val),
        ),
    );
    const subject_stats = getTotalStats(subject_effs);
    // and comparand
    const compar_effs = getEffectsForStats(
        [comparand_equipment, ...comparand_augment].filter((val) =>
            Boolean(val),
        ),
    );
    const compar_stats = getTotalStats(compar_effs);
    // -----------------------

    // -----------------------
    // Get all keys from both stats without duplicate
    const keys_with_duplicate = [
        ...Object.keys(subject_stats),
        ...Object.keys(compar_stats),
    ];
    const keys_without_duplicate = new Set(keys_with_duplicate);
    const keys = Array.from(keys_without_duplicate);
    // -----------------------

    let stats: { [key: string]: string } = {};
    for (const key of keys) {
        const is_add_eff = isAddEffect(key);
        const default_value = is_add_eff ? 0 : 1;

        const s_value: number = subject_stats[key] || default_value;
        const c_value: number = compar_stats[key] || default_value;
        const difference = s_value - c_value + default_value;

        // Parsing value like adding plus sign and toPrecision()
        const parsed_s_value = parseStat(s_value, is_add_eff);
        const parsed_difference = parseStat(difference, is_add_eff);

        stats[key] = `${parsed_s_value} (${parsed_difference})`;
    }
    return stats;
};
// ---------------------------------------------
