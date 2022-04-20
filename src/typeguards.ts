// -------------------------------------------
// RUNTIME TYPE GUARD
/**
 * Type guard for `AugmentDataSignature`.
 *
 * `name` must be a string and `level` must be a number.
 * @param obj
 * @returns
 */
const TypeguardAugmentDataSignature = (obj: any) => {
    const name_is_string = typeof obj.name === "string";
    const level_is_number = typeof obj.level === "number";
    return name_is_string && level_is_number;
};

/**
 * Type guard for `AugmentPresetSignature`.
 *
 * `name` and `description` must be string.
 * `augments` must be an array of `AugmentDataSignature`.
 * @param obj
 * @returns
 */
export const TypeguardAugmentPresetSignature = (obj: any) => {
    // check basic property
    const name_is_string = typeof obj.name === "string";
    const desc_is_string = typeof obj.description === "string";

    // make sure the property `augments` is an array
    // before iterating over it
    const augments_is_array = Array.isArray(obj.augments);
    if (name_is_string && desc_is_string && augments_is_array) {
        // type check every item in array the `augments`
        for (const item of obj.augments) {
            const item_is_signature =
                TypeguardAugmentDataSignature(item);
            if (!item_is_signature) {
                // an item in array is not an `AugmentDataSignature`
                return false;
            }
        }
        // all cases passed, return true
        return true;
    }
    // property `augments` is not an array
    return false;
};

const typeguardEquipmentSignature = (obj: any) => {
    const equipment_data_check =
        obj.equipment === null ||
        typeof obj.equipment.name === "string";
    if (!equipment_data_check) {
        return false;
    }
    const augment_data_check = Array.isArray(obj.augments);
    if (augment_data_check) {
        for (const item of obj.augments) {
            const item_is_signature =
                TypeguardAugmentDataSignature(item);
            if (!item_is_signature) {
                return false;
            }
        }
        return true;
    }
    return false;
};

// for loadout preset
export const TypeguardLoadoutPresetSignature = (obj: any) => {
    // check basic property
    const name_is_string = typeof obj.name === "string";
    const desc_is_string = typeof obj.description === "string";

    const equipment_is_array = Array.isArray(obj.equipment);
    if (name_is_string && desc_is_string && equipment_is_array) {
        for (const item of obj.equipment) {
            const item_is_signature =
                typeguardEquipmentSignature(item);
            if (!item_is_signature) {
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
