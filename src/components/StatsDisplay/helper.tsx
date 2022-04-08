import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import useTheme from "@mui/material/styles/useTheme";

export const StatItem = (props: {
    name: string;
    value?: string;
    isAdd?: boolean;
}) => {
    const theme = useTheme();
    const { name, value, isAdd } = props;

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
        <Grid item xs={6}>
            <Typography
                padding={1}
                fontFamily={theme.typography.fontFamily}
                textTransform="capitalize"
            >
                {text}
            </Typography>
        </Grid>
    );
};

export const StatsGroup = (props: { children: React.ReactNode }) => {
    return <Grid container>{props.children}</Grid>;
};
