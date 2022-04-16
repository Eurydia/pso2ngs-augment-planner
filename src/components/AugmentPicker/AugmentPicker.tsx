import React from "react";

import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

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
    disabled: boolean;
    onChange: (values: AugmentData[]) => void;
}

const AugmentPicker = (props: AugmentPickerProps) => {
    const { values, disabled } = props;

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
            disabled={disabled}
            value={values}
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
            sx={{
                textTransform: "capitalize",
            }}
        />
    );
};
export default AugmentPicker;
