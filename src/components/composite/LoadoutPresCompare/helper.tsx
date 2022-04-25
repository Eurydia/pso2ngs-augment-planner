import { Dispatch, SetStateAction } from "react";

import EquipmentBuilder, {
    BuilderGridContainer,
    BuilderGridItem,
} from "../EquipmentBuilder";
import { StatItemValue } from "../../basic/StatsDisplay";

import {
    isAddEffect,
    collectEffsFromArr,
    collectTotalStatsFromEffsArr,
    parseEffectValue,
    EFFECT_NAMES,
    removeDuplicateKeys,
    collectBPFromAugments,
} from "../../util";
import {
    Equipment,
    AugmentPreset,
    LoadoutPreset,
    AugmentData,
    EquipmentData,
} from "../../../types";

// ---------------------------------------------
interface BuildersProps {
    augmentPreset: AugmentPreset[];
    values: Equipment[];
    loadout_setter: Dispatch<SetStateAction<Equipment[]>>;
    preset_setter: Dispatch<SetStateAction<LoadoutPreset | null>>;
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
                        props.loadout_setter((prev) => {
                            let updated = [...prev];
                            updated[index].augments = augments;
                            return updated;
                        });
                        props.preset_setter(null);
                    }}
                    onEquipmentChange={(equipment) => {
                        props.loadout_setter((prev) => {
                            let updated = [...prev];
                            updated[index].equipment = equipment;
                            return updated;
                        });
                        props.preset_setter(null);
                    }}
                />
            </BuilderGridItem>
        );
    });
    return <BuilderGridContainer>{eq_builders}</BuilderGridContainer>;
};
// ---------------------------------------------

// ---------------------------------------------
/**
 * Get total stats object from loadout
 * @param loadout
 * @returns
 */
const getTotalStatsFromLoadout = (loadout: Equipment[]) => {
    let obj_with_effs: (AugmentData | EquipmentData | null)[] = [];
    for (const eq of loadout) {
        obj_with_effs.push(eq.equipment);
        obj_with_effs = obj_with_effs.concat(eq.augments);
    }
    const isolated_effs = collectEffsFromArr(obj_with_effs);
    const total_stats = collectTotalStatsFromEffsArr(isolated_effs);
    return total_stats;
};
/**
 * Get Total BP from augments in loadout
 * @param loadout
 * @returns
 */
const getTotalBPFromLoadout = (loadout: Equipment[]) => {
    let bp = 0;
    for (const eq of loadout) {
        bp += collectBPFromAugments(eq.augments);
    }
    return bp;
};
export const prepareStatsToDisplay = (
    subject: Equipment[],
    comparand: Equipment[],
) => {
    // -----------------------
    const subj_stats = getTotalStatsFromLoadout(subject);
    const comp_stats = getTotalStatsFromLoadout(comparand);
    // -----------------------

    // -----------------------
    // Get all keys from both stats without duplicate
    const keys_without_duplicate = removeDuplicateKeys([
        ...Object.keys(subj_stats),
        ...Object.keys(comp_stats),
    ]);
    // -----------------------

    let parsed_stats: { [key: string]: StatItemValue } = {};
    for (const key of keys_without_duplicate) {
        const is_add_eff = isAddEffect(key);
        const default_value = is_add_eff ? 0 : 1;

        const subj_value: number = subj_stats[key] || default_value;
        const comp_value: number = comp_stats[key] || default_value;
        const diff_value = subj_value - comp_value + default_value;

        parsed_stats[key] = {
            value: parseEffectValue(subj_value, is_add_eff),
            diff: parseEffectValue(diff_value, is_add_eff),
            negative: diff_value < default_value,
        };
    }

    const subj_bp = getTotalBPFromLoadout(subject);
    const comp_bp = getTotalBPFromLoadout(comparand);
    if (subj_bp > 0 || comp_bp > 0) {
        const diff_bp = subj_bp - comp_bp;
        parsed_stats[EFFECT_NAMES.BP] = {
            value: parseEffectValue(subj_bp, true),
            diff: parseEffectValue(diff_bp, true),
            negative: diff_bp < 0,
        };
    }
    return parsed_stats;
};
// ---------------------------------------------
