import React from "react";

import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

import { AugmentData, convertToRoman } from "../util";

export interface AugmentPreset {
    name: string;
    description: string;
    augments: AugmentData[];
}

interface AugmentPresetPickerProps {
    disabled: boolean;
    value: AugmentPreset | null;
    presets: AugmentPreset[];
    onChange: (value: AugmentPreset | null) => void;
}

const renderOption = (props: any, option: AugmentPreset) => {
    return (
        <Box {...props}>
            <Stack>
                <Typography>{option.name}</Typography>
                {option.augments.map((value) => (
                    <Typography key={`${value.name}-${value.level}`}>
                        {`${value.name} ${convertToRoman(value.level)}`}
                    </Typography>
                ))}
            </Stack>
        </Box>
    );
};

const AugmentPresetPicker = (props: AugmentPresetPickerProps) => {
    const { presets, value, disabled } = props;

    const handleChange = (
        e: React.SyntheticEvent,
        v: string,
        r: string,
    ) => {
        let match_found: AugmentPreset | null = null;
        for (let i = 0; i < presets.length; i++) {
            const preset = presets[i];
            if (v.toLocaleLowerCase() === preset.name) {
                match_found = preset;
                break;
            }
        }
        props.onChange(match_found);
    };

    return (
        <Autocomplete
            disabled={disabled}
            fullWidth
            filterSelectedOptions
            value={value}
            options={presets}
            onInputChange={handleChange}
            renderOption={renderOption}
            getOptionLabel={(option) => option.name}
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
                        label="Select augment preset"
                    />
                );
            }}
        />
    );
};
export default AugmentPresetPicker;
