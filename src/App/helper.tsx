import Paper, { PaperProps } from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import useTheme from "@mui/material/styles/useTheme";

import { augmentToSignature } from "../util";
import { AugmentData, AugmentPreset } from "../types";

// ---------------------------------
// resuable paper for background
interface PaperBackgroundProps extends PaperProps {
    header: string;
}
export const PaperBackground = (props: PaperBackgroundProps) => {
    const theme = useTheme();
    return (
        <Paper elevation={8} sx={{ paddingX: 4, paddingY: 2 }}>
            <Typography fontSize={theme.typography.h5.fontSize}>
                {props.header}
            </Typography>
            {props.children}
        </Paper>
    );
};
// ---------------------------------

// ---------------------------------
// Checking if preset name is available
const checkNameAvailability = (name: string, used_name: string[]) => {
    let temp_name = name;
    let counter = 1;
    while (used_name.includes(temp_name)) {
        temp_name = `${name} (${counter})`;
        counter++;
    }
    return temp_name;
};

export const doAddPreset = (
    new_preset: AugmentPreset,
    used_name: string[],
) => {
    const {
        name: unparsed_name,
        description: unparsed_description,
        augments,
    } = new_preset;
    const normalized_name = unparsed_name.normalize().trim();

    // throw error if name is empty

    const name = checkNameAvailability(normalized_name, used_name);
    const description = unparsed_description.normalize().trim();
    let preset = {
        name,
        description,
        augments,
    };
    let snackbar: { text: string; option: {} };
    // throw warning if name is already in used
    if (name !== normalized_name) {
        snackbar = {
            text: `Your preset was saved as "${name}".`,
            option: {
                variant: "warning",
            },
        };
    } else {
        snackbar = {
            text: "Preset saved 👍.",
            option: {
                variant: "success",
            },
        };
    }
    return { snackbar, preset };
    // localStorage.setItem("test", JSON.stringify(augPres));
    // reset fields for augments preset
    // resetAugPresFields();
};
// ---------------------------------
