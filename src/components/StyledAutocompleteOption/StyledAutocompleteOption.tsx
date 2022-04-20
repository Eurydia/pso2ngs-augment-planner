import React from "react";

import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import useTheme from "@mui/material/styles/useTheme";

interface StyledAutocompleteOptionProps {
    capitalizeHeader?: boolean;
    header: string;
    subheaders: string[];
}

const StyledAutocompleteOption = (
    props: StyledAutocompleteOptionProps,
) => {
    const theme = useTheme();
    const typo_subheaders = props.subheaders.map((text, index) => (
        <Typography
            key={`${text}-${index}`}
            paddingLeft={2}
            fontSize={theme.typography.body2.fontSize}
            textTransform="capitalize"
        >
            {text}
        </Typography>
    ));
    const transform_header = props.capitalizeHeader
        ? "capitalize"
        : "none";

    return (
        <React.Fragment>
            <Stack spacing={1}>
                <Typography
                    fontWeight={theme.typography.fontWeightMedium}
                    fontSize={theme.typography.body1.fontSize}
                    textTransform={transform_header}
                >
                    {props.header}
                </Typography>
                {typo_subheaders}
            </Stack>
        </React.Fragment>
    );
};

export default StyledAutocompleteOption;
