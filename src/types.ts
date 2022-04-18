// describe an effect [HP, PP, mel pot etc.]
export interface Effect {
    eff: string;
    amt: number;
}

// describe an augment [stamina, spirit etc.]
export interface AugmentData {
    name: string;
    level: number;
    bp: number;
    effs: Effect[];
    group: string;
    conflict: string[];
    condition: string;
}

// describe an augment's signature
// which will be use to reconstruct the augment data
export interface AugmentDataSignature {
    name: string;
    level: number;
}

// describe an equipment [weapons and units]
export interface EquipmentData {
    name: string;
    effs: Effect[];
    group: string;
}

export interface EquipmentDataSignature {
    name: string;
}

export interface EquipmentWithAugments {
    equipment: EquipmentData | null;
    augments: AugmentData[];
}

// describe an equipment signature
// which will be use to reconstruct the equipment SETUP
export interface EquipmentWithAugmentSignature {
    name: string;
    augments: AugmentDataSignature[];
}

// describe an augment preset
// THIS STRUCTURE WILL BE EXPORTED
export interface AugmentPreset {
    name: string;
    description: string;
    augments: AugmentDataSignature[];
}

// describe a loadout preset
// THIS STRUCTURE WILL BE EXPORTED
export interface LoadoutPreset {
    name: string;
    description: string;
    weapon: EquipmentWithAugmentSignature | null;
    units: EquipmentWithAugmentSignature[];
}

// -------------------------------------------
// Runtime typeguard

// For augment signature
export const TypeguardAugmentSignature = (obj: any) => {
    const name_is_string = typeof obj.name === "string";
    const level_is_number = typeof obj.level === "number";
    return name_is_string && level_is_number;
};

// For augment preset
export const TypeguardAugmentPreset = (obj: any) => {
    // check basic property
    const name_is_string = typeof obj.name === "string";
    const desc_is_string = typeof obj.description === "string";

    // make sure the property `augments` is an array
    // before iterating over it
    const augments_is_array = Array.isArray(obj.augments);
    if (name_is_string && desc_is_string && augments_is_array) {
        // typeguard every item in array `augments`
        for (const item of obj.augments) {
            const item_is_signature = TypeguardAugmentSignature(item);
            if (!item_is_signature) {
                // an item in array is not an augment signature
                return false;
            }
        }
        // all cases passed, return true
        return true;
    }
    // property `augments` is not an array
    return false;
};

export const TypeGuardEquipmentSignature = (obj: any) => {};

// for loadout preset
export const TypeguardLoadoutPreset = (obj: any) => {
    // check basic property
    const name_is_string = typeof obj.name === "string";
    const desc_is_string = typeof obj.description === "string";

    // make sure the property `augments` is an array
    // before iterating over it
    const augments_is_array = Array.isArray(obj.augments);
    if (name_is_string && desc_is_string && augments_is_array) {
        // typeguard every item in array `augments`
        for (const item of obj.augments) {
            const item_is_signature = TypeguardAugmentSignature(item);
            if (!item_is_signature) {
                // an item in array is not an augment signature
                return false;
            }
        }
        // all cases passed, return true
        return true;
    }
    // property `augments` is not an array
    return false;
};

// -------------------------------------------
