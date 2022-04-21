import Box from "@mui/material/Box";
import { FilterOptionsState } from "@mui/material";

import { matchSorter } from "match-sorter";

import StyledAutoCompleteOption from "../StyledAutocompleteOption";

import {
    convertToRoman,
    augmentFromSignature,
    EFFECT_NAME_TRANSLATE,
} from "../../util";
import { AugmentPreset } from "../../types";

// ---------------------------------------------
/**
 * For rendering options on dropdown menu
 * @param props
 * @param option
 * @returns
 */
export const renderOption = (props: any, option: AugmentPreset) => {
    const { name: header, augments: signatures } = option;

    let subheaders: string[] = [];
    for (const signature of signatures) {
        const augment = augmentFromSignature(signature);
        if (augment === null) {
            continue;
        }
        const { name, level, effs } = augment;
        const parsed_level = convertToRoman(level);
        const parsed_name = `${name} ${parsed_level}`;

        let emojis: string = "";
        for (const eff of effs) {
            const { emoji } = EFFECT_NAME_TRANSLATE[eff.eff];
            emojis = emojis.concat(emoji);
        }
        const subheader = `${emojis} ${parsed_name}`;
        subheaders.push(subheader);
    }

    return (
        <Box {...props}>
            <StyledAutoCompleteOption
                key={header}
                header={header}
                subheaders={subheaders}
            />
        </Box>
    );
};
// ---------------------------------------------

// ---------------------------------------------
/**
 * Allow fuzzy search using
 * Preset name,
 * Augment name,
 * Augment level.
 * @param options
 * @param state
 * @returns
 */
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
