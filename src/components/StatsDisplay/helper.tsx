import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import useTheme from "@mui/material/styles/useTheme";
import React from "react";

export interface StatItemValue {
    value: string;
    diff?: string;
    negative?: boolean;
}

interface StatItemProps {
    head: { emoji: string; name: string };
    value?: StatItemValue;
    isAdd?: boolean;
    column?: number;
}

export const StatItem = (props: StatItemProps) => {
    const theme = useTheme();
    let _value: string;
    if (props.value === undefined) {
        if (props.isAdd) {
            _value = "+0";
        } else {
            _value = "+0.0%";
        }
    } else {
        _value = props.value.value;
    }

    let diff_typo = <React.Fragment></React.Fragment>;
    let diff_color = theme.palette.primary.main;
    if (props.value?.diff) {
        if (props.value?.negative) {
            diff_color = theme.palette.secondary.main;
        }
        diff_typo = (
            <Typography
                component="span"
                sx={{
                    paddingLeft: 1,
                    color: diff_color,
                    fontWeight: theme.typography.fontWeightMedium,
                }}
            >
                {`(${props.value.diff})`}
            </Typography>
        );
    }

    return (
        <Grid item xs={props.column || 1}>
            <Typography variant="body1" sx={{ padding: 1 }}>
                {`${props.head.emoji} ${props.head.name}: ${_value}`}
                {diff_typo}
            </Typography>
        </Grid>
    );
};

export const StatsGroup = (props: { children: React.ReactNode }) => {
    return (
        <Grid container columns={2}>
            {props.children}
        </Grid>
    );
};
