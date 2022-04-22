import React from "react";

import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import useTheme from "@mui/material/styles/useTheme";

interface PickerOptionProps {
    header: string;
    capitalizeHeader?: boolean;
    subheaders: string[];
}
const PickerOption = (props: PickerOptionProps) => {
    const theme = useTheme();

    const subheaders_to_display = props.subheaders.map(
        (text, index) => (
            <Typography
                key={`${index}${index}`}
                paddingLeft={2}
                fontSize={theme.typography.body2.fontSize}
                textTransform="capitalize"
            >
                {text}
            </Typography>
        ),
    );

    let transform_header: "none" | "capitalize" = "none";
    if (props.capitalizeHeader) {
        transform_header = "capitalize";
    }

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
                {subheaders_to_display}
            </Stack>
        </React.Fragment>
    );
};

export default PickerOption;
