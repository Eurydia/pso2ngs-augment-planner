import { memo } from "react";

import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

import Save from "@mui/icons-material/Save";
import Clear from "@mui/icons-material/Clear";

// ----------------------------------------------
interface ButtonProps {
    disabled?: boolean;
    onClick: () => void;
}
const SaveButton = memo(
    (props: ButtonProps) => {
        return (
            <Button
                sx={{ width: 0.62 }}
                startIcon={<Save />}
                variant="contained"
                disabled={props.disabled}
                onClick={props.onClick}
            >
                save
            </Button>
        );
    },
    (prev, next) => {
        return prev.disabled === next.disabled;
    },
);
const ClearButton = memo(
    (props: ButtonProps) => {
        return (
            <Button
                sx={{ width: 0.38 }}
                startIcon={<Clear />}
                variant="outlined"
                onClick={props.onClick}
            >
                clear
            </Button>
        );
    },
    () => true,
);
// ----------------------------------------------

// ----------------------------------------------
interface SaveClearButtonsComboProps {
    disableSaveButton?: boolean;
    onSaveClick: () => void;
    onClearClick: () => void;
}
export const SaveClearButtonsCombo = (
    props: SaveClearButtonsComboProps,
) => {
    return (
        <Stack direction="row" spacing={1}>
            <SaveButton
                disabled={props.disableSaveButton}
                onClick={props.onSaveClick}
            />
            <ClearButton onClick={props.onClearClick} />
        </Stack>
    );
};
// ----------------------------------------------
