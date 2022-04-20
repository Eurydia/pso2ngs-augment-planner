import { StatItemValue } from "../../components/StatsDisplay";
import { AugmentData, AugmentPreset } from "../../types";
import {
    collectEffectsFromArray,
    getTotalStats,
    isAddEffect,
    parseStat,
} from "../../util";

// -------------------------------------
// preparing initial states
export const prepareInitalStates = (
    preset: AugmentPreset | undefined,
) => {
    let initial_name = "";
    let initial_desc = "";
    let initial_augments: AugmentData[] = [];
    if (preset) {
        initial_name = preset.name;
        initial_desc = preset.description;
        initial_augments = preset.augments;
    }
    return { initial_name, initial_desc, initial_augments };
};
// -------------------------------------

// -------------------------------------
// prepare stats to display
export const prepareStatsToDisplay = (augments: AugmentData[]) => {
    const all_effs = collectEffectsFromArray(augments);
    const total_stats = getTotalStats(all_effs);

    let parsed_stats: { [key: string]: StatItemValue } = {};
    for (const key of Object.keys(total_stats)) {
        const value = parseStat(total_stats[key], isAddEffect(key));
        parsed_stats[key] = { value };
    }
    let bp = 0;
    for (const augment of augments) {
        bp += augment.bp;
    }
    parsed_stats["BP"] = { value: bp.toString() };
    return parsed_stats;
};
// -------------------------------------
