import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import useTheme from "@mui/material/styles/useTheme";

import { OptionEffect } from "./helper";

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
    const { s_props, name, effs, condition } = props;
    const theme = useTheme();

    const subheaders = effs.map((val) => (
        <OptionEffect effect={val}></OptionEffect>
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
                <Stack paddingLeft={2}>
                    {subheaders}
                    <Typography
                        fontSize={theme.typography.body1.fontSize}
                        textTransform="lowercase"
                    >
                        {condition}
                    </Typography>
                </Stack>
            </Stack>
        </Box>
    );
};

export default StyledAutocompleteOption;
