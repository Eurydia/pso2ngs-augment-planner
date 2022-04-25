import React from "react";

import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import useTheme from "@mui/material/styles/useTheme";

// ----------------------------------------------
/**
 * Describes how each stats item value should look like.
 */
export interface StatItemValue {
    value: string;
    diff?: string;
    negative?: boolean;
}
// ----------------------------------------------

// ----------------------------------------------
/**
 * Props for the grid item
 */
interface StatItemProps {
    head: { emoji: string; name: string };
    value?: StatItemValue;
    isAdd?: boolean;
    column?: number;
}
/**
 * Macro for grid item
 */
export const StatItem = React.memo(
    (props: StatItemProps) => {
        const theme = useTheme();

        let column = 1;
        if (props.column) {
            column = props.column;
        }

        // default valut if the stats is undefined
        let _value: string = props.isAdd ? "+0" : "+0%";
        if (props.value?.value) {
            _value = props.value.value;
        }

        let diff_value = "";
        if (props.value?.diff) {
            diff_value = `(${props.value.diff})`;
        }

        let diff_color = theme.palette.primary.main;
        if (props.value?.negative) {
            diff_color = theme.palette.secondary.main;
        }
        return (
            <Grid item xs={column}>
                <Stack
                    direction={{ xs: "column", sm: "row" }}
                    spacing={2}
                >
                    <Typography
                        component="span"
                        sx={{
                            padding: 1,
                            fontWeight:
                                theme.typography.fontWeightMedium,
                            fontSize: theme.typography.body1.fontSize,
                        }}
                    >
                        {`${props.head.emoji} ${props.head.name}: ${_value}`}
                        <Typography
                            sx={{
                                display: "inline",
                                fontSize: "inherit",
                                color: diff_color,
                                paddingLeft: 1,
                                fontWeight:
                                    theme.typography.fontWeightBold,
                            }}
                        >
                            {diff_value}
                        </Typography>
                    </Typography>
                </Stack>
            </Grid>
        );
    },
    (prev, next) => {
        const p = prev.value;
        const n = next.value;
        return (
            p?.value === n?.value &&
            p?.diff === n?.diff &&
            p?.negative === n?.negative
        );
    },
);
// ----------------------------------------------

// ----------------------------------------------
/**
 * Grid container for stats item
 */
export const StatContainer = (props: {
    children: React.ReactNode;
}) => {
    return (
        <Grid container columns={2}>
            {props.children}
        </Grid>
    );
};
// ----------------------------------------------
