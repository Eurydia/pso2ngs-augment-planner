import Box from "@mui/material/Box";

import StyledAutocompleteOption from "../StyledAutocompleteOption";

import {
    isAddEffect,
    parseStat,
    EFFECT_NAME_TRANSLATE,
} from "../../util";
import { EquipmentData } from "../../types";
import { default as WEAPONS } from "../../assets/data/weapons";
import { default as UNITS } from "../../assets/data/units";

// ---------------------------------------------
// Return text field adorments
export const prepareAdornment = (
    variant: "both" | "weapons" | "armors",
) => {
    let label = "";
    let placeholder = "";
    let options: EquipmentData[];
    if (variant === "both") {
        label = "Equipment";
        placeholder = "No equipment selected";
        options = [...WEAPONS, ...UNITS];
    } else if (variant === "armors") {
        label = "Units";
        placeholder = "No unit selected";
        options = UNITS;
    } else {
        label = "Weapons";
        placeholder = "No weapon selected";
        options = WEAPONS;
    }
    return { label, placeholder, options };
};
// ---------------------------------------------

// ---------------------------------------------
// Using the text field value to match with an Equipment Data
export const matchEquipment = (
    value: string,
    options: EquipmentData[],
) => {
    for (const option of options) {
        const { name } = option;
        if (value.toLowerCase() === name) {
            return option;
        }
    }
    return null;
};
// ---------------------------------------------

// ---------------------------------------------
export const renderOption = (props: any, option: EquipmentData) => {
    const { name: title, effs: effects } = option;
    let subheaders: string[] = [];
    for (const effect of effects) {
        const { eff, amt } = effect;
        const parsed_amt = parseStat(amt, isAddEffect(eff));
        const { emoji, name } = EFFECT_NAME_TRANSLATE[eff];
        const subheader = `${emoji} ${name} ${parsed_amt}`;
        subheaders.push(subheader);
    }

    return (
        <Box {...props}>
            <StyledAutocompleteOption
                capitalizeHeader
                key={title}
                header={title}
                subheaders={subheaders}
            />
        </Box>
    );
};
// ---------------------------------------------
