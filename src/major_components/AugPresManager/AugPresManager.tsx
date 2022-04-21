import { memo } from "react";

import Grid from "@mui/material/Grid";

import { CustomCard } from "./helper";

import { AugmentPreset } from "../../types";

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
                maxHeight: "600px",
                overflow: "auto",
            }}
        >
            {cards}
        </Grid>
    );
};

// const shouldAugPresManagerNOTRerender = (
//     prev: AugPresManagerProps,
//     next: AugPresManagerProps,
// ) => {
//     const p_s = prev.augmentPresets;
//     const n_s = next.augmentPresets;
//     if (p_s.length !== n_s.length) {
//         return false;
//     }

//     for (let i = 0; i < p_s.length; i++) {
//         const p_s_s = p_s[i];
//         const n_s_s = n_s[i];
//         if (p_s_s.name !== n_s_s.name || p_s_s.description !== n_s_s.description) {
//             return false
//         }

//         const p_s_a = p_s_s.augments;
//         for ()
//     }

//     return true;
// };

export default memo(AugPresManager);
