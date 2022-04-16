import Box from "@mui/material/Box";
import { FilterOptionsState } from "@mui/material";

import { matchSorter } from "match-sorter";

import StyledAutocompleteOption from "../StyledAutocompleteOption";
import { AugmentData } from "../../types";
import {
    convertToRoman,
    EFFECT_NAME_TRANSLATE,
    parseStat,
    isAddEffect,
} from "../../util";

// ---------------------------------------------
// For rendering options on dropdown
export const renderOption = (props: any, option: AugmentData) => {
    const roman_level = convertToRoman(option.level);
    const header = `${option.name} ${roman_level}`.trimEnd();

    let subheaders: string[] = [];
    for (const effect of option.effs) {
        const parsed_amt = parseStat(
            effect.amt,
            isAddEffect(effect.eff),
        );
        const { emoji, name } = EFFECT_NAME_TRANSLATE[effect.eff];

        const subheader = `${emoji} ${name} ${parsed_amt}`;
        subheaders.push(subheader);
    }
    subheaders.push(option.condition);
    return (
        <Box {...props}>
            <StyledAutocompleteOption
                key={header}
                capitalizeHeader
                header={header}
                subheaders={subheaders}
            />
        </Box>
    );
};
// ---------------------------------------------

// ---------------------------------------------
// For rendering input on input field
export const getOptionLabel = (option: AugmentData) => {
    return `${option.name} ${convertToRoman(option.level)}`;
};
// ---------------------------------------------

// ---------------------------------------------
// Move this to `types.tsx`
// const typeGuardAugmentData = (obj: any) => {
//     return (
//         obj.name !== undefined &&
//         obj.level !== undefined &&
//         obj.group !== undefined
//     );
// };

// for validating selected augments
export const validateAugments = (
    values: (string | AugmentData)[],
) => {
    let validated: AugmentData[] = [];
    for (let i = values.length - 1; i >= 0; i--) {
        const curr_value = values[i];

        if (typeof curr_value === "string") {
            continue;
        }

        let is_valid = true;

        for (const prev_value of validated) {
            const same_name = curr_value.name === prev_value.name;
            const group_conflict = prev_value.conflict.includes(
                curr_value.group,
            );
            const fused_and_mastery_exception =
                (curr_value.name === "mastery" &&
                    prev_value.group === "fused") ||
                (curr_value.group === "fused" &&
                    prev_value.name === "mastery");
            if (
                same_name ||
                (group_conflict && !fused_and_mastery_exception)
            ) {
                is_valid = false;
                break;
            }
        }
        if (is_valid && validated.length < 5) {
            validated.push(curr_value);
        }
    }
    validated.reverse();
    return validated;
};
// ---------------------------------------------

// ---------------------------------------------
// for better seach experience
// with this setup users can search for
// `name`
// `level(not roman)`
// `group`
// `effects on the augment`
// terms are seperated at evert `+` symbol
const compare_groups = (a: AugmentData, b: AugmentData) => {
    if (a.group > b.group) {
        return 1;
    } else if (a.group < b.group) {
        return -1;
    }
    return 0;
};

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
