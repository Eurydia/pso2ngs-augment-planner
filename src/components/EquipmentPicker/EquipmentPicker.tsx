import React from "react";

import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

import {
    prepareAdornment,
    findMatching,
    renderOption,
    getOptionLabel,
} from "./helper";
import { EquipmentData } from "../util";

interface EquipmentPickerProps {
    weapons: boolean;
    armors: boolean;
    value: EquipmentData | null;
    onChange: (value: EquipmentData | null) => void;
}

const EquipmentPicker = (props: EquipmentPickerProps) => {
    const { weapons, armors, value } = props;
    const { label, placeholder, options } = prepareAdornment(
        weapons,
        armors,
    );

    const handleChange = (
        e: React.SyntheticEvent,
        v: string,
        r: string,
    ) => {
        const match_found = findMatching(v, options);
        props.onChange(match_found);
    };

    return (
        <Autocomplete
            fullWidth
            filterSelectedOptions
            value={value}
            options={options}
            onInputChange={handleChange}
            renderOption={renderOption}
            getOptionLabel={getOptionLabel}
            groupBy={(option) => option.group}
            renderInput={(params: any) => {
                return (
                    <TextField
                        {...params}
                        // make the input field into a titlecase
                        inputProps={{
                            ...params.inputProps,
                            style: {
                                textTransform: "capitalize",
                            },
                        }}
                        variant="filled"
                        label={label}
                        placeholder={placeholder}
                    />
                );
            }}
        />
    );
};
export default EquipmentPicker;
