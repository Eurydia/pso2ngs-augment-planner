import { memo } from "react";

import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

import { prepareAdornment, matchEquipment } from "./helper";
import { renderOption, filterOptions } from "./styles";
import { EquipmentData } from "../../../types";

export type EquipmentPickerMode = "both" | "weapons" | "armors";

interface EquipmentPickerProps {
    variant: EquipmentPickerMode;
    value: EquipmentData | null;
    onChange: (value: EquipmentData | null) => void;
}

const EquipmentPicker = (props: EquipmentPickerProps) => {
    // -----------------------------------------
    // prepare the adornments on the input field
    const { label, placeholder, options } = prepareAdornment(
        props.variant,
    );
    // -----------------------------------------
    return (
        <Autocomplete
            // dynamic
            value={props.value}
            options={options}
            // static props
            fullWidth
            renderOption={renderOption}
            filterOptions={filterOptions}
            getOptionLabel={(option) => option.name}
            groupBy={(option) => option.group}
            onInputChange={(e, v, r) => {
                const match = matchEquipment(v, options);
                props.onChange(match);
            }}
            renderInput={(params: any) => (
                <TextField
                    {...params}
                    inputProps={{
                        ...params.inputProps,
                        sx: {
                            textTransform: "capitalize",
                        },
                    }}
                    variant="filled"
                    label={label}
                    placeholder={placeholder}
                />
            )}
        />
    );
};
const shouldNOTRerender = (
    prev: EquipmentPickerProps,
    next: EquipmentPickerProps,
) => {
    const p = prev.value;
    const n = next.value;
    // The signature of an equipment is its name
    // if the name is the same, then the equipment
    // has not been changed.
    return p?.name === n?.name;
};
export default memo(EquipmentPicker, shouldNOTRerender);
