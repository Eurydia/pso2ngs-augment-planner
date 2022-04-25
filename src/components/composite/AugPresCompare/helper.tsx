import { StatItemValue } from "../../basic/StatsDisplay";
import {
    collectTotalStatsFromEffsArr,
    collectEffsFromArr,
    isAddEffect,
    parseEffectValue,
    EFFECT_NAMES,
    collectBPFromAugments,
    removeDuplicateKeys,
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
    return collectTotalStatsFromEffsArr(all_effs);
};
/**
 * Compare and parse the difference of stats between subj and comp.
 * @param subject
 * @param comparand
 * @returns
 */
export const prepareStatsToDisplay = (
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
            value: parseEffectValue(subj_value, eff_is_add),
            diff: parseEffectValue(diff_value, eff_is_add),
            negative: diff_value < default_value,
        };
    }
    // -----------------------

    // -----------------------
    // counting BP
    const subj_bp = collectBPFromAugments(subject.augments);
    const comp_bp = collectBPFromAugments(comparand.augments);
    if (subj_bp > 0 || comp_bp > 0) {
        const diff_bp = subj_bp - comp_bp;
        parsed_stats[EFFECT_NAMES.BP] = {
            value: parseEffectValue(subj_bp, true),
            diff: parseEffectValue(diff_bp, true),
            negative: diff_bp < 0,
        };
    }
    // -----------------------
    return parsed_stats;
};
// ---------------------------------------------
