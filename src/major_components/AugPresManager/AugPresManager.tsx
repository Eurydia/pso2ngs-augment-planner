import { memo } from "react";

import Grid from "@mui/material/Grid";

import { CustomCard } from "./helper";
import { AugmentPreset } from "../../types";
import { propsIsEqual } from "../../util";

interface AugPresManagerProps {
    augmentPresets: AugmentPreset[];
    onEdit: (index: number) => void;
    onExport: (index: number) => void;
    onDuplicate: (index: number) => void;
    onDelete: (index: number) => void;
}

const AugPresManager = (props: AugPresManagerProps) => {
    const cards = props.augmentPresets.map((preset, index) => {
        return (
            <Grid item xs={1} padding={1} key={preset.name}>
                <CustomCard
                    index={index}
                    header={preset.name}
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
        <Grid
            container
            columns={{ xs: 1, sm: 2, md: 3 }}
            sx={{
                maxHeight: "750px",
                overflow: "auto",
            }}
        >
            {cards}
        </Grid>
    );
};

export default memo(AugPresManager, propsIsEqual);
