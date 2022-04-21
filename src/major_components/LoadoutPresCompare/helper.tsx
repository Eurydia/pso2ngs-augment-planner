<<<<<<< Updated upstream
=======
import Grid from "@mui/material/Grid";

>>>>>>> Stashed changes
import EquipmentBuilder from "../EquipmentBuilder";
import { StatItemValue } from "../../components/StatsDisplay";

import {
    getTotalStats,
    collectEffects,
    isAddEffect,
    parseStat,
    equipmentWithAugmentFromSignature,
    augmentToSignature,
    equipmentToSignature,
} from "../../util";
import {
<<<<<<< Updated upstream
    AugmentPreset,
    EquipmentWithAugments,
    LoadoutPreset,
} from "../../types";
=======
    AugmentData,
    AugmentPreset,
    Equipment,
    EquipmentData,
} from "../../types";
import { ReactNode } from "react";
>>>>>>> Stashed changes

// ---------------------------------------------

export const compareStats = (
    subject: EquipmentWithAugments,
    comparand: EquipmentWithAugments,
) => {
    // -----------------------
    // collect the effects of subject
    // and comparand
    const subject_effs = collectEffects(
        [subject.equipment, ...subject.augments].filter((val) =>
            Boolean(val),
        ),
    );
    const subject_stats = getTotalStats(subject_effs);
    const compar_effs = collectEffects(
        [comparand.equipment, ...comparand.augments].filter((val) =>
            Boolean(val),
        ),
    );
    const compar_stats = getTotalStats(compar_effs);
    // -----------------------

    // -----------------------
    // Get all keys from both stats without duplicate
    const keys_with_duplicate = [
        ...Object.keys(subject_stats),
        ...Object.keys(compar_stats),
    ];
    const keys_without_duplicate = new Set(keys_with_duplicate);
    const keys = Array.from(keys_without_duplicate);
    // -----------------------

    let stats: { [key: string]: StatItemValue } = {};
    for (const key of keys) {
        const is_add_eff = isAddEffect(key);
        const default_value = is_add_eff ? 0 : 1;

        const s_value: number = subject_stats[key] || default_value;
        const c_value: number = compar_stats[key] || default_value;
        const difference = s_value - c_value + default_value;

        // Parsing value like adding plus sign and toPrecision()
        const parsed_s_value = parseStat(s_value, is_add_eff);
        const parsed_difference = parseStat(difference, is_add_eff);

        stats[key] = {
            value: parsed_s_value,
            diff: parsed_difference,
            negative: difference < default_value,
        };
    }
<<<<<<< Updated upstream
=======
    let subj_bp = 0;
    let comp_bp = 0;
    for (let i = 0; i < 4; i++) {
        for (const aug of subject[i].augments) {
            subj_bp += aug.bp;
        }
        for (const aug of comparand[i].augments) {
            comp_bp += aug.bp;
        }
    }
    if (subj_bp > 0 || comp_bp > 0) {
        const diff = subj_bp - comp_bp;
        stats["BP"] = {
            value: subj_bp.toString(),
            diff: diff.toString(),
            negative: diff < 0,
        };
    }
>>>>>>> Stashed changes
    return stats;
};
// ---------------------------------------------

// ---------------------------------------------
<<<<<<< Updated upstream
export interface Loadout {
    weapon: EquipmentWithAugments;
    units: EquipmentWithAugments[];
}

export const prepareEquipmentBuilders = (
    prefix: string,
    loadout: {
        weapon: EquipmentWithAugments | null;
        units: (EquipmentWithAugments | null)[];
    },
    aug_presets: AugmentPreset[],
    setter: (updated_reset: Loadout) => void,
) => {
    const headers = ["weapon", "unit #1", "unit #2", "unit #3"];

    let builders: React.ReactNode[] = [];
    for (let i = 0; i < 4; i++) {
        const header = headers[i];
        const mode = i === 0 ? "weapons" : "armors";

        let value = i === 0 ? loadout.weapon : loadout.units[i - 1];
        if (!value) {
            value = {
                equipment: null,
                augments: [],
            };
        }
        const builder = (
            <EquipmentBuilder
                key={`${prefix} ${header}`}
                header={`${prefix} ${header}`}
                mode={mode}
                value={value}
                augmentPresets={aug_presets}
                onAugmentsChange={(augments) => {
                    let updated = Object.create(loadout);
                    if (i === 0) {
                        if (updated.weapon) {
                            updated.weapon.augments = augments;
                        }
                    } else {
                        if (updated.units[i - 1]) {
                            updated.units[i - 1].augments = augments;
                        }
                    }
                    setter(updated);
                }}
                onEquipmentChange={(equipment) => {
                    let updated: Loadout = Object.create(loadout);
                    if (!equipment) {
                        return;
                    }
                    if (i === 0) {
                        if (updated.weapon && equipment) {
                            updated.weapon.equipment = equipment;
                        }
                    } else {
                        if (updated.units[i - 1]) {
                            updated.units[i - 1].equipment =
                                equipment;
                        }
                    }
                    setter(updated);
                }}
            />
        );
        builders.push(builder);
    }
    return builders;
=======
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

const BuilderGridItem = (props: BuilderGridProps) => {
    return (
        <Grid item xs={1} paddingX={1}>
            {props.children}
        </Grid>
    );
};

export const prepareBuilders = (
    values: Equipment[],
    presets: AugmentPreset[],
    setter: React.Dispatch<React.SetStateAction<Equipment[]>>,
) => {
    const headers = ["weapon", "unit #1", "unit #2", "unit #3"];
    return headers.map((header, index) => {
        const mode = index === 0 ? "weapons" : "armors";
        const value = values[index];
        return (
            <BuilderGridItem key={`${header} ${index}`}>
                <EquipmentBuilder
                    header={`${header}`}
                    mode={mode}
                    value={value}
                    augmentPresets={presets}
                    onAugmentsChange={(augments) =>
                        setter((prev) => {
                            let updated = [...prev];
                            updated[index].augments = augments;
                            return updated;
                        })
                    }
                    onEquipmentChange={(equipment) =>
                        setter((prev) => {
                            let updated = [...prev];
                            updated[index].equipment = equipment;
                            return updated;
                        })
                    }
                />
            </BuilderGridItem>
        );
    });
>>>>>>> Stashed changes
};
// ---------------------------------------------
