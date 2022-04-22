import { default as AUG_DATA } from "../assets/data/augments";
import { default as WEAPON_DATA } from "../assets/data/weapons";
import { default as UNIT_DATA } from "../assets/data/units";

import {
    AugmentData,
    AugmentDataSignature,
    EquipmentData,
    EquipmentDataSignature,
    Equipment,
    EquipmentSignature,
    AugmentPreset,
    AugmentPresetSignature,
    LoadoutPreset,
    LoadoutPresetSignature,
} from "../types";

// ---------------------------------
// `AugmentData` and `AugmentDataSignature` conversion
/**
 * Match `AugmentDataSignature` signatures with their `AugmentData` counterpart.
 * If a signature failed to match, it won't be included in the result.
 * @param signatures
 * @returns
 */
const augmentDataFromSignatures = (
    signatures: AugmentDataSignature[],
): AugmentData[] => {
    let augs_data: AugmentData[] = [];
    for (const sig of signatures) {
        // TODO: implement some kind of dictionary to make matching more efficient
        // iterate through all augments to find a match
        for (const aug of AUG_DATA) {
            if (aug.name === sig.name && aug.level === sig.level) {
                augs_data.push(aug);
                break;
            }
        }
    }
    return augs_data;
};
/**
 * Strip `AugmentData` down to their signature.
 * @param data
 * @returns
 */
const augmentDataToSignatures = (
    data: AugmentData[],
): AugmentDataSignature[] => {
    let sigs: AugmentDataSignature[] = [];
    for (const aug of data) {
        sigs.push({
            name: aug.name,
            level: aug.level,
        });
    }
    return sigs;
};
// ---------------------------------

// ---------------------------------
// `EquipmentData` and `EquipmentDataSignature` conversion
/**
 * Match an `EquipmentDataSignature` with its counterpart.
 * Return `null` when failed to match.
 * @param signature
 * @returns
 */
const equipmentDataFromSignature = (
    signature: EquipmentDataSignature,
): EquipmentData | null => {
    // Iterate over all equipment to find a match.
    // TODO: Again implement some kind of dictionary please.
    for (const eq of [...WEAPON_DATA, ...UNIT_DATA]) {
        if (eq.name === signature.name) {
            return eq;
        }
    }
    return null;
};
/**
 * Strip `EquipmentData` to its signature.
 * @param data
 * @returns
 */
const equipmentDataToSignature = (
    data: EquipmentData,
): EquipmentDataSignature => {
    return {
        name: data.name,
    };
};
// ---------------------------------

// ---------------------------------
// `Equipment` and `EquipmentSignature` conversion
/**
 * `EquipmentSignature` contains two properties which are both signatures.
 * To reconstruct the `Equipment`, I just reconstruct its properties.
 * @param signatures
 * @returns
 */
const equipmentFromSignatures = (
    signatures: EquipmentSignature[],
): Equipment[] => {
    let equipment: Equipment[] = [];
    for (const sig of signatures) {
        let eq_data: EquipmentData | null = null;
        if (sig.equipment) {
            eq_data = equipmentDataFromSignature(sig.equipment);
        }
        equipment.push({
            equipment: eq_data,
            augments: augmentDataFromSignatures(sig.augments),
        });
    }
    return equipment;
};
/**
 * The signature of an `Equipment` is just the signatures of its property.
 * @param equipment
 * @returns
 */
const equipmentToSignatures = (
    equipment: Equipment[],
): EquipmentSignature[] => {
    let sigs: EquipmentSignature[] = [];
    for (const eq of equipment) {
        let eq_data_sig: EquipmentDataSignature | null = null;
        if (eq.equipment) {
            eq_data_sig = equipmentDataToSignature(eq.equipment);
        }
        sigs.push({
            equipment: eq_data_sig,
            augments: augmentDataToSignatures(eq.augments),
        });
    }
    return sigs;
};
// ---------------------------------

// ---------------------------------
// `AugmentPreset` and `AugmentPresetSignature` conversion
/**
 * Uses the `augmentDataFromSignatures` to reconstruct the presets.
 * @param signatures
 * @returns
 */
export const augmentPresetFromSignatures = (
    signatures: AugmentPresetSignature[],
): AugmentPreset[] => {
    let presets: AugmentPreset[] = [];
    for (const sig of signatures) {
        presets.push({
            name: sig.name,
            description: sig.description,
            augments: augmentDataFromSignatures(sig.augments),
        });
    }
    return presets;
};
/**
 * Uses `augmentDataToSignatures` to strip `AugmentData`.
 * @param presets
 * @returns
 */
export const augmentPresetToSignature = (
    presets: AugmentPreset[],
): AugmentPresetSignature[] => {
    let signatures: AugmentPresetSignature[] = [];
    for (const preset of presets) {
        signatures.push({
            name: preset.name,
            description: preset.description,
            augments: augmentDataToSignatures(preset.augments),
        });
    }
    return signatures;
};
// ---------------------------------

// ---------------------------------
// `LoadoutPreset` and `LoadoutPresetSignature` conversion
/**
 * Uses `equipmentFromSignatures` to reconstruct the presets.
 * @param signatures
 * @returns
 */
export const loadoutPresetsFromSignatures = (
    signatures: LoadoutPresetSignature[],
): LoadoutPreset[] => {
    let presets: LoadoutPreset[] = [];
    for (const sig of signatures) {
        presets.push({
            name: sig.name,
            description: sig.description,
            equipment: equipmentFromSignatures(sig.equipment),
        });
    }
    return presets;
};
/**
 * Uses `equipmentToSignatures` to strip `Equipment`.
 * @param presets
 * @returns
 */
export const loadoutPresetToSignatures = (
    presets: LoadoutPreset[],
): LoadoutPresetSignature[] => {
    let signatures: LoadoutPresetSignature[] = [];
    for (const preset of presets) {
        signatures.push({
            name: preset.name,
            description: preset.description,
            equipment: equipmentToSignatures(preset.equipment),
        });
    }
    return signatures;
};
// ---------------------------------
