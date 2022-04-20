import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

import * as augment from "./augment";
import * as loadout from "./loadout";
import { matchPreset } from "./helper";

import { AugmentPreset, LoadoutPreset } from "../../types";

// const shouldPresetPickerNOTRerender = <T extends { name: string }>(
//     prev: PresetPickerProps<T>,
//     next: PresetPickerProps<T>,
// ) => {
//     return (
//         prev.disabled === next.disabled &&
//         prev.value?.name === next.value?.name
//     );
// };

interface PresetPickerProps<T extends { name: string }> {
    value: T | null;
    presets: T[];
    onChange: (value: T | null) => void;
}

export const AugmentPresetPicker = (
    props: PresetPickerProps<AugmentPreset>,
) => {
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
            onInputChange={handleChange}
            value={props.value}
            options={props.presets}
            renderOption={augment.renderOption}
            filterOptions={augment.filterOptions}
            getOptionLabel={(option) => option.name}
            renderInput={(params: any) => {
                return (
                    <TextField
                        {...params}
                        variant="filled"
                        label="Select augment preset"
                    />
                );
            }}
        />
    );
};

export const LoadoutPresetPicker = (
    props: PresetPickerProps<LoadoutPreset>,
) => {
    const handleChange = (
        e: React.SyntheticEvent,
        v: string,
        r: string,
    ) => {
        const match = matchPreset(v, props.presets);
        props.onChange(match);
    };
    return (
        <Autocomplete
            fullWidth
            filterSelectedOptions
            value={props.value}
            options={props.presets}
            onInputChange={handleChange}
            renderOption={loadout.renderOption}
            filterOptions={loadout.filterOptions}
            getOptionLabel={(option) => option.name}
            renderInput={(params: any) => {
                return (
                    <TextField
                        {...params}
                        variant="filled"
                        label="Select loadout preset"
                    />
                );
            }}
        />
    );
};
