import React from "react";

import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

import { getOptionLabel, validateValues, renderOption } from "./helper";
import { AugmentData } from "../util";
import DATA from "../../assets/data/augments";

interface AugmentPickerProps {
    values: AugmentData[];
    disabled: boolean;
    onChange: (values: AugmentData[]) => void;
}

const AugmentPicker = (props: AugmentPickerProps) => {
    const handleChange = (
        event: React.SyntheticEvent,
        values: (string | AugmentData)[],
        reason: string,
    ) => {
        const validated = validateValues(values);
        props.onChange(validated);
    };

    return (
        <Autocomplete
            fullWidth
            multiple
            filterSelectedOptions
            disabled={props.disabled}
            options={DATA}
            value={props.values}
            getOptionLabel={getOptionLabel}
            onChange={handleChange}
            renderOption={renderOption}
            groupBy={(option) => option.group}
            renderInput={(params: any) => {
                return (
                    <TextField
                        {...params}
                        variant="filled"
                        label="Augment"
                    />
                );
            }}
        />
    );
};
export default AugmentPicker;
