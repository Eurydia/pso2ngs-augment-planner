import { StatItemValue } from "../../components/StatsDisplay";
import {
    getTotalStats,
    collectEffectsFromArray,
    isAddEffect,
    parseStat,
} from "../../util";
import { Equipment } from "../../types";

// ---------------------------------------------
export const compareStats = (
    subject: Equipment,
    comparand: Equipment,
) => {
    // -----------------------
    // collect the effects of subject
    // and comparand
    const subject_effs = collectEffectsFromArray(
        [subject.equipment, ...subject.augments].filter((val) =>
            Boolean(val),
        ),
    );
    const subject_stats = getTotalStats(subject_effs);
    const compar_effs = collectEffectsFromArray(
        [comparand.equipment, ...comparand.augments].filter((val) =>
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

    let parsed_stats: { [key: string]: StatItemValue } = {};
    for (const key of keys) {
        const is_add_eff = isAddEffect(key);
        const default_value = is_add_eff ? 0 : 1;

        const s_value: number = subject_stats[key] || default_value;
        const c_value: number = compar_stats[key] || default_value;
        const difference = s_value - c_value + default_value;

        // Parsing value like adding plus sign and toPrecision()
        const parsed_s_value = parseStat(s_value, is_add_eff);
        const parsed_difference = parseStat(difference, is_add_eff);

        parsed_stats[key] = {
            value: parsed_s_value,
            diff: parsed_difference,
            negative: difference < default_value,
        };
    }

    let subject_bp = 0;
    let comparand_bp = 0;
    for (let i = 0; i < 5; i++) {
        subject_bp += subject.augments[i]
            ? subject.augments[i].bp
            : 0;
        comparand_bp += comparand.augments[i]
            ? comparand.augments[i].bp
            : 0;
    }
    const bp_diff = subject_bp - comparand_bp;
    if (subject_bp > 0) {
        parsed_stats["BP"] = {
            value: subject_bp.toString(),
            diff: bp_diff.toString(),
            negative: bp_diff < 0,
        };
    }
    return parsed_stats;
};
// ---------------------------------------------
