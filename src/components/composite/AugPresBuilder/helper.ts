import { StatItemValue } from "../../basic/StatsDisplay";
import { AugmentData, AugmentPreset } from "../../../types";
import {
    EFFECT_NAMES,
    collectEffsFromArr,
    collectBPFromAugments,
    collectTotalStatsFromEffsArr,
    isAddEffect,
    parseEffectValue,
} from "../../util";

// -------------------------------------
/**
 * Prepare total stats from array of augments
 * @param augments
 * @returns
 */
export const prepareStatsToDisplay = (augments: AugmentData[]) => {
    const isolated_effs = collectEffsFromArr(augments);
    const total_stats = collectTotalStatsFromEffsArr(isolated_effs);

    let parsed_stats: { [key: string]: StatItemValue } = {};
    for (const key of Object.keys(total_stats)) {
        const parsed_value = parseEffectValue(
            total_stats[key],
            isAddEffect(key),
        );
        parsed_stats[key] = { value: parsed_value };
    }

    const bp = collectBPFromAugments(augments);
    if (bp > 0) {
        parsed_stats[EFFECT_NAMES.BP] = {
            value: parseEffectValue(bp, true),
        };
    }
    return parsed_stats;
};
// -------------------------------------
