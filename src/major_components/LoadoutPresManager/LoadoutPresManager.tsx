import Grid from "@mui/material/Grid";

import PresetCard from "./PresetCard";

import { LoadoutPreset } from "../../types";

interface LoadoutPresManager {
    augmentPresets: LoadoutPreset[];
    onEdit: (index: number) => void;
    onExport: (index: number) => void;
    onDuplicate: (index: number) => void;
    onDelete: (index: number) => void;
}

const AugPresManager = (props: LoadoutPresManager) => {
    const cards = props.augmentPresets.map((preset, index) => (
        <Grid item xs={1} padding={1} key={preset.name}>
            <PresetCard
                index={index}
                header={preset.name}
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
        <Grid
            container
            columns={1}
            sx={{
                maxHeight: "600px",
                overflowY: "auto",
            }}
        >
            {cards}
        </Grid>
    );
};

export default AugPresManager;
