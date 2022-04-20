import { default as AUG_DATA } from "../assets/data/augments";
import { default as WEAPON_DATA } from "../assets/data/weapons";
import { default as UNIT_DATA } from "../assets/data/units";

import {
    AugmentData,
    AugmentDataSignature,
    EquipmentData,
    Equipment,
    EquipmentSignature,
    AugmentPreset,
    AugmentPresetSignature,
    LoadoutPreset,
    LoadoutPresetSignature,
} from "../types";

// ---------------------------------
// `AugmentData` and `AugmentDataSignature` conversion
const augmentDataFromSignatures = (
    signatures: AugmentDataSignature[],
): AugmentData[] => {
    let augments: AugmentData[] = [];
    for (const sig of signatures) {
        for (const aug of AUG_DATA) {
            if (aug.name === sig.name && aug.level === sig.level) {
                augments.push(aug);
                break;
            }
        }
    }
    return augments;
};
const augmentDataToSignatures = (
    augments: AugmentData[],
): AugmentDataSignature[] => {
    let signatures: AugmentDataSignature[] = [];
    for (const aug of augments) {
        const signature: AugmentDataSignature = {
            name: aug.name,
            level: aug.level,
        };
        signatures.push(signature);
    }
    return signatures;
};
// ---------------------------------

// ---------------------------------
// `Equipment` and `EquipmentSignature` conversion
const equipmentFromSignatures = (
    signatures: EquipmentSignature[],
): Equipment[] => {
    let equipment: Equipment[] = [];
    for (const sig of signatures) {
        let eq_data: EquipmentData | null = null;
        if (sig.equipment) {
            for (const eq of [...WEAPON_DATA, ...UNIT_DATA]) {
                if (eq.name === sig.equipment.name) {
                    eq_data = eq;
                    break;
                }
            }
        }
        const eq: Equipment = {
            equipment: eq_data,
            augments: augmentDataFromSignatures(sig.augments),
        };
        equipment.push(eq);
    }
    return equipment;
};

const equipmentToSignatures = (
    equipment: Equipment[],
): EquipmentSignature[] => {
    let signatures: EquipmentSignature[] = [];
    for (const eq of equipment) {
        let eq_sig: { name: string } | null = null;
        if (eq.equipment) {
            eq_sig = { name: eq.equipment.name };
        }
        const signature: EquipmentSignature = {
            equipment: eq_sig,
            augments: augmentDataToSignatures(eq.augments),
        };
        signatures.push(signature);
    }
    return signatures;
};
// ---------------------------------

// ---------------------------------
// `AugmentPreset` and `AugmentPresetSignature` conversion
export const augmentPresetFromSignatures = (
    signatures: AugmentPresetSignature[],
): AugmentPreset[] => {
    let presets: AugmentPreset[] = [];
    for (const sig of signatures) {
        const preset: AugmentPreset = {
            name: sig.name,
            description: sig.description,
            augments: augmentDataFromSignatures(sig.augments),
        };
        presets.push(preset);
    }
    return presets;
};

export const augmentPresetToSignature = (
    presets: AugmentPreset[],
): AugmentPresetSignature[] => {
    let signatures: AugmentPresetSignature[] = [];
    for (const preset of presets) {
        const signature: AugmentPresetSignature = {
            name: preset.name,
            description: preset.description,
            augments: augmentDataToSignatures(preset.augments),
        };
        signatures.push(signature);
    }
    return signatures;
};
// ---------------------------------

// ---------------------------------
export const loadoutPresetsFromSignatures = (
    signatures: LoadoutPresetSignature[],
): LoadoutPreset[] => {
    let presets: LoadoutPreset[] = [];
    for (const sig of signatures) {
        const preset = {
            name: sig.name,
            description: sig.description,
            equipment: equipmentFromSignatures(sig.equipment),
        };
        presets.push(preset);
    }
    return presets;
};
export const loadoutPresetToSignatures = (
    presets: LoadoutPreset[],
): LoadoutPresetSignature[] => {
    let signatures: LoadoutPresetSignature[] = [];
    for (const preset of presets) {
        const signature: LoadoutPresetSignature = {
            name: preset.name,
            description: preset.description,
            equipment: equipmentToSignatures(preset.equipment),
        };
        signatures.push(signature);
    }
    return signatures;
};
// ---------------------------------

// ---------------------------------
// Loading and saving from local storage
type AugmentKey = "augmentPreset";
type LoadoutKey = "loadoutPreset";

export const loadSession = <T>(key: AugmentKey | LoadoutKey): T[] => {
    const unparsed_value = localStorage.getItem(key);
    if (unparsed_value === null) {
        return [];
    }
    const uncheck_presets = JSON.parse(unparsed_value);
    // check if the uncheck is an array or not
    // before iterating over
    if (!Array.isArray(uncheck_presets)) {
        return [];
    }
    return uncheck_presets;
};

export const saveSession = <Signature>(
    key: AugmentKey | LoadoutKey,
    signatures: Signature[],
) => {
    const json_value = JSON.stringify(signatures);
    localStorage.setItem(key, json_value);
};
// ---------------------------------

// ---------------------------------
// macro for checking preset use in conjunction with `loadSession()`
export const loadPresets = <Signature, Preset>(
    uncheck_signatures: Signature[],
    typeguard_checker: (obj: any) => boolean,
    preset_retriever: (obj: Signature[]) => Preset[],
) => {
    let checked_signatures: Signature[] = [];
    for (const uncheck_sig of uncheck_signatures) {
        const is_good = typeguard_checker(uncheck_sig);
        if (is_good) {
            checked_signatures.push(uncheck_sig);
        }
    }
    return preset_retriever(checked_signatures);
};
// ---------------------------------
