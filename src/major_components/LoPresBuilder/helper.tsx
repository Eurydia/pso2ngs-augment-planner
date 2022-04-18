import React from "react";

import Grid from "@mui/material/Grid";

import { StatItemValue } from "../../components/StatsDisplay";
import {
    AugmentData,
    AugmentPreset,
    EquipmentData,
    EquipmentWithAugments,
} from "../../types";
import {
    augmentFromSignature,
    augmentToSignature,
    collectEffects,
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
export const prepareStatsToDisplay = (
    data: EquipmentWithAugments[],
) => {
    let effs: (AugmentData | EquipmentData)[] = [];
    for (const d of data) {
        if (d.equipment === null) {
            continue;
        }
        effs.push(d.equipment);
        effs = effs.concat(d.augments);
    }

    const tallied_effs = collectEffects(effs);
    const total_stats = getTotalStats(tallied_effs);

    let parsed_stats: { [key: string]: StatItemValue } = {};
    for (const key of Object.keys(total_stats)) {
        const value = parseStat(total_stats[key], isAddEffect(key));
        parsed_stats[key] = { value };
    }
    return parsed_stats;
};
// -------------------------------------

// -------------------------------------
// grid container and item macro
export const GridContainer = (props: {
    children: React.ReactNode;
}) => {
    return (
        <Grid container columns={{ xs: 1, sm: 2 }} rowSpacing={2}>
            {props.children}
        </Grid>
    );
};

export const GridItem = (props: { children: React.ReactNode }) => {
    return (
        <Grid item xs={1} padding={1}>
            {props.children}
        </Grid>
    );
};
// -------------------------------------

// -------------------------------------

export const toSignature = (value: EquipmentWithAugments) => {
    if (value.equipment === null) {
        return null;
    }
    const name = value.equipment.name;
    const augments = value.augments.map(augmentToSignature);
    return { name, augments };
};

// -------------------------------------
