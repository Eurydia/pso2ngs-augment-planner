import { memo } from "react";

import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

import * as augment from "./augment_helper";
import { AugmentPreset, LoadoutPreset } from "../../types";
import { propsIsEqual } from "../../util";

// ---------------------------------------------
// For matching name with augment preset
const matchPreset = <T extends { name: string }>(
    value: string,
    presets: T[],
) => {
    const v = value.normalize();
    for (const preset of presets) {
        if (preset.name.normalize() === v) {
            return preset;
        }
    }
    return null;
};
// ---------------------------------------------

interface PresetPickerProps<T> {
    disabled?: boolean;
    value: T | null;
    presets: T[];
    onChange: (value: T | null) => void;
}

export const AugmentPresetPicker = memo(
    (props: PresetPickerProps<AugmentPreset>) => {
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
                disabled={props.disabled}
                value={props.value}
                options={props.presets}
                renderOption={augment.renderOption}
                filterOptions={augment.filterOptions}
                renderInput={(params: any) => {
                    return (
                        <TextField
                            {...params}
                            variant="filled"
                            label="Select augment preset"
                        />
                    );
                }}
                getOptionLabel={(option) => option.name}
            />
        );
    },
    propsIsEqual,
);

// export const LoadoutPresetPicker = memo(
//     (props: PresetPickerProps<LoadoutPreset>) => {
//         const handleChange = (
//             e: React.SyntheticEvent,
//             v: string,
//             r: string,
//         ) => {
//             const match_found = matchPreset(v, props.presets);
//             props.onChange(match_found);
//         };
//         return (
//             <Autocomplete
//                 fullWidth
//                 filterSelectedOptions
//                 disabled={props.disabled}
//                 value={props.value}
//                 options={props.presets}
//                 onInputChange={handleChange}
//                 renderOption={renderOption}
//                 filterOptions={filterOptions}
//                 renderInput={(params: any) => {
//                     return (
//                         <TextField
//                             {...params}
//                             variant="filled"
//                             label="Select augment preset"
//                         />
//                     );
//                 }}
//                 getOptionLabel={(option) => option.name}
//             />
//         );
//     },
// );
