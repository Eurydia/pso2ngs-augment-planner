import Box from "@mui/material/Box";
import { FilterOptionsState } from "@mui/material";

import { matchSorter } from "match-sorter";

import StyledAutoCompleteOption from "../StyledAutocompleteOption";

import { convertToRoman, EFFECT_NAME_TRANSLATE } from "../../util";
import { AugmentPreset } from "../../types";

// ---------------------------------------------
// For rendering augment preset picker's options
export const renderOption = (props: any, option: AugmentPreset) => {
    let subheaders: string[] = [];
    for (const aug of option.augments) {
        const roman_level = convertToRoman(aug.level);
        const parsed_name = `${aug.name} ${roman_level}`;

        let emojis: string = "";
        for (const eff of aug.effs) {
            const { emoji } = EFFECT_NAME_TRANSLATE[eff.eff];
            emojis = emojis.concat(emoji);
        }
        const subheader = `${emojis} ${parsed_name}`;
        subheaders.push(subheader);
    }
    return (
        <Box {...props}>
            <StyledAutoCompleteOption
                key={option.name}
                header={option.name}
                subheaders={subheaders}
            />
        </Box>
    );
};
// ---------------------------------------------

// ---------------------------------------------
// Users can search using
// preset name
// augment name in preset
// augment level in preset
// terms are seperated at evert `+` symbol
export const filterOptions = (
    options: AugmentPreset[],
    state: FilterOptionsState<AugmentPreset>,
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
                keys: ["name", "augments.*.level", "augments.*.name"],
            }),
        options,
    );
    return found;
};
// ---------------------------------------------
