import { StatItemValue } from "../../basic/StatsDisplay";
import { AugmentData, AugmentPreset } from "../../../types";
import {
    EFFECT_NAME,
    collectEffsFromArr,
    getTotalStatsFromEffsArr,
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
        initial_augments = preset.augments;
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
    const all_effs = collectEffsFromArr(augments);
    const total_stats = getTotalStatsFromEffsArr(all_effs);

    let parsed_stats: { [key: string]: StatItemValue } = {};
    for (const key of Object.keys(total_stats)) {
        const parsed_value = parseStat(
            total_stats[key],
            isAddEffect(key),
        );
        parsed_stats[key] = { value: parsed_value };
    }

    let bp = 0;
    for (const augment of augments) {
        bp += augment.bp;
    }
    if (bp > 0) {
        parsed_stats[EFFECT_NAME.BP] = { value: parseStat(bp, true) };
    }
    return parsed_stats;
};
// -------------------------------------
