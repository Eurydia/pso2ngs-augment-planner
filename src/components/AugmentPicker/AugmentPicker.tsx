import React, { useState } from "react";

import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

import { getOptionLabel, renderOption, validateValues } from "./helper";

import DATA from "../../assets/data/augments";
import { AugmentData } from "../../assets/data/types";

interface AugmentPickerProps {
    onChange: Function;
}

const AugmentPicker = (props: AugmentPickerProps) => {
    const initial_state: AugmentData[] = [];

    const [autocompleteValues, setAutocompleteValues] =
        useState(initial_state);

    const handleChange = (
        event: React.SyntheticEvent,
        values: (string | AugmentData)[],
        reason: string,
    ) => {
        const validated = validateValues(values);
        setAutocompleteValues(validated);

        props.onChange(validated);
    };

    return (
        <Autocomplete
            fullWidth
            freeSolo
            multiple
            filterSelectedOptions
            value={autocompleteValues}
            options={DATA}
            getOptionLabel={getOptionLabel}
            onChange={handleChange}
            groupBy={(option) => option.group}
            // `renderOption` renders options on dropdown
            renderOption={renderOption}
            // `renderInput` renders the input field itself
            renderInput={(params: any) => {
                return (
                    <TextField
                        {...params}
                        variant="filled"
                        // helperText="some result may be hidden."
                        label="Augment"
                    />
                );
            }}
        />
    );
};
export default AugmentPicker;
