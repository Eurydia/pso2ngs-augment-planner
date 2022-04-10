import Stack from "@mui/material/Stack";
import Box from "@mui/material/Grid";
import TextField from "@mui/material/TextField";

import EquipmentBuilder from "../EquipmentBuilder";
import StatsDisplay from "../StatsDisplay";

const LoadoutBuilder = () => {
    return (
        <Box>
            <Stack direction="column">
                <TextField label="loadout name"></TextField>
                <TextField label="loadout description"></TextField>
                <EquipmentBuilder />
                <StatsDisplay />
            </Stack>
        </Box>
    );
};

export default LoadoutBuilder;
