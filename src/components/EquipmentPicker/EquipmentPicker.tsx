import { memo } from "react";

import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

import { prepareAdornment, matchEquipment } from "./helper";
import { filterOptions, renderOption } from "./styles";

import { EquipmentData } from "../../types";

export type EquipmentPickerMode = "both" | "weapons" | "armors";

interface EquipmentPickerProps {
    variant: EquipmentPickerMode;
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
        const match = matchEquipment(v, options);
        props.onChange(match);
    };

    return (
        <Autocomplete
            fullWidth
            value={value}
            options={options}
            onInputChange={handleChange}
            renderOption={renderOption}
            filterOptions={filterOptions}
            getOptionLabel={(option) => option.name}
            groupBy={(option) => option.group}
            renderInput={(params: any) => {
                return (
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
                );
            }}
        />
    );
};

const shouldEquipmentPickerNOTRerender = (
    prev: EquipmentPickerProps,
    next: EquipmentPickerProps,
) => {
    const p = prev.value;
    const n = next.value;

    return p?.name === n?.name;
};

export default memo(
    EquipmentPicker,
    shouldEquipmentPickerNOTRerender,
);
