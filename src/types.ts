// ------------------------------------------------
// BASIC DATA STRUCTURES
/**
 * Describes how effects look like.
 */
export interface Effect {
    eff: string;
    amt: number;
}

/**
 * Describes how augments look like.
 */
export interface AugmentData {
    name: string;
    level: number;
    bp: number;
    effs: Effect[];
    group: string;
    conflict: string[];
    condition: string;
}

/**
 * Describes how weapons and units look like.
 */
export interface EquipmentData {
    name: string;
    effs: Effect[];
    group: string;
}
// ------------------------------------------------

// ------------------------------------------------
// COMPOSITE STRUCTURE
/**
 * Describes an `EquipmentData` and the `AugmentData` on it.
 */
export interface Equipment {
    equipment: EquipmentData | null;
    augments: AugmentData[];
}

/**
 * Describes a `named` group of `AugmentData`.
 */
export interface AugmentPreset {
    name: string;
    description: string;
    augments: AugmentData[];
}

/**
 * Describes a `named` group of `Equipment`.
 */
export interface LoadoutPreset {
    name: string;
    description: string;
    equipment: Equipment[];
}
// ------------------------------------------------

// ------------------------------------------------
// SIGNATURES STRUCTURES
/**
 * The signatures of an `AugmentData` are its `name` and `level`.
 */
export interface AugmentDataSignature {
    name: string;
    level: number;
}

/**
 * The signature of `EquipmentData` is its `name`.
 */
interface EquipmentDataSignature {
    name: string;
}

/**
 * Signature version of `Equipment`.
 */
export interface EquipmentSignature {
    equipment: EquipmentDataSignature | null;
    augments: AugmentDataSignature[];
}

/**
 * Signature of an `AugmentPreset`.
 *
 *  This will be exposed to the outside.
 */
export interface AugmentPresetSignature {
    name: string;
    description: string;
    augments: AugmentDataSignature[];
}

/**
 * Signature of a `LoadoutPreset`.
 *
 * This structure will be exposed to the outside.
 */
export interface LoadoutPresetSignature {
    name: string;
    description: string;
    equipment: EquipmentSignature[];
}
// ------------------------------------------------
