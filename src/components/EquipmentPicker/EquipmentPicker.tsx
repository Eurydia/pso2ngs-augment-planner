import React from "react";

import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

import {
    prepareAdornment,
    findMatching,
    renderOption,
    getOptionLabel,
    filterOptions,
} from "./helper";
import { EquipmentData } from "../../types";

export type EquipmentPickerVariant = "both" | "weapons" | "armors";

interface EquipmentPickerProps {
    variant: EquipmentPickerVariant;
    value: EquipmentData | null;
    onChange: (value: EquipmentData | null) => void;
}

const EquipmentPicker = (props: EquipmentPickerProps) => {
    const { variant, value } = props;
    const { label, placeholder, options } = prepareAdornment(variant);

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
            filterOptions={filterOptions}
            groupBy={(option) => option.group}
            renderInput={(params: any) => {
                return (
                    <TextField
                        {...params}
                        variant="filled"
                        label={label}
                        placeholder={placeholder}
                    />
                );
            }}
            sx={{
                textTransform: "capitalize",
            }}
        />
    );
};
export default EquipmentPicker;
