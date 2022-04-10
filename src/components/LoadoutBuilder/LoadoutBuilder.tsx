import { useState } from "react";

import Stack from "@mui/material/Stack";
import Box from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { Grid } from "@mui/material";

import EquipmentBuilder from "../EquipmentBuilder";
import StatsDisplay from "../StatsDisplay";

const LoadoutBuilder = () => {
    const initial_stats: { [keys: string]: string } = {};
    const [stats, setStats] = useState(initial_stats);

    const handleChange = () => {};

    return (
        <Box>
            <Stack spacing={2}>
                <TextField label="loadout name"></TextField>
                <TextField label="loadout description"></TextField>
                <Grid container columns={{ xs: 1, sm: 2 }}>
                    <Grid item xs={1}>
                        <EquipmentBuilder weapons={true} armors={false} />
                    </Grid>
                    <Grid item xs={1}>
                        <EquipmentBuilder weapons={false} armors={true} />
                    </Grid>
                    <Grid item xs={1}>
                        <EquipmentBuilder weapons={false} armors={true} />
                    </Grid>
                    <Grid item xs={1}>
                        <EquipmentBuilder weapons={false} armors={true} />
                    </Grid>
                </Grid>
                <StatsDisplay {...stats} />
            </Stack>
        </Box>
    );
};

export default LoadoutBuilder;
