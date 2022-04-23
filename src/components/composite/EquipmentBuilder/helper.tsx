import { ReactNode } from "react";

import Grid from "@mui/material/Grid";

import EquipmentBuilder from "./EquipmentBuilder";
import { StatItemValue } from "../../basic/StatsDisplay";

import {
    AugmentData,
    EquipmentData,
    Equipment,
    AugmentPreset,
} from "../../../types";
import {
    EFFECT_NAME,
    isAddEffect,
    parseStat,
    getTotalStatsFromEffsArr,
    collectEffsFromArr,
} from "../../util";

// --------------------------------------------------------
/**
 * Grid container for EquipmentBuilder
 * @param props
 * @returns
 */
interface BuilderGridProps {
    children: ReactNode[] | ReactNode;
}
export const BuilderGridContainer = (props: BuilderGridProps) => {
    return (
        <Grid container columns={{ xs: 1, sm: 2 }} rowSpacing={1.5}>
            {props.children}
        </Grid>
    );
};
/**
 * Grid item for EquipmentBuilder
 * @param props
 * @returns
 */
export const BuilderGridItem = (props: BuilderGridProps) => {
    return (
        <Grid item xs={1} paddingX={1}>
            {props.children}
        </Grid>
    );
};
// --------------------------------------------------------

// --------------------------------------------------------
/**
 * Prepare multiple EquipmentBuilders for other components.
 * @param equipment
 * @param augment_presets
 * @param setter
 * @returns
 */
export const prepareBuilders = (
    headers: string[],
    equipment: Equipment[],
    setter: React.Dispatch<React.SetStateAction<Equipment[]>>,
    augment_presets: AugmentPreset[],
) => {
    return headers.map((header, index) => {
        const mode = index === 0 ? "weapons" : "armors";
        const key = `${index}${index}`;
        return (
            <BuilderGridItem key={key}>
                <EquipmentBuilder
                    header={header}
                    mode={mode}
                    value={equipment[index]}
                    augmentPresets={augment_presets}
                    onAugmentsChange={(augments) =>
                        setter((prev) => {
                            let update = [...prev];
                            update[index].augments = augments;
                            return update;
                        })
                    }
                    onEquipmentChange={(equipment) =>
                        setter((prev) => {
                            let update = [...prev];
                            update[index].equipment = equipment;
                            return update;
                        })
                    }
                />
            </BuilderGridItem>
        );
    });
};
// --------------------------------------------------------

// --------------------------------------------------------

const deconstructEquipment = (equipment: Equipment[]) => {
    let data: (AugmentData | EquipmentData | null)[] = [];
    for (const eq of equipment) {
        let eq_data: EquipmentData | null = null;
        if (eq.equipment) {
            eq_data = eq.equipment;
        }
        data.push(eq_data);
        data = data.concat(eq.augments);
    }
    return data;
};
/**
 * Prepare stats object from loadout
 * @param loadout
 * @returns
 */
export const parseStatsFromMultipleEquipment = (
    loadout: Equipment[],
) => {
    const effs_in_data = deconstructEquipment(loadout);
    const isolated_effs = collectEffsFromArr(effs_in_data);
    const total_stats = getTotalStatsFromEffsArr(isolated_effs);

    // parsing stats into something `StatsDisplay` can read
    let parsed_stats: { [key: string]: StatItemValue } = {};
    for (const key of Object.keys(total_stats)) {
        const value = parseStat(total_stats[key], isAddEffect(key));
        parsed_stats[key] = { value };
    }

    let bp = 0;
    for (const eq of loadout) {
        for (const aug of eq.augments) {
            bp += aug.bp;
        }
    }
    // add the BP to stats if it's not zero
    if (bp > 0) {
        parsed_stats[EFFECT_NAME.BP] = { value: parseStat(bp, true) };
    }
    return parsed_stats;
};
// --------------------------------------------------------
