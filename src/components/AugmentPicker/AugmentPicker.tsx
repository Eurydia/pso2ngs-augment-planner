import React from "react";

import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import useTheme from "@mui/material/styles/useTheme";
import { Theme } from "@mui/material/styles";

import {
    getOptionLabel,
    validateAugments,
    renderOption,
    filterOptions,
} from "./helper";
import { AugmentData } from "../../types";
import DATA from "../../assets/data/augments";

interface AugmentPickerProps {
    values: AugmentData[];
    disabled?: boolean;
    onChange: (values: AugmentData[]) => void;
}

const styled = {
    textTransform: "capitalize",
};

const chip_props = (theme: Theme) => {
    return {
        sx: {
            width: 1,
            fontWeight: theme.typography.fontWeightBold,
        },
    };
};
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
            disabled={props.disabled}
            value={props.values}
            sx={styled}
            ChipProps={chip_props(theme)}
            groupBy={(option) => option.group}
            getOptionLabel={getOptionLabel}
            onChange={handleChange}
            renderOption={renderOption}
            filterOptions={filterOptions}
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
const propsAreEqual = (
    prev: AugmentPickerProps,
    next: AugmentPickerProps,
) => {
    const p = prev.values;
    const n = next.values;

    if (p.length !== n.length) {
        return false;
    }

    for (let i = 0; i < p.length; i++) {
        const p_a = p[i];
        const n_a = n[i];
        if (p_a.name !== n_a.name || p_a.level !== n_a.level) {
            return false;
        }
    }
    return true;
};
export default React.memo(AugmentPicker, propsAreEqual);
