import React from "react";

import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import useTheme from "@mui/material/styles/useTheme";

import Upload from "@mui/icons-material/Upload";
import Download from "@mui/icons-material/Download";

// ---------------------------------
// resuable paper for background
interface PaperBackgroundProps {
    header: string;
    feature: React.ReactElement;
    icon?: React.ReactElement;
}
export const PaperBackground = (props: PaperBackgroundProps) => {
    const theme = useTheme();

    return (
        <Paper
            elevation={8}
            sx={{
                paddingX: 4,
                paddingY: 2,
                backgroundColor: theme.palette.background.default,
            }}
        >
            <Typography
                sx={{
                    color: theme.palette.primary.main,
                    fontSize: theme.typography.h4.fontSize,
                    fontWeight: theme.typography.fontWeightBold,
                }}
            >
                {props.icon}
                {props.header}
            </Typography>
            {props.feature}
        </Paper>
    );
};
// ---------------------------------

// ---------------------------------
// Parsing and  reading the uploaded json
interface ImportPresetButtonProps {
    action: (value: string) => void;
}
const ImportPresetButton = (props: ImportPresetButtonProps) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const fileReader = new FileReader();
            fileReader.readAsText(e.target.files[0], "UTF-8");
            fileReader.onload = (e) =>
                props.action(e.target?.result as string);
        }
    };
    return (
        <input
            hidden
            type="file"
            accept=".json"
            onChange={handleChange}
        />
    );
};
// ---------------------------------

// ---------------------------------
// Import export button combo
interface ImportExportButtonsProps {
    importAction: (text: string) => void;
    exportAction: () => void;
}
export const ImportExportButtons = (
    props: ImportExportButtonsProps,
) => {
    return (
        <React.Fragment>
            <Stack direction="row" spacing={2} paddingY={1}>
                <Button
                    variant="contained"
                    component="label"
                    endIcon={<Upload />}
                >
                    <ImportPresetButton action={props.importAction} />
                    Import preset(s)
                </Button>
                <Button
                    onClick={props.exportAction}
                    variant="text"
                    endIcon={<Download />}
                >
                    export all
                </Button>
            </Stack>
        </React.Fragment>
    );
};
// ---------------------------------

// ---------------------------------
// The preset edit modal
interface EditModalProps {
    open: boolean;
    onClose: () => void;
    editor: React.ReactElement;
}
export const EditModal = (props: EditModalProps) => {
    return (
        <Modal open={props.open} onClose={props.onClose}>
            <Box
                sx={{
                    position: "absolute" as "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                }}
            >
                <PaperBackground
                    header="Editing preset"
                    feature={props.editor}
                />
            </Box>
        </Modal>
    );
};
// ---------------------------------
