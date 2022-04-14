import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Card, { CardProps } from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import {
    Typography,
    Grid,
    Paper,
    useTheme,
    CardActions,
    IconButton,
    Tooltip,
} from "@mui/material";
import * as icon from "@mui/icons-material";

import { AugmentPreset, AugmentSignature } from "../../types";
import { blue, indigo, yellow } from "@mui/material/colors";

interface CustomeCardProps extends CardProps {
    title_: string;
    description: string;
    augments: AugmentSignature[];
}
const CustomCard = (props: CustomeCardProps) => {
    const theme = useTheme();

    const display_augments = props.augments.map((aug) => {
        const key = `${aug.name} ${aug.level}`;
        return <Typography key={key}>{key}</Typography>;
    });
    const desc = props.description ? `"${props.description}"` : "";
    return (
        <Card
            raised
            // sx={{
            //     backgroundColor: indigo["100"],
            // }}
        >
            {/* <CardHeader title={props.title_} /> */}
            <CardContent>
                <Stack spacing={2}>
                    <Typography
                        fontSize={theme.typography.h6.fontSize}
                        fontWeight={theme.typography.fontWeightMedium}
                        color={blue["A400"]}
                        sx={{
                            wordWrap: "break-word",
                        }}
                    >
                        {props.title_}
                    </Typography>
                    <Typography fontStyle="italic">{desc}</Typography>
                    <Stack textTransform="capitalize">
                        {display_augments}
                    </Stack>
                </Stack>
            </CardContent>
            <CardActions>
                <Tooltip title="Edit">
                    <IconButton>
                        <icon.Edit />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Duplicate">
                    <IconButton>
                        <icon.CopyAllRounded />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Save">
                    <IconButton>
                        <icon.Download />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Delete">
                    <IconButton>
                        <icon.Delete color="error" />
                    </IconButton>
                </Tooltip>
            </CardActions>
        </Card>
    );
};

interface AugPresManagerProps {
    augmentPresets: AugmentPreset[];
}
const AugPresManager = (props: AugPresManagerProps) => {
    const cards = props.augmentPresets.map((preset) => {
        return (
            <Grid item xs={1} padding={1} key={preset.name}>
                <CustomCard
                    title_={preset.name}
                    description={preset.description}
                    augments={preset.augments}
                />
            </Grid>
        );
    });
    return (
        <Grid
            container
            columns={{ xs: 1, sm: 2, md: 3 }}
            sx={{
                maxHeight: "500px",
                overflow: "auto",
            }}
        >
            {cards}
        </Grid>
    );
};

export default AugPresManager;
