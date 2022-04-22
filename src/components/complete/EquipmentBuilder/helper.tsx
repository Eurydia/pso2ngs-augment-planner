import { ReactNode } from "react";

import Grid from "@mui/material/Grid";

import EquipmentBuilder from "./EquipmentBuilder";
import { StatItemValue } from "../../components/StatsDisplay";

import {
    AugmentData,
    EquipmentData,
    Equipment,
    AugmentPreset,
} from "../../types";
import {
    isAddEffect,
    parseStat,
    getTotalStats,
    collectEffectsFromArray,
} from "../../util";

// --------------------------------------------------------
interface BuilderGridProps {
    children: ReactNode[] | ReactNode;
}
/**
 * Grid container for EquipmentBuilder
 * @param props
 * @returns
 */
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
/**
 * Prepare stats object from loadout
 * @param loadout
 * @returns
 */
export const parseStatsFromMultipleEquipment = (
    loadout: Equipment[],
) => {
    // collect total bp as well as the effs from `Equipment`
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
    const isolated_effs = collectEffectsFromArray(effs);
    const total_stats = getTotalStats(isolated_effs);
    // parsing stats into something `StatsDisplay` can read
    let parsed_stats: { [key: string]: StatItemValue } = {};
    for (const key of Object.keys(total_stats)) {
        const value = parseStat(total_stats[key], isAddEffect(key));
        parsed_stats[key] = { value };
    }
    // add the BP stat if it's not zero
    if (bp > 0) {
        parsed_stats["BP"] = { value: bp.toString() };
    }
    return parsed_stats;
};
// --------------------------------------------------------
