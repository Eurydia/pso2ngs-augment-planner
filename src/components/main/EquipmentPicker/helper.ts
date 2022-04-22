import { EquipmentData } from "../../../types";
import { default as WEAPONS } from "../../../assets/data/weapons";
import { default as UNITS } from "../../../assets/data/units";

// ---------------------------------------------
/**
 * Return input field adornments according to the variant given.
 * @param variant
 * @returns
 */
export const prepareAdornment = (
    variant: "both" | "weapons" | "armors",
) => {
    let label = "";
    let placeholder = "";
    let options: EquipmentData[];
    switch (variant) {
        case "both":
            label = "Equipment";
            placeholder = "No equipment selected";
            options = [...WEAPONS, ...UNITS];
            break;
        case "armors":
            label = "Units";
            placeholder = "No unit selected";
            options = UNITS;
            break;
        case "weapons":
            label = "Weapons";
            placeholder = "No weapon selected";
            options = WEAPONS;
            break;
    }
    return { label, placeholder, options };
};
// ---------------------------------------------

// ---------------------------------------------
/**
 * Match value on input field with the name of an EquipmentData.
 * TODO: Implement a better to match signature with data.
 * @param value
 * @param options
 * @returns
 */
export const matchEquipment = (
    value: string,
    options: EquipmentData[],
) => {
    const v = value.toLowerCase();
    for (const option of options) {
        if (option.name === v) {
            return option;
        }
    }
    return null;
};
// ---------------------------------------------
