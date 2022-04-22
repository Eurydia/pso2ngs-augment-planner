// ------------------------------------
/**
 * Decribes effects
 */
export interface Effect {
    eff: string;
    amt: number;
}
// ------------------------------------

// ------------------------------------
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
 * Signature of `AugmentData`
 */
export interface AugmentDataSignature {
    name: string;
    level: number;
}
// ------------------------------------

// ------------------------------------
/**
 * Describes how weapons and units look like.
 */
export interface EquipmentData {
    name: string;
    effs: Effect[];
    group: string;
}
/**
 * Signature of `EquipmentData`
 */
export interface EquipmentDataSignature {
    name: string;
}
// ------------------------------------

// ------------------------------------
/**
 * Describes a **named** group of `AugmentData`.
 */
export interface AugmentPreset {
    name: string;
    description: string;
    augments: AugmentData[];
}
/**
 * Signature of `AugmentPreset`.
 *
 * **THIS STRUCTURE WILL EXPOSED.**
 */
export interface AugmentPresetSignature {
    name: string;
    description: string;
    augments: AugmentDataSignature[];
}
// ------------------------------------

// ------------------------------------
/**
 * Describe a piece of equipment and
 * the augments on it.
 */
export interface Equipment {
    equipment: EquipmentData | null;
    augments: AugmentData[];
}
/**
 * Signature of `Equipment`.
 */
export interface EquipmentSignature {
    equipment: EquipmentDataSignature | null;
    augments: AugmentDataSignature[];
}
// ------------------------------------

// ------------------------------------
/**
 * Describes a **named** group of `Equipment`.
 */
export interface LoadoutPreset {
    name: string;
    description: string;
    equipment: Equipment[];
}
/**
 * Signature of `LoadoutPreset`.
 *
 * **THIS STRUCTURE WILL BE EXPOSED TO THE OUTSIDE.**
 */
export interface LoadoutPresetSignature {
    name: string;
    description: string;
    equipment: EquipmentSignature[];
}
