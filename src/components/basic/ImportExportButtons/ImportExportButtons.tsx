import React from "react";

import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

import Upload from "@mui/icons-material/Upload";
import Download from "@mui/icons-material/Download";

// ---------------------------------
interface ImportButtonProps {
    onClick: (value: string) => void;
}
const ImportButton = (props: ImportButtonProps) => {
    // Change this thing and import won't work.
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const fileReader = new FileReader();
            fileReader.readAsText(e.target.files[0], "UTF-8");
            fileReader.onload = (e) =>
                props.onClick(e.target?.result as string);
        }
    };
    return (
        <Button
            variant="contained"
            component="label"
            startIcon={<Upload />}
        >
            <input
                hidden
                type="file"
                accept=".json"
                onChange={handleChange}
            />
            import preset(s)
        </Button>
    );
};
interface ExportButtonProps {
    disabled?: boolean;
    onClick: () => void;
}
const ExportButton = (props: ExportButtonProps) => {
    return (
        <Button
            disabled={props.disabled}
            onClick={props.onClick}
            variant="outlined"
            startIcon={<Download />}
        >
            export all
        </Button>
    );
};
// ---------------------------------

// ---------------------------------
interface ImportExportButtonsProps {
    disableExportButton: boolean;
    importAction: (text: string) => void;
    exportAction: () => void;
}
/**
 * Import export button combo for preset managers
 * @param props
 * @returns
 */
const ImportExportButtons = (props: ImportExportButtonsProps) => {
    return (
        <Stack direction="row" spacing={1}>
            <ImportButton onClick={props.importAction} />
            <ExportButton
                disabled={props.disableExportButton}
                onClick={props.exportAction}
            />
        </Stack>
    );
};
export default ImportExportButtons;
// ---------------------------------
