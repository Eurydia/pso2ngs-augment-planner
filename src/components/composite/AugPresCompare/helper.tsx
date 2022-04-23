import { StatItemValue } from "../../basic/StatsDisplay";
import {
    getTotalStatsFromEffsArr,
    collectEffsFromArr,
    isAddEffect,
    parseStat,
    EFFECT_NAME,
} from "../../util";
import { Equipment } from "../../../types";

// ---------------------------------------------
/**
 * Get total stats from a piece of equipment
 * @param equipment
 * @returns
 */
const getTotalStatsFromEquipment = (equipment: Equipment) => {
    const all_effs = collectEffsFromArr([
        equipment.equipment,
        ...equipment.augments,
    ]);
    return getTotalStatsFromEffsArr(all_effs);
};
/**
 * Iterating over the same key twice will result in
 * an incorrect stats. This function remove any duplicate keys.
 * @param keys_with_duplicates
 * @returns
 */
const removeDuplicateKeys = (keys_with_duplicates: string[]) => {
    const duplicates_removed = new Set(keys_with_duplicates);
    return Array.from(duplicates_removed);
};
/**
 * Compare and parse the difference of stats between subj and comp.
 * @param subject
 * @param comparand
 * @returns
 */
export const compareStats = (
    subject: Equipment,
    comparand: Equipment,
) => {
    const subj_stats = getTotalStatsFromEquipment(subject);
    const comp_stats = getTotalStatsFromEquipment(comparand);

    // -----------------------
    // Get all keys from both stats without duplicate
    const keys_without_duplicate = removeDuplicateKeys([
        ...Object.keys(subj_stats),
        ...Object.keys(comp_stats),
    ]);
    // -----------------------

    // -----------------------
    // compare and parse stats
    let parsed_stats: { [key: string]: StatItemValue } = {};
    for (const key of keys_without_duplicate) {
        const eff_is_add = isAddEffect(key);
        const default_value = eff_is_add ? 0 : 1;

        const subj_value: number = subj_stats[key] || default_value;
        const comp_value: number = comp_stats[key] || default_value;
        const diff_value = subj_value - comp_value + default_value;

        parsed_stats[key] = {
            value: parseStat(subj_value, eff_is_add),
            diff: parseStat(diff_value, eff_is_add),
            negative: diff_value < default_value,
        };
    }
    // -----------------------
    // counting BP
    let subj_bp = 0;
    for (const aug of subject.augments) {
        subj_bp += aug.bp;
    }
    let comp_bp = 0;
    for (const aug of comparand.augments) {
        comp_bp += aug.bp;
    }
    if (subj_bp > 0 || comp_bp > 0) {
        const diff_bp = subj_bp - comp_bp;
        parsed_stats[EFFECT_NAME.BP] = {
            value: parseStat(subj_bp, true),
            diff: parseStat(diff_bp, true),
            negative: diff_bp < 0,
        };
    }
    return parsed_stats;
};
// ---------------------------------------------
