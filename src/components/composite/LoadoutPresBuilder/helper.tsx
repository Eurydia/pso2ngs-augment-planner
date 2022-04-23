import { Dispatch, SetStateAction } from "react";
import EquipmentBuilder, {
    BuilderGridContainer,
    BuilderGridItem,
} from "../EquipmentBuilder";

import {
    AugmentData,
    AugmentPreset,
    Equipment,
    EquipmentData,
    LoadoutPreset,
} from "../../../types";
import {
    collectBPFromAugments,
    collectEffsFromArr,
    EFFECT_NAMES,
    getTotalStatsFromEffsArr,
    isAddEffect,
    parseEffectValue,
} from "../../util";
import { StatItemValue } from "../../basic/StatsDisplay";

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
};
// -------------------------------------

// -------------------------------------
/**
 * Build multiple `EquipmentBuilder`.
 */
interface BuildersProps {
    augmentPreset: AugmentPreset[];
    values: Equipment[];
    setter: Dispatch<SetStateAction<Equipment[]>>;
}
export const Builders = (props: BuildersProps) => {
    const names = ["weapon", "unit #1", "unit #2", "unit #3"];

    const eq_builders = names.map((name, index) => {
        const key = `${index}${index}`;
        const mode: "weapons" | "armors" =
            index === 0 ? "weapons" : "armors";
        return (
            <BuilderGridItem key={key}>
                <EquipmentBuilder
                    name={name}
                    mode={mode}
                    value={props.values[index]}
                    augmentPresets={props.augmentPreset}
                    onAugmentsChange={(augments) => {
                        props.setter((prev) => {
                            let updated = [...prev];
                            updated[index].augments = augments;
                            return updated;
                        });
                    }}
                    onEquipmentChange={(equipment) => {
                        props.setter((prev) => {
                            let updated = [...prev];
                            updated[index].equipment = equipment;
                            return updated;
                        });
                    }}
                />
            </BuilderGridItem>
        );
    });
    return <BuilderGridContainer>{eq_builders}</BuilderGridContainer>;
};
// -------------------------------------

// -------------------------------------

export const prepareStatsToDisplay = (loadout: Equipment[]) => {
    let obj_with_effs: (AugmentData | EquipmentData | null)[] = [];
    for (const eq of loadout) {
        obj_with_effs.push(eq.equipment);
        obj_with_effs = obj_with_effs.concat(eq.augments);
    }
    const isolated_effs = collectEffsFromArr(obj_with_effs);
    const total_stats = getTotalStatsFromEffsArr(isolated_effs);

    let parsed_stats: { [key: string]: StatItemValue } = {};
    for (const key of Object.keys(total_stats)) {
        parsed_stats[key] = {
            value: parseEffectValue(
                total_stats[key],
                isAddEffect(key),
            ),
        };
    }
    let bp = 0;
    for (const eq of loadout) {
        bp += collectBPFromAugments(eq.augments);
    }
    if (bp > 0) {
        parsed_stats[EFFECT_NAMES.BP] = {
            value: parseEffectValue(bp, true),
        };
    }
    return parsed_stats;
};
// -------------------------------------
