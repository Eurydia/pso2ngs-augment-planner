import React, { useState } from "react";

import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

import { getOptionLabel, validateValues } from "./helper";
import StyledAutocompleteOption from "../StyledAutocompleteOption";
import { convertToRoman, AugmentData } from "../util";
import DATA from "../../assets/data/augments";

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
            renderOption={(props: any, option: AugmentData) => {
                const roman = convertToRoman(option.level);
                const name = `${option.name} ${roman}`;
                const { effs, condition } = option;
                return (
                    <StyledAutocompleteOption
                        s_props={props}
                        name={name}
                        effs={effs}
                        condition={condition}
                    />
                );
            }}
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
