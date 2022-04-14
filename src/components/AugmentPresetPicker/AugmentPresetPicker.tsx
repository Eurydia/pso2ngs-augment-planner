import React from "react";

import Autocomplete from "@mui/material/Autocomplete";

import {
    matchPreset,
    renderInput,
    renderOption,
    filterOptions,
} from "./helper";
import { AugmentPreset } from "../../types";

interface AugmentPresetPickerProps {
    value: AugmentPreset | null;
    presets: AugmentPreset[];
    disabled: boolean;
    onChange: (value: AugmentPreset | null) => void;
}

const AugmentPresetPicker = (props: AugmentPresetPickerProps) => {
    const { presets, value, disabled } = props;

    const handleChange = (
        e: React.SyntheticEvent,
        v: string,
        r: string,
    ) => {
        const match_found = matchPreset(v, props.presets);
        props.onChange(match_found);
    };
    return (
        <Autocomplete
            fullWidth
            filterSelectedOptions
            disabled={disabled}
            value={value}
            options={presets}
            onInputChange={handleChange}
            renderOption={renderOption}
            filterOptions={filterOptions}
            renderInput={renderInput}
            getOptionLabel={(option) => option.name}
        />
    );
};

export default AugmentPresetPicker;
