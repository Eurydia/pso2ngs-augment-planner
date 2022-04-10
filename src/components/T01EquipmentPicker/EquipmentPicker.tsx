import React, { useState } from "react";

import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

import { prepareAdornment, findMatching } from "./helper";

import StyledAutocompleteOption from "../T01StyledAutocompleteOption";
import { EquipmentData } from "../util";

interface EquipmentPickerProps {
    weapons: boolean;
    armors: boolean;
    onChange: Function;
}

const EquipmentPicker = (props: EquipmentPickerProps) => {
    const initial_value = null;
    const [value, setValue] = useState<EquipmentData | null>(
        initial_value,
    );

    const { label, placeholder, options } = prepareAdornment(
        props.weapons,
        props.armors,
    );

    const handleChange = (
        e: React.SyntheticEvent,
        v: string,
        r: string,
    ) => {
        const match_found = findMatching(v, options);
        setValue(match_found);
        props.onChange(value);
    };

    return (
        <Autocomplete
            fullWidth
            filterSelectedOptions
            value={value}
            options={options}
            groupBy={(option) => option.group}
            getOptionLabel={(option) => option.name}
            onInputChange={handleChange}
            renderOption={(props: any, option: EquipmentData) => {
                const { name, effs } = option;
                return (
                    <StyledAutocompleteOption
                        s_props={props}
                        name={name}
                        effs={effs}
                        condition=""
                        key={name}
                    />
                );
            }}
            renderInput={(params: any) => {
                return (
                    <TextField
                        {...params}
                        inputProps={{
                            ...params.inputProps,
                            style: {
                                textTransform: "capitalize",
                            },
                        }}
                        variant="filled"
                        // helperText="some result may be hidden."
                        label={label}
                        placeholder={placeholder}
                    />
                );
            }}
        />
    );
};
export default EquipmentPicker;
