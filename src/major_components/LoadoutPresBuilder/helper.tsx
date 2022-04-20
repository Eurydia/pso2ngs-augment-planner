import { StatItemValue } from "../../components/StatsDisplay";

import { AugmentData, EquipmentData, Equipment } from "../../types";
import {
    collectEffectsFromArray,
    getTotalStats,
    isAddEffect,
    parseStat,
} from "../../util";

// -------------------------------------
// preparing initial states
// export const prepareInitalStates = (
//     preset: AugmentPreset | undefined,
// ) => {
//     let initial_name = "";
//     let initial_desc = "";
//     let initial_augments: AugmentData[] = [];
//     if (preset) {
//         initial_name = preset.name;
//         initial_desc = preset.description;
//         for (const signature of preset.augments) {
//             const augment = augmentFromSignature(signature);
//             if (augment !== null) {
//                 initial_augments.push(augment);
//             }
//         }
//     }
//     return { initial_name, initial_desc, initial_augments };
// };
// -------------------------------------

// -------------------------------------
// prepare stats to display
export const prepareStats = (loadout: Equipment[]) => {
    let bp = 0;
    let effs: (AugmentData | EquipmentData)[] = [];
    for (const d of loadout) {
        if (d.equipment) {
            effs.push(d.equipment);
        }
        effs = effs.concat(d.augments);

        for (const aug of d.augments) {
            bp += aug.bp;
        }
    }
    const tallied_effs = collectEffectsFromArray(effs);
    const total_stats = getTotalStats(tallied_effs);

    let parsed_stats: { [key: string]: StatItemValue } = {};
    for (const key of Object.keys(total_stats)) {
        const value = parseStat(total_stats[key], isAddEffect(key));
        parsed_stats[key] = { value };
    }

    if (bp > 0) {
        parsed_stats["BP"] = { value: bp.toString() };
    }

    return parsed_stats;
};
// -------------------------------------
