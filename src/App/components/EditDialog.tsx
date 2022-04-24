import React from "react";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import useTheme from "@mui/material/styles/useTheme";

import BorderColor from "@mui/icons-material/BorderColor";
import Clear from "@mui/icons-material/Clear";

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
                        <BorderColor />
                        {props.editor.title}
                    </Stack>
                    <IconButton onClick={props.onClose}>
                        <Clear />
                    </IconButton>
                </Stack>
            </DialogTitle>
            <DialogContent>
                <Box sx={{ padding: 2 }}>
                    {props.editor.component}
                </Box>
            </DialogContent>
        </Dialog>
    );
};
// --------------------------------
