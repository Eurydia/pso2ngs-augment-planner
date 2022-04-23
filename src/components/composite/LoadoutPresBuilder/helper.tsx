<<<<<<< Updated upstream
import { StatItemValue } from "../../basic/StatsDisplay";

import {
    AugmentData,
    EquipmentData,
    EquipmentWithAugments,
} from "../../../types";
import {
    collectEffsFromArr,
    getTotalStatsFromEffsArr,
    isAddEffect,
    parseStat,
    augmentToSignature,
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
export const prepareStatsToDisplay = (
    data: EquipmentWithAugments[],
) => {
    let bp = 0;
    let effs: (AugmentData | EquipmentData)[] = [];
    for (const d of data) {
        if (d.equipment === null) {
            continue;
        }
        effs.push(d.equipment);
        effs = effs.concat(d.augments);

        for (const aug of d.augments) {
            bp += aug.bp;
        }
    }
    const tallied_effs = collectEffsFromArr(effs);
    const total_stats = getTotalStatsFromEffsArr(tallied_effs);

    let parsed_stats: { [key: string]: StatItemValue } = {};
    for (const key of Object.keys(total_stats)) {
        const value = parseStat(total_stats[key], isAddEffect(key));
        parsed_stats[key] = { value };
    }

    if (bp > 0) {
        parsed_stats["BP"] = { value: bp.toString() };
    }

    return parsed_stats;
=======
import { Equipment, LoadoutPreset } from "../../types";

// -------------------------------------
// preparing initial states
export const prepareInitialStates = (
    preset: LoadoutPreset | undefined,
) => {
    let initial_name = "";
    let initial_desc = "";
    let initial_equipment: Equipment[] = [
        { equipment: null, augments: [] },
        { equipment: null, augments: [] },
        { equipment: null, augments: [] },
        { equipment: null, augments: [] },
    ];
    if (preset) {
        initial_name = preset.name;
        initial_desc = preset.description;
        initial_equipment = preset.equipment;
    }
    return { initial_name, initial_desc, initial_equipment };
>>>>>>> Stashed changes
};
// -------------------------------------

// -------------------------------------
// macro for getting the signature
export const toSignature = (value: EquipmentWithAugments) => {
    if (value.equipment === null) {
        return null;
    }
    const name = value.equipment.name;
    const augments = value.augments.map(augmentToSignature);
    return { name, augments };
};
// -------------------------------------
