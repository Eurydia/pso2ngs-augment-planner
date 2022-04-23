import Box from "@mui/material/Box";
import { FilterOptionsState } from "@mui/material";

import { matchSorter } from "match-sorter";

import PickerOption from "../PickerOption";

import { AugmentData } from "../../../types";
import {
    convertToRoman,
    EFFECT_NAME_TRANSLATE,
    parseEffectValue,
    isAddEffect,
} from "../../util";

// ---------------------------------------------
/**
 * For rendering the options on dropdown menu
 * @param props
 * @param option
 * @returns
 */
export const renderOption = (props: any, option: AugmentData) => {
    const roman_level = convertToRoman(option.level);
    const header = `${option.name} ${roman_level}`.trimEnd();
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
    subheaders.push(option.condition);
    return (
        <Box {...props}>
            <PickerOption
                // key={header}
                capitalizeHeader
                header={header}
                subheaders={subheaders}
            />
        </Box>
    );
};
// ---------------------------------------------

// ---------------------------------------------
/**
 * For rendering input on input field
 */
export const getOptionLabel = (option: AugmentData) => {
    return `${option.name} ${convertToRoman(option.level)}`;
};
// ---------------------------------------------

// ---------------------------------------------
/**
 * To stop MUI warning of displaying duplicate group header.
 * @param a
 * @param b
 * @returns
 */
const compare_groups = (a: AugmentData, b: AugmentData) => {
    if (a.group > b.group) {
        return 1;
    } else if (a.group < b.group) {
        return -1;
    }
    return 0;
};
/**
 * For filtering options using terms search.
 * @param options
 * @param state
 * @returns
 */
export const filterOptions = (
    options: AugmentData[],
    state: FilterOptionsState<AugmentData>,
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
                    "level",
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
