import React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { isAddEffect, EFFECT_NAME_TRANSLATE } from "../util";
import { Effect, AugmentData } from "../../assets/data/augments";

// ---------------------------------------------
// called by render option
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
        <Typography key={text} fontSize="body2.fontSize">
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
                <Typography
                    fontWeight="medium"
                    fontSize="body1.fontSize"
                >
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
// called by handle change
// responsible for getting the total stats
export const getTotalStats = (values: (string | AugmentData)[]) => {
    let stats: { [key: string]: number } = {};
    for (let i = 0; i < values.length; i++) {
        const value = values[i];

        if (typeof value === "string") {
            continue;
            // skip this loop if the value turns out to be string
        }

        const { effs } = value;
        effs.forEach(({ eff, amt }) => {
            if (stats[eff] === undefined) {
                stats[eff] = amt;
            } else {
                if (isAddEffect(eff)) {
                    stats[eff] += amt;
                } else {
                    stats[eff] *= amt;
                }
            }
        });
    }
    return stats;
};
// parse stats
export const parseStats = (stats: { [key: string]: number }) => {
    let res: { [key: string]: string } = {};
    Object.keys(stats).forEach((key) => {
        const value = stats[key];

        let res_value: string;
        let sign = "+";
        if (isAddEffect(key)) {
            if (value < 0) {
                sign = "";
            }
            res_value = value.toString();
        } else {
            if (value < 1) {
                sign = "";
            }
            const _value = (value - 1) * 100;
            res_value = `${_value.toPrecision(3)}%`;
        }
        res[key] = `${sign}${res_value}`;
    });
    return res;
};
// ---------------------------------------------

// ---------------------------------------------
// called by handle change
// deals with augment selection logic
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

// ---------------------------------------------

const convertToRoman = (num: number) => {
    if (num === 0) {
        return "";
    }

    const roman_keys: { [key: string]: number } = {
        M: 1000,
        CM: 900,
        D: 500,
        CD: 400,
        C: 100,
        XC: 90,
        L: 50,
        XL: 40,
        X: 10,
        IX: 9,
        V: 5,
        IV: 4,
        I: 1,
    };
    let _num = num;
    let roman = "";

    for (const key of Object.keys(roman_keys)) {
        const q = Math.floor(_num / roman_keys[key]);
        _num -= q * roman_keys[key];
        roman += key.repeat(q);
    }
    return roman;
};

export const getOptionLabel = (option: AugmentData) => {
    return `${option.name} ${convertToRoman(option.level)}`;
};
