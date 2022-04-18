import React from "react";

import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import useTheme from "@mui/material/styles/useTheme";

interface StyledAutocompleteOptionProps {
    header: string;
    capitalizeHeader?: boolean;
    subheaders: string[];
}

const StyledAutocompleteOption = (
    props: StyledAutocompleteOptionProps,
) => {
    const theme = useTheme();
    const { header, subheaders } = props;

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
        <React.Fragment>
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
        </React.Fragment>
    );
};

export default StyledAutocompleteOption;
