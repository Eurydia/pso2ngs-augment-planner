import { DATA_SIGNATURE as AUG_SIG } from "../assets/data/augments";
import { DATA_SIGNATURE as WEAPON_SIG } from "../assets/data/weapons";
import { DATA_SIGNATURE as UNIT_SIG } from "../assets/data/units";

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
/**
 * Match `AugmentDataSignature`s with `AugmentData`s.
 * @param signatures
 * @returns
 */
const augmentDataFromSignatures = (
    signatures: AugmentDataSignature[],
): AugmentData[] => {
    let data: AugmentData[] = [];
    for (const sig of signatures) {
        const aug = AUG_SIG[`${sig.name}${sig.level}`];
        // Signature that doesn't match won't be included.
        if (aug !== undefined) {
            data.push(aug);
        }
    }
    return data;
};
/**
 * Strip `AugmentData`s down to signatures.
 * @param data
 * @returns
 */
const augmentDataToSignatures = (
    data: AugmentData[],
): AugmentDataSignature[] => {
    let signatures: AugmentDataSignature[] = [];
    for (const aug of data) {
        signatures.push({
            name: aug.name,
            level: aug.level,
        });
    }
    return signatures;
};
// ---------------------------------

// ---------------------------------
/**
 * Match an `EquipmentDataSignature` with `EquipmentData`.
 * Return `null` when failed to match with any.
 * @param signature
 * @returns
 */
const equipmentDataFromSignature = (
    signature: EquipmentDataSignature,
): EquipmentData | null => {
    let data: EquipmentData | null = null;
    if (signature.name in Object.keys(WEAPON_SIG)) {
        data = WEAPON_SIG[signature.name];
    } else if (signature.name in Object.keys(UNIT_SIG)) {
        data = UNIT_SIG[signature.name];
    }
    return data;
};
/**
 * Strip `EquipmentData`s down to signatures.
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
/**
 * Build `Equipment`s from signatures.
 *
 * Uses `equipmentDataFromSignature()` and
 * `augmentDataFromSignature()`.
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
 * Strip array of `Equipment` down to signatures.
 *
 * Uses `equimentDataToSignature()` and
 * `augmentDataToSignatures()`.
 * @param data
 * @returns
 */
const equipmentToSignatures = (
    data: Equipment[],
): EquipmentSignature[] => {
    let sigs: EquipmentSignature[] = [];
    for (const eq of data) {
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
/**
 * Build `AugmentPreset` from signatures.
 *
 * Uses `augmentDataFromSignatures()`.
 * @param signatures
 * @returns
 */
export const augmentPresetsFromSignatures = (
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
 * Strip `AugmentPreset`s down to signatures.
 *
 * Uses `augmentDataToSignatures()`.
 * @param presets
 * @returns
 */
export const augmentPresetsToSignatures = (
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
/**
 * Build `LoadoutPreset`s from signatures.
 *
 * Uses `equipmentFromSignatures()`.
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
 * Strip `LoadoutEquipment`s down to signatures.
 *
 * Uses `equipmentToSignatures()`.
 * @param presets
 * @returns
 */
export const loadoutPresetsToSignatures = (
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
