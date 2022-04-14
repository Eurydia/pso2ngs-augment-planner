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
    const { effs: effects, condition } = option;

    let subheaders: string[] = [];
    for (const effect of effects) {
        const { eff, amt } = effect;
        const parsed_amt = parseStat(amt, isAddEffect(eff));
        const { emoji, name } = EFFECT_NAME_TRANSLATE[eff];

        const subheader = `${emoji} ${name} ${parsed_amt}`;
        subheaders.push(subheader);
    }
    subheaders.push(condition);
    return (
        <StyledAutocompleteOption
            key={header}
            s_props={props}
            header={header}
            capitalizeHeader={true}
            subheaders={subheaders}
        />
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

        if (
            typeof curr_value === "string"
            //  || !typeGuardAugmentData(curr_value)
        ) {
            continue;
        }

        let is_valid = true;
        for (let j = 0; j < validated.length; j++) {
            const previous_value = validated[j];
            if (
                curr_value.name === previous_value.name ||
                previous_value.conflict.includes(curr_value.group)
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
