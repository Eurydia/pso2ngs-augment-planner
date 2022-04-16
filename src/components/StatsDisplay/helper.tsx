import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import useTheme from "@mui/material/styles/useTheme";
import React from "react";

// ----------------------------------------------
// stats item
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

    let diff_color = theme.palette.primary.main;
    if (props.value?.negative) {
        diff_color = theme.palette.secondary.main;
    }

    return (
        <Grid item xs={props.column || 1}>
            <Typography
                component="p"
                sx={{
                    padding: 1,
                    fontWeight: theme.typography.fontWeightMedium,
                    fontSize: theme.typography.body1.fontSize,
                }}
            >
                {`${props.head.emoji} ${props.head.name}: ${_value}`}
                <Typography
                    component="span"
                    sx={{
                        color: diff_color,
                        paddingLeft: 1,
                        fontSize: "inherit",
                        fontWeight: theme.typography.fontWeightBold,
                    }}
                >
                    {props.value?.diff ? `(${props.value.diff})` : ""}
                </Typography>
            </Typography>
        </Grid>
    );
};
// ----------------------------------------------

// ----------------------------------------------
// group the stats
export const StatsGroup = (props: { children: React.ReactNode }) => {
    return (
        <Grid container columns={2}>
            {props.children}
        </Grid>
    );
};
// ----------------------------------------------