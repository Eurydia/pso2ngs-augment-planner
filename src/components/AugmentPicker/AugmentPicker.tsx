import React from "react";

import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import useTheme from "@mui/material/styles/useTheme";

import { validateAugments } from "./helper";
import {
    autocomplete_sx,
    getChipProps,
    getOptionLabel,
    renderOption,
    filterOptions,
} from "./styles";

import { AugmentData } from "../../types";
import DATA from "../../assets/data/augments";

interface AugmentPickerProps {
    values: AugmentData[];
    onChange: (values: AugmentData[]) => void;
}

const AugmentPicker = (props: AugmentPickerProps) => {
    const theme = useTheme();

    const handleChange = (
        event: React.SyntheticEvent,
        values: (string | AugmentData)[],
        reason: string,
    ) => {
        const validated = validateAugments(values);
        props.onChange(validated);
    };

    return (
        <Autocomplete
            fullWidth
            multiple
            filterSelectedOptions
            options={DATA}
            value={props.values}
            sx={autocomplete_sx}
            ChipProps={getChipProps(theme)}
            getOptionLabel={getOptionLabel}
            onChange={handleChange}
            renderOption={renderOption}
            filterOptions={filterOptions}
            groupBy={(option) => option.group}
            renderInput={(params: any) => {
                return (
                    <TextField
                        {...params}
                        variant="filled"
                        label="Augment"
                        placeholder='try "pp + rng + 3"'
                    />
                );
            }}
        />
    );
};

/**
 * Compare every augments.
 * Rerender if one of them is different. b
 * @param prev
 * @param next
 * @returns
 */
const shouldAugmentPickerNOTRerender = (
    prev: AugmentPickerProps,
    next: AugmentPickerProps,
) => {
    const p = prev.values;
    const n = next.values;
    if (p.length !== n.length) {
        return false;
    }
    for (let i = 0; i < p.length; i++) {
        const p_aug = p[i];
        const n_aug = n[i];
        if (
            p_aug.name !== n_aug.name ||
            p_aug.level !== n_aug.level
        ) {
            return false;
        }
    }
    return true;
};
export default React.memo(
    AugmentPicker,
    shouldAugmentPickerNOTRerender,
);
