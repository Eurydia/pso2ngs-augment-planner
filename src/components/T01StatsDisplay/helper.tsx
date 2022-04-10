import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

export const StatItem = (props: {
    name: string;
    value?: string;
    isAdd?: boolean;
    xs?: number;
}) => {
    const { name, value, isAdd, xs } = props;

    let _value = value;
    if (value === undefined) {
        if (isAdd !== undefined) {
            _value = "+0";
        } else {
            _value = "+0.0%";
        }
    }

    const text = `${name}: ${_value}`;

    return (
        <Grid item xs={xs || 1}>
            <Typography padding={1} fontSize="body1.fontSize">
                {text}
            </Typography>
        </Grid>
    );
};

export const StatsGroup = (props: { children: React.ReactNode }) => {
    return (
        <Grid container columns={2}>
            {props.children}
        </Grid>
    );
};
