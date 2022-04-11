import { default as WEAPONS } from "../../assets/data/weapons";
import { default as UNITS } from "../../assets/data/units";
import StyledAutocompleteOption from "../StyledAutocompleteOption";
import { EquipmentData } from "../util";

// ---------------------------------------------
// Return text field adorments
export const prepareAdornment = (weapons: boolean, armors: boolean) => {
    let label = "";
    let placeholder = "";
    let options: EquipmentData[] = [];

    if (weapons && armors) {
        label = "Equipment";
        placeholder = "No equipment selected";
        options = [...WEAPONS, ...UNITS];
    } else if (armors) {
        label = "Units";
        placeholder = "No unit selected";
        options = UNITS;
    } else if (weapons) {
        label = "Weapons";
        placeholder = "No weapon selected";
        options = WEAPONS;
    }
    return { label, placeholder, options };
};
// ---------------------------------------------

// ---------------------------------------------
// Using the text field value to match with an Equipment Data
export const findMatching = (value: string, options: EquipmentData[]) => {
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
// ---------------------------------------------

// ---------------------------------------------
export const renderOption = (props: any, option: EquipmentData) => {
    const { name, effs } = option;
    return (
        <StyledAutocompleteOption
            key={name}
            s_props={props}
            name={name}
            effs={effs}
            condition=""
        />
    );
};
// ---------------------------------------------

// ---------------------------------------------
export const getOptionLabel = (option: EquipmentData) => {
    return option.name;
};
// ---------------------------------------------
