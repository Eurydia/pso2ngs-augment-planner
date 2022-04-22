import { StatItemValue } from "../../main/StatsDisplay";
import { AugmentData, AugmentPreset } from "../../../types";
import {
    augmentFromSignature,
    collectEffectsFromArray,
    getTotalStatsFromEffs,
    isAddEffect,
    parseStat,
} from "../../util";

// -------------------------------------
/**
 * If an initial preset is given,
 * set the initial states as the preset.
 * If not, use empty.
 * @param preset
 * @returns
 */
export const prepareInitalStates = (
    preset: AugmentPreset | undefined,
) => {
    let initial_name = "";
    let initial_desc = "";
    let initial_augments: AugmentData[] = [];
    if (preset) {
        initial_name = preset.name;
        initial_desc = preset.description;
        for (const signature of preset.augments) {
            const augment = augmentFromSignature(signature);
            if (augment !== null) {
                initial_augments.push(augment);
            }
        }
    }
    return { initial_name, initial_desc, initial_augments };
};
// -------------------------------------

// -------------------------------------
/**
 * Prepare total stats from array of augments
 * @param augments
 * @returns
 */
export const prepareStatsToDisplay = (augments: AugmentData[]) => {
    const all_effs = collectEffectsFromArray(augments);
    const total_stats = getTotalStatsFromEffs(all_effs);

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
