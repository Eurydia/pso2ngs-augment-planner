import React from "react";

import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import useTheme from "@mui/material/styles/useTheme";

// ---------------------------------
interface PaperBackgroundProps {
    title?: string;
    titleIcon?: React.ReactElement;
    children: React.ReactNode[] | React.ReactNode;
}
/**
 * resuable paper for background
 * @param props
 * @returns
 */
const PaperBackground = (props: PaperBackgroundProps) => {
    const theme = useTheme();
    return (
        <Paper elevation={8}>
            <Box
                sx={{
                    paddingX: 2,
                    paddingY: 1,
                    boxShadow: theme.shadows[4],
                    backgroundColor: theme.palette.background.default,
                }}
            >
                <Typography
                    component="h2"
                    sx={{
                        textTransform: "capitalize",
                        color: theme.palette.primary.dark,
                        fontSize: theme.typography.h4.fontSize,
                        fontWeight: theme.typography.fontWeightBold,
                    }}
                >
                    <Stack direction="row" alignItems="center">
                        {props.titleIcon}
                        {props.title}
                    </Stack>
                </Typography>
            </Box>
            <Box
                sx={{
                    paddingX: 4,
                    paddingY: 2,
                }}
            >
                {props.children}
            </Box>
        </Paper>
    );
};
export default PaperBackground;
// ---------------------------------
