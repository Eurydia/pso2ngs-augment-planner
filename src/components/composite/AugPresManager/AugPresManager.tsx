import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";

import PresetCard from "./PresetCard";

import { AugmentPreset } from "../../../types";
import ImportExportButtons from "../../basic/ImportExportButtons";

interface AugPresManagerProps {
    augmentPresets: AugmentPreset[];
    onEdit: (index: number) => void;
    onExport: (index: number) => void;
    onDuplicate: (index: number) => void;
    onDelete: (index: number) => void;
    onImport: (data: string) => void;
    onExportAll: () => void;
}
const AugPresManager = (props: AugPresManagerProps) => {
    const cards = props.augmentPresets.map((preset, index) => {
        return (
            <Grid item xs={1} padding={1} key={preset.name}>
                <PresetCard
                    index={index}
                    name={preset.name}
                    desc={preset.description}
                    augments={preset.augments}
                    onEdit={props.onEdit}
                    onExport={props.onExport}
                    onDuplicate={props.onDuplicate}
                    onDelete={props.onDelete}
                />
            </Grid>
        );
    });
    return (
        <Stack spacing={2}>
            <ImportExportButtons
                importAction={props.onImport}
                exportAction={props.onExportAll}
                disableExportButton={
                    props.augmentPresets.length === 0
                }
            />
            <Grid
                container
                columns={{ xs: 1, sm: 2, md: 3 }}
                sx={{
                    maxHeight: "600px",
                    overflow: "auto",
                }}
            >
                {cards}
            </Grid>
        </Stack>
    );
};
export default AugPresManager;
