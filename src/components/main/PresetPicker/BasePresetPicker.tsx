import Autocomplete, {
    AutocompleteRenderOptionState,
} from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { FilterOptionsState } from "@mui/material";

// ---------------------------------------------
// Base picker which will become `AugmentPresetPicker` and `LoadoutPresetPicker`.
interface PresetPickerProps<Preset extends { name: string }> {
    disabled?: boolean;
    value: Preset | null;
    presets: Preset[];
    onChange: (value: Preset | null) => void;
    // This should be different for `AugmentPreset` and `LoadoutPreset`
    label: string;
    renderOption: (
        props: React.HTMLAttributes<HTMLLIElement>,
        option: Preset,
        state: AutocompleteRenderOptionState,
    ) => React.ReactNode;
    filterOptions: (
        options: Preset[],
        state: FilterOptionsState<Preset>,
    ) => Preset[];
}
const BasePresetPicker = <Preset extends { name: string }>(
    props: PresetPickerProps<Preset>,
) => {
    const handleChange = (
        e: React.SyntheticEvent,
        v: string,
        r: string,
    ) => {
        let match: Preset | null = null;
        const value = v.normalize();
        for (const preset of props.presets) {
            if (preset.name.normalize() === value) {
                match = preset;
                break;
            }
        }
        props.onChange(match);
    };
    return (
        <Autocomplete
            // dynamic
            disabled={props.disabled}
            value={props.value}
            options={props.presets}
            // static
            fullWidth
            filterSelectedOptions
            onInputChange={handleChange}
            getOptionLabel={(option) => option.name}
            renderOption={props.renderOption}
            filterOptions={props.filterOptions}
            renderInput={(params: any) => {
                return (
                    <TextField
                        {...params}
                        variant="filled"
                        label={props.label}
                    />
                );
            }}
        />
    );
};
export default BasePresetPicker;
