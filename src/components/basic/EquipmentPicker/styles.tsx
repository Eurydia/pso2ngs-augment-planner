import Box from "@mui/material/Box";
import { FilterOptionsState } from "@mui/material";

import { matchSorter } from "match-sorter";

import PickerOption from "../PickerOption";

import {
    isAddEffect,
    parseEffectValue,
    EFFECT_NAME_TRANSLATE,
} from "../../util";
import { EquipmentData } from "../../../types";

// ---------------------------------------------
/**
 * Render the options on dropdown menu
 * @param props
 * @param option
 * @returns
 */
export const renderOption = (props: any, option: EquipmentData) => {
    let subheaders: string[] = [];
    for (const eff of option.effs) {
        const parsed_amt = parseEffectValue(
            eff.amt,
            isAddEffect(eff.eff),
        );
        const { emoji, name } = EFFECT_NAME_TRANSLATE[eff.eff];
        const subheader = `${emoji} ${name} ${parsed_amt}`;
        subheaders.push(subheader);
    }
    return (
        <Box {...props}>
            <PickerOption
                capitalizeHeader
                key={option.name}
                header={option.name}
                subheaders={subheaders}
            />
        </Box>
    );
};
// ---------------------------------------------

// ---------------------------------------------
/**
 * Without this MUI will throw a warning about `duplicate group header`.
 * @param a
 * @param b
 * @returns
 */
const compare_groups = (a: EquipmentData, b: EquipmentData) => {
    if (a.group > b.group) {
        return 1;
    } else if (a.group < b.group) {
        return -1;
    }
    return 0;
};
/**
 * Allow fuzzy search using
 * Equipment name,
 * Equipment group,
 * Effect name on the equipment
 * @param options
 * @param state
 * @returns
 */
export const filterOptions = (
    options: EquipmentData[],
    state: FilterOptionsState<EquipmentData>,
) => {
    // return all options if input field is empty
    const value = state.inputValue.normalize().trim();
    if (!value || !value.length) {
        return options;
    }
    // create search terms
    // return all options if no search terms exists
    const terms = state.inputValue
        .split("+")
        .map((term) => term.trim())
        .filter((term) => Boolean(term));
    if (!terms) {
        return options;
    }
    // matching
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
    // put matched options in the correct order
    const sorted = found.sort((a, b) => compare_groups(a, b));
    return sorted;
};
// ---------------------------------------------
