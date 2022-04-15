// describe an effect e.g. HP, PP, mel pot etc.
export interface Effect {
    eff: string;
    amt: number;
}

// describe an augment e.g. stamina I, addis
export interface AugmentData {
    name: string;
    level: number;
    effs: Effect[];
    group: string;
    conflict: string[];
    condition: string;
}

// describe an equipment e.g. weapons and units
export interface EquipmentData {
    name: string;
    effs: Effect[];
    group: string;
}

export interface AugmentSignature {
    name: string;
    level: number;
}

// describe an augment preset
export interface AugmentPreset {
    name: string;
    description: string;
    augments: AugmentSignature[];
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
    const desc_is_string = typeof obj.description;

    // make sure the `augments` prop is an array first
    // before iterating over it
    const augments_is_array = Array.isArray(obj.augments);
    if (name_is_string && desc_is_string && augments_is_array) {
        for (const item of obj.augments) {
            // perform typeguard check on every item of the array
            // if an item is not an augment signature, return false
            const item_is_signature = TypeguardAugmentSignature(item);
            if (!item_is_signature) {
                return false;
            }
        }
        // if all cases passed, return true
        return true;
    }
    return false;
};

// -------------------------------------------
