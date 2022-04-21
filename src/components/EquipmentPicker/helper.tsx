<<<<<<< Updated upstream
import Box from "@mui/material/Box";
import { FilterOptionsState } from "@mui/material";

import { matchSorter } from "match-sorter";

import StyledAutocompleteOption from "../StyledAutocompleteOption";
import {
    isAddEffect,
    parseStat,
    EFFECT_NAME_TRANSLATE,
} from "../../util";
=======
>>>>>>> Stashed changes
import { EquipmentData } from "../../types";
import { default as WEAPONS } from "../../assets/data/weapons";
import { default as UNITS } from "../../assets/data/units";

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
<<<<<<< Updated upstream
// Using the text field value to match with an Equipment Data
export const findMatching = (
=======
/**
 * Match value on input field with the name of an EquipmentData.
 * TODO: Implement a better to match signature with data.
 * @param value
 * @param options
 * @returns
 */
export const matchEquipment = (
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream

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

// ---------------------------------------------
export const getOptionLabel = (option: EquipmentData) => {
    return option.name;
};
// ---------------------------------------------

// ---------------------------------------------
const compare_groups = (a: EquipmentData, b: EquipmentData) => {
    if (a.group > b.group) {
        return 1;
    } else if (a.group < b.group) {
        return -1;
    }
    return 0;
};
// Users can search using
// Equipment name
// equipment group
// effect name
// terms are seperated at evert `+` symbol
export const filterOptions = (
    options: EquipmentData[],
    state: FilterOptionsState<EquipmentData>,
) => {
    const value = state.inputValue.normalize();
    if (!value || !value.length) {
        return options;
    }

    const terms = state.inputValue
        .split("+")
        .map((term) => term.trim())
        .filter((term) => Boolean(term));
    if (!terms) {
        return options;
    }

    const found = terms.reduceRight(
        (res, term) =>
            matchSorter(res, term, {
                keys: [
                    "name",
                    "group",
                    (item) =>
                        item.effs.map((i) => i.eff.replace("_", " ")),
                ],
            }),
        options,
    );
    const sorted = found.sort((a, b) => compare_groups(a, b));
    return sorted;
};
// ---------------------------------------------
=======
>>>>>>> Stashed changes
