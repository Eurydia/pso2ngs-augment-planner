import React from "react";

import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import useTheme from "@mui/material/styles/useTheme";

import { validateAugments } from "./helper";
import {
    getOptionLabel,
    renderOption,
    filterOptions,
} from "./styles";

import { AugmentData } from "../../../types";
import { DATA } from "../../../assets/data/augments";

interface AugmentPickerProps {
    values: AugmentData[];
    disabled?: boolean;
    onChange: (values: AugmentData[]) => void;
}
const AugmentPicker = (props: AugmentPickerProps) => {
    const theme = useTheme();
    return (
        <Autocomplete
            // dynamic props
            disabled={props.disabled}
            value={props.values}
            //static prop
            fullWidth
            multiple
            filterSelectedOptions
            options={DATA}
            getOptionLabel={getOptionLabel}
            renderOption={renderOption}
            filterOptions={filterOptions}
            // these are kind of annoying to deal with,
            // straightforward but take up so space.
            groupBy={(option) => option.group}
            sx={{ textTransform: "capitalize" }}
            ChipProps={{
                sx: {
                    fontWeight: theme.typography.fontWeightBold,
                    // chips should have 100% width
                    // or else they will be impossible to read.
                    width: 1,
                },
            }}
            onChange={(e, v, r) => {
                const validated = validateAugments(v);
                props.onChange(validated);
            }}
            renderInput={(params: any) => {
                return (
                    <TextField
                        {...params}
                        variant="filled"
                        label="Augment"
                        placeholder='try "pp + rng + 3"'
                    />
                );
            }}
        />
    );
};
/**
 * Compare every augments.
 * Rerender if one of them is different. b
 * @param prev
 * @param next
 * @returns
 */
const shouldNOTRerender = (
    prev: AugmentPickerProps,
    next: AugmentPickerProps,
) => {
    const p = prev.values;
    const n = next.values;
    // lengths are different, rerender
    if (p.length !== n.length) {
        return false;
    }
    for (let i = 0; i < p.length; i++) {
        const p_aug = p[i];
        const n_aug = n[i];
        // one of the augments is different,
        // rerender
        if (
            p_aug.name !== n_aug.name ||
            p_aug.level !== n_aug.level
        ) {
            return false;
        }
    }
    // relevant props are the same,
    // don't rerender
    return true;
};
export default React.memo(AugmentPicker, shouldNOTRerender);
