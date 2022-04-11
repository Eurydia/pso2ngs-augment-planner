import React from "react";

import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import useTheme from "@mui/material/styles/useTheme";

import { parseEffect } from "./helper";

import { Effect } from "../util";

interface StyledAutocompleteOptionProps {
    s_props: any;
    name: string;
    effs: Effect[];
    condition: string;
}

const StyledAutocompleteOption = (
    props: StyledAutocompleteOptionProps,
) => {
    const theme = useTheme();
    const { s_props, name, effs, condition } = props;

    const subheaders = effs.map((eff, index) => (
        <Typography
            key={`${name}-${index}`}
            paddingLeft={2}
            fontSize={theme.typography.body2.fontSize}
        >
            {parseEffect(eff)}
        </Typography>
    ));

    return (
        <Box {...s_props} textTransform="capitalize">
            <Stack>
                <Typography
                    fontWeight={theme.typography.fontWeightMedium}
                    fontSize={theme.typography.body1.fontSize}
                >
                    {name}
                </Typography>
                {subheaders}
                <Typography
                    paddingLeft={2}
                    fontSize={theme.typography.body1.fontSize}
                >
                    {condition}
                </Typography>
            </Stack>
        </Box>
    );
};

export default StyledAutocompleteOption;
