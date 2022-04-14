import React from "react";

import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import useTheme from "@mui/material/styles/useTheme";

interface StyledAutocompleteOptionProps {
    s_props: any;
    header: string;
    capitalizeHeader: boolean;
    subheaders: string[];
}

const StyledAutocompleteOption = (
    props: StyledAutocompleteOptionProps,
) => {
    const theme = useTheme();
    const { s_props, header, subheaders } = props;

    const typo_subheaders = subheaders.map((text, index) => (
        <Typography
            key={`${text}-${index}`}
            paddingLeft={2}
            fontSize={theme.typography.body2.fontSize}
            textTransform="capitalize"
        >
            {text}
        </Typography>
    ));
    const text_transform_header = props.capitalizeHeader
        ? "capitalize"
        : "none";

    return (
        <Box {...s_props}>
            <Stack spacing={1}>
                <Typography
                    fontWeight={theme.typography.fontWeightMedium}
                    fontSize={theme.typography.body1.fontSize}
                    textTransform={text_transform_header}
                >
                    {header}
                </Typography>
                {typo_subheaders}
                {/* <Typography
                    paddingLeft={2}
                    fontSize={theme.typography.body1.fontSize}
                >
                    {condition || ""}
                </Typography> */}
            </Stack>
        </Box>
    );
};

export default StyledAutocompleteOption;
