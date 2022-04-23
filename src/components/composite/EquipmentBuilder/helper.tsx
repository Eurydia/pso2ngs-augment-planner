import { ReactNode } from "react";

import Grid from "@mui/material/Grid";

// --------------------------------------------------------
/**
 * Grid container for `EquipmentBuilder`.
 * @param props
 * @returns
 */
interface BuilderGridProps {
    children: ReactNode[] | ReactNode;
}
export const BuilderGridContainer = (props: BuilderGridProps) => {
    return (
        <Grid container columns={{ xs: 1, sm: 2 }} rowSpacing={1.5}>
            {props.children}
        </Grid>
    );
};
/**
 * Grid item for `EquipmentBuilder`.
 * @param props
 * @returns
 */
export const BuilderGridItem = (props: BuilderGridProps) => {
    return (
        <Grid item xs={1} paddingX={1}>
            {props.children}
        </Grid>
    );
};
// --------------------------------------------------------
