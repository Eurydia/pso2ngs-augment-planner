import { default as WEAPONS } from "../../assets/data/weapons";
import { default as UNITS } from "../../assets/data/units";
import { EquipmentData } from "../util";
import { match } from "assert";

export const prepareAdornment = (
    weapons: boolean,
    armors: boolean,
) => {
    let label = "";
    let placeholder = "";
    let options: EquipmentData[] = [];

    if (weapons) {
        label = "Weapons";
        placeholder = "No weapon selected";
        options = WEAPONS;
    } else if (armors) {
        label = "Units";
        placeholder = "No unit selected";
        options = UNITS;
    } else {
        label = "Equipment";
        placeholder = "No equipment selected";
        options = [...WEAPONS, ...UNITS];
    }
    return { label, placeholder, options };
};

export const findMatching = (
    value: string,
    options: EquipmentData[],
) => {
    let match_found: EquipmentData | null = null;
    for (let i = 0; i < options.length; i++) {
        const { name } = options[i];
        if (value.toLocaleLowerCase() === name) {
            match_found = options[i];
            break;
        }
    }
    return match_found;
};
