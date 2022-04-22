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
            endIcon={<Upload />}
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
    onClick: () => void;
}
const ExportButton = (props: ExportButtonProps) => {
    return (
        <Button
            onClick={props.onClick}
            variant="outlined"
            endIcon={<Download />}
        >
            export all
        </Button>
    );
};
// ---------------------------------

// ---------------------------------
interface ImportExportButtonsProps {
    importAction: (text: string) => void;
    exportAction: () => void;
}
/**
 * Import export button combo for preset managers
 * @param props
 * @returns
 */
export const ImportExportButtons = (
    props: ImportExportButtonsProps,
) => {
    return (
        <Stack direction="row" spacing={1}>
            <ImportButton onClick={props.importAction} />
            <ExportButton onClick={props.exportAction} />
        </Stack>
    );
};
// ---------------------------------
