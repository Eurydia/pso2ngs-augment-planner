// -------------------------------------------------------------
/**
 * Type guard `AugmentDataSignature`.
 * @param obj
 * @returns
 */
const typeGuardAugmentDataSignature = (obj: any) => {
    const name_is_string = typeof obj.name === "string";
    const level_is_number = typeof obj.level === "number";
    return name_is_string && level_is_number;
};
/**
 * Type guard `EquipmentDataSignature`.
 * @param obj
 * @returns
 */
const typeGuardEquipmentDataSignature = (obj: any) => {
    if (obj === null) {
        return true;
    }
    const name_is_string = typeof obj.name === "string";
    return name_is_string;
};
/**
 * Type guard `EquipmentSignature`.
 * @param obj
 * @returns
 */
const typeGuardEquipmentSignature = (obj: any) => {
    const equipment_data_check = typeGuardEquipmentDataSignature(
        obj.equipment,
    );
    if (!equipment_data_check) {
        return false;
    }
    if (Array.isArray(obj.augments)) {
        for (const item of obj.augments) {
            const is_signature = typeGuardAugmentDataSignature(item);
            if (!is_signature) {
                return false;
            }
        }
        return true;
    }
    return false;
};
// -------------------------------------------------------------

// -------------------------------------------------------------
/**
 * Type guard `AugmentPresetSignature`.
 *
 * Uses `typeGuardAugmentDataSignature()`.
 * @param obj
 * @returns
 */
export const typeGuardAugmentPresetSignature = (obj: any) => {
    // basic property
    const name_check = typeof obj.name === "string";
    const desc_check = typeof obj.description === "string";
    if (!name_check || !desc_check) {
        return false;
    }
    if (Array.isArray(obj.augments)) {
        for (const item of obj.augments) {
            const is_signature = typeGuardAugmentDataSignature(item);
            if (!is_signature) {
                return false;
            }
        }
        return true;
    }
    return false;
};
/**
 * Type guard `LoadoutPresetSignature`.
 *
 * Uses `typeGuardEquipmentSignature()`.
 * @param obj
 * @returns
 */
export const TypeguardLoadoutPresetSignature = (obj: any) => {
    // check basic property
    const name_check = typeof obj.name === "string";
    const desc_check = typeof obj.description === "string";
    if (!name_check || !desc_check) {
        return false;
    }
    if (Array.isArray(obj.equipment)) {
        for (const item of obj.equipment) {
            const is_signature = typeGuardEquipmentSignature(item);
            if (!is_signature) {
                return false;
            }
        }
        return true;
    }
    return false;
};
// -------------------------------------------
