import Grid from "@mui/material/Grid";

// -------------------------------------
// grid container and item macro
export const GridContainer = (props: {
    children: React.ReactNode;
}) => {
    return (
        <Grid container columns={{ xs: 1, sm: 2 }} rowSpacing={2}>
            {props.children}
        </Grid>
    );
};

export const GridItem = (props: { children: React.ReactNode }) => {
    return (
        <Grid item xs={1} padding={1}>
            {props.children}
        </Grid>
    );
};
// -------------------------------------
