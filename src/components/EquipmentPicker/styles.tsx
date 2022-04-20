import Box from "@mui/material/Box";
import { FilterOptionsState } from "@mui/material";

import { matchSorter } from "match-sorter";

import StyledAutocompleteOption from "../StyledAutocompleteOption";

import {
    isAddEffect,
    parseStat,
    EFFECT_NAME_TRANSLATE,
} from "../../util";
import { EquipmentData } from "../../types";

// ---------------------------------------------
/**
 * Render the options on dropdown menu
 * @param props
 * @param option
 * @returns
 */
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
