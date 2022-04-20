import React from "react";

import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import useTheme from "@mui/material/styles/useTheme";

import BorderColor from "@mui/icons-material/BorderColor";
import Upload from "@mui/icons-material/Upload";
import Download from "@mui/icons-material/Download";
import Clear from "@mui/icons-material/Clear";

import { exportAllPresets } from "./handlers";

// ---------------------------------
// resuable paper for background
interface PaperBackgroundProps {
    title?: string;
    titleIcon?: React.ReactElement;
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
                <Stack alignItems="flex-start" justifyContent="start">
                    <Typography
                        component="h2"
                        sx={{
                            textTransform: "capitalize",
                            color: theme.palette.primary.dark,
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
                    paddingY: 2,
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
    importAction: (data_string: string) => void;
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
            <Stack direction="row" spacing={1} paddingY={1}>
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
interface EditDialogProps {
    open: boolean;
    onClose: () => void;
    editor: {
        title: string;
        component: React.ReactElement;
    };
}
export const EditDialog = (props: EditDialogProps) => {
    const theme = useTheme();
    return (
        <Dialog
            open={props.open}
            onClose={props.onClose}
            maxWidth="md"
        >
            <DialogTitle
                sx={{
                    textTransform: "capitalize",
                    paddingX: 2,
                    paddingY: 1,
                    boxShadow: theme.shadows[4],
                    color: theme.palette.primary.dark,
                    backgroundColor: theme.palette.background.default,
                    fontSize: theme.typography.h4.fontSize,
                    fontWeight: theme.typography.fontWeightBold,
                }}
            >
                <Stack
                    direction={{
                        xs: "column",
                        sm: "row",
                    }}
                    alignItems={{
                        xs: "flex-start",
                        sm: "center",
                    }}
                    justifyContent="space-between"
                >
                    <Stack direction="row" alignItems="center">
                        {<BorderColor />}
                        {props.editor.title}
                    </Stack>
                    <IconButton onClick={props.onClose}>
                        <Clear />
                    </IconButton>
                </Stack>
            </DialogTitle>
            <DialogContent>
                <Box sx={{ paddingY: 2 }}>
                    {props.editor.component}
                </Box>
            </DialogContent>
        </Dialog>
    );
};
// --------------------------------
