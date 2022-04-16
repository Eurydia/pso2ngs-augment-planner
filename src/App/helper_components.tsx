import React from "react";

import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import useTheme from "@mui/material/styles/useTheme";

import Edit from "@mui/icons-material/Edit";
import Upload from "@mui/icons-material/Upload";
import Download from "@mui/icons-material/Download";

// ---------------------------------
// resuable paper for background
interface PaperBackgroundProps {
    title: string;
    titleIcon: React.ReactElement;
    headerOther?: React.ReactElement;
    children: React.ReactElement;
}
export const PaperBackground = (props: PaperBackgroundProps) => {
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
                <Stack
                    direction={{ xs: "column", md: "row" }}
                    justifyContent="space-between"
                >
                    <Typography
                        component="h2"
                        sx={{
                            textTransform: "capitalize",
                            color: theme.palette.primary.main,
                            fontSize: theme.typography.h4.fontSize,
                            fontWeight:
                                theme.typography.fontWeightBold,
                        }}
                    >
                        <Stack direction="row" alignItems="center">
                            {props.titleIcon}
                            {props.title}
                        </Stack>
                    </Typography>
                    {props.headerOther}
                </Stack>
            </Box>
            <Box
                sx={{
                    paddingX: 4,
                    paddingY: 1,
                }}
            >
                {props.children}
            </Box>
        </Paper>
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
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const fileReader = new FileReader();
            fileReader.readAsText(e.target.files[0], "UTF-8");
            fileReader.onload = (e) =>
                props.importAction(e.target?.result as string);
        }
    };
    return (
        <React.Fragment>
            <Stack direction="row" spacing={2} paddingY={1}>
                <Button
                    variant="contained"
                    component="label"
                    endIcon={<Upload />}
                >
                    <input
                        hidden
                        type="file"
                        accept=".json"
                        onChange={handleChange}
                    />
                    Import preset(s)
                </Button>
                <Button
                    onClick={props.exportAction}
                    variant="outlined"
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
// modal to bring up when editing presets
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
                    titleIcon={<Edit />}
                    title="Edit Preset"
                >
                    {props.editor}
                </PaperBackground>
            </Box>
        </Modal>
    );
};
// ---------------------------------
