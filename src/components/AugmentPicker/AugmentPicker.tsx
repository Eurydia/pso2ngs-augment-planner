import React from "react";

import Autocomplete from "@mui/material/Autocomplete";

import {
    renderInput,
    getOptionLabel,
    validateAugments,
    renderOption,
    filterOptions,
} from "./helper";
import { AugmentData } from "../../types";
import DATA from "../../assets/data/augments";
import { propsIsEqual } from "../../util";

interface AugmentPickerProps {
    values: AugmentData[];
    disabled?: boolean;
    onChange: (values: AugmentData[]) => void;
}

const styled = {
    textTransform: "capitalize",
};

const AugmentPicker = (props: AugmentPickerProps) => {
    const handleChange = (
        event: React.SyntheticEvent,
        values: (string | AugmentData)[],
        reason: string,
    ) => {
        const validated = validateAugments(values);
        props.onChange(validated);
    };

    return (
        <Autocomplete
            fullWidth
            multiple
            filterSelectedOptions
            options={DATA}
            disabled={props.disabled}
            value={props.values}
            sx={styled}
            getOptionLabel={getOptionLabel}
            onChange={handleChange}
            renderOption={renderOption}
            filterOptions={filterOptions}
            renderInput={renderInput}
            groupBy={(option) => option.group}
        />
    );
};
export default React.memo(AugmentPicker, propsIsEqual);
