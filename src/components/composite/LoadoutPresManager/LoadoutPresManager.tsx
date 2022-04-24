import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";

import PresetCard from "./PresetCard";

import ImportExportButtons from "../../basic/ImportExportButtons";

import { LoadoutPreset } from "../../../types";

interface LoadoutPresManager {
    loadoutPresets: LoadoutPreset[];
    onEdit: (index: number) => void;
    onExport: (index: number) => void;
    onDuplicate: (index: number) => void;
    onDelete: (index: number) => void;
    onImport: (data: string) => void;
    onExportAll: () => void;
}

const AugPresManager = (props: LoadoutPresManager) => {
    const cards = props.loadoutPresets.map((preset, index) => (
        <Grid item xs={1} padding={1} key={preset.name}>
            <PresetCard
                index={index}
                name={preset.name}
                desc={preset.description}
                equipment={preset.equipment}
                onEdit={props.onEdit}
                onExport={props.onExport}
                onDuplicate={props.onDuplicate}
                onDelete={props.onDelete}
            />
        </Grid>
    ));
    return (
        <Stack spacing={2}>
            <ImportExportButtons
                importAction={props.onImport}
                disableExportButton={
                    props.loadoutPresets.length === 0
                }
                exportAction={props.onExportAll}
            />
            <Grid
                container
                columns={{ xs: 1, sm: 2 }}
                sx={{
                    maxHeight: "600px",
                    overflowY: "auto",
                }}
            >
                {cards}
            </Grid>
        </Stack>
    );
};

export default AugPresManager;
