import React from "react";

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

import {
    EFFECT_NAME_TRANSLATE,
    isAddEffect,
    convertToRoman,
} from "../util";
import { AugmentData, Effect } from "../../assets/data/types";

// ---------------------------------------------
// For rendering options on dropdown menu
const getOptionEffectText = (effect: Effect) => {
    const { eff, amt } = effect;
    const name = EFFECT_NAME_TRANSLATE[eff];

    let value: string;
    let sign: string = "+";
    if (isAddEffect(eff)) {
        if (amt === 0) {
            return;
        }
        if (amt < 0) {
            sign = "";
        }
        value = amt.toString();
    } else {
        if (amt === 1) {
            return;
        }
        if (amt < 1) {
            sign = "";
        }
        const _value = (amt - 1) * 100;
        value = `${_value.toPrecision(3)}%`;
    }

    const text = `${name} ${sign}${value}`;

    return (
        <Typography key={text} sx={{ fontSize: "" }}>
            {text}
        </Typography>
    );
};

export const renderOption = (props: any, option: AugmentData) => {
    const { name, level, effs, condition } = option;

    const roman_level = convertToRoman(level);
    const header = `${name} ${roman_level}`;

    let _condition = <React.Fragment></React.Fragment>;
    if (condition !== "") {
        _condition = (
            <Typography
                fontSize="body2.fontSize"
                textTransform="lowercase"
            >
                {condition}
            </Typography>
        );
    }

    return (
        <Box {...props} textTransform="capitalize">
            <Stack>
                <Typography fontWeight="medium" fontSize="body1.fontSize">
                    {header}
                </Typography>
                <Stack paddingLeft={2}>
                    {effs.map((eff) => {
                        return getOptionEffectText(eff);
                    })}
                    {_condition}
                </Stack>
            </Stack>
        </Box>
    );
};
// ---------------------------------------------

// ---------------------------------------------
// For rendering input on input field
export const getOptionLabel = (option: AugmentData) => {
    return `${option.name} ${convertToRoman(option.level)}`;
};
// ---------------------------------------------

// ---------------------------------------------
// validate selected augments
export const validateValues = (values: (string | AugmentData)[]) => {
    let _values: AugmentData[] = [];
    for (let i = values.length - 1; i >= 0; i--) {
        const current_value = values[i];

        if (typeof current_value === "string") {
            continue;
        }

        let is_valid = true;
        for (let j = 0; j < _values.length; j++) {
            const previous_value = _values[j];
            if (
                current_value.name === previous_value.name ||
                previous_value.conflict.includes(current_value.group)
            ) {
                is_valid = false;
                break;
            }
        }
        if (is_valid && _values.length < 5) {
            _values.push(current_value);
        }
    }
    _values.reverse();
    return _values;
};
// ---------------------------------------------
