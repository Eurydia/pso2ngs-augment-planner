import { useState } from "react";

import Stack from "@mui/material/Stack";
import Box from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { Grid } from "@mui/material";

import EquipmentBuilder from "../T02EquipmentBuilder";
import StatsDisplay from "../T01StatsDisplay";

const LoadoutPresetBuilder = () => {
    const initial_stats: { [keys: string]: string } = {};
    const [stats, setStats] = useState(initial_stats);

    const handleChange = () => {};

    return (
        <Box>
            <Stack spacing={2}>
                <TextField label="loadout name"></TextField>
                <TextField label="loadout description"></TextField>
                <Stack spacing={2}>
                    <Stack
                        direction={{ xs: "column", sm: "row" }}
                        spacing={2}
                    >
                        <EquipmentBuilder
                            weapons={true}
                            armors={false}
                        />
                        <EquipmentBuilder
                            weapons={true}
                            armors={false}
                        />
                    </Stack>
                    <Stack
                        direction={{ xs: "column", sm: "row" }}
                        spacing={2}
                    >
                        <EquipmentBuilder
                            weapons={true}
                            armors={false}
                        />
                        <EquipmentBuilder
                            weapons={true}
                            armors={false}
                        />
                    </Stack>
                </Stack>
                <StatsDisplay {...stats} />
            </Stack>
        </Box>
    );
};

export default LoadoutPresetBuilder;
