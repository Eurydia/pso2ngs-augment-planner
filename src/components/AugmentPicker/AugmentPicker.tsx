import React from "react";

import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import useTheme from "@mui/material/styles/useTheme";
import { Theme } from "@mui/material/styles";

import {
    getOptionLabel,
    validateAugments,
    renderOption,
    filterOptions,
} from "./helper";
import { AugmentData } from "../../types";
import DATA from "../../assets/data/augments";

interface AugmentPickerProps {
    values: AugmentData[];
    disabled?: boolean;
    onChange: (values: AugmentData[]) => void;
}

const styled = {
    textTransform: "capitalize",
};

const chip_props = (theme: Theme) => {
    return {
        sx: {
            width: 1,
            fontWeight: theme.typography.fontWeightBold,
        },
    };
};
const AugmentPicker = (props: AugmentPickerProps) => {
    const theme = useTheme();
    return (
        <Autocomplete
            fullWidth
            multiple
            filterSelectedOptions
            options={DATA}
            disabled={props.disabled}
            value={props.values}
<<<<<<< Updated upstream
            sx={styled}
            ChipProps={chip_props(theme)}
            groupBy={(option) => option.group}
=======
>>>>>>> Stashed changes
            getOptionLabel={getOptionLabel}
            renderOption={renderOption}
            filterOptions={filterOptions}
<<<<<<< Updated upstream
=======
            groupBy={(option) => option.group}
            sx={{ textTransform: "capitalize" }}
            ChipProps={{
                sx: {
                    width: 1,
                    fontWeight: theme.typography.fontWeightBold,
                },
            }}
            onChange={(e, v, r) => {
                const validated = validateAugments(v);
                props.onChange(validated);
            }}
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
const propsAreEqual = (
=======

/**
 * Compare every augments.
 * Rerender if one of them is different. b
 * @param prev
 * @param next
 * @returns
 */
const shouldNOTRerender = (
>>>>>>> Stashed changes
    prev: AugmentPickerProps,
    next: AugmentPickerProps,
) => {
    const p = prev.values;
    const n = next.values;
<<<<<<< Updated upstream

=======
    // lengths are different, rerender
>>>>>>> Stashed changes
    if (p.length !== n.length) {
        return false;
    }

    for (let i = 0; i < p.length; i++) {
<<<<<<< Updated upstream
        const p_a = p[i];
        const n_a = n[i];
        if (p_a.name !== n_a.name || p_a.level !== n_a.level) {
=======
        const p_aug = p[i];
        const n_aug = n[i];
        // one of the augments is different,
        // rerender
        if (
            p_aug.name !== n_aug.name ||
            p_aug.level !== n_aug.level
        ) {
>>>>>>> Stashed changes
            return false;
        }
    }
    // relevant props are the same,
    // don't rerender
    return true;
};
<<<<<<< Updated upstream
export default React.memo(AugmentPicker, propsAreEqual);
=======
export default React.memo(AugmentPicker, shouldNOTRerender);
>>>>>>> Stashed changes
