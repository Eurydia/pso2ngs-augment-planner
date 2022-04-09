import Autocomplete from "@mui/material/Autocomplete";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";

import AugmentPicker from "../AugmentPicker";
import StatsDisplay from "../StatsDisplay";

const LoadoutBuilder = () => {
    return (
        <Box>
            <Stack direction="column">
                <TextField label="loadout name"></TextField>
                <TextField label="loadout description"></TextField>
                <StatsDisplay />
            </Stack>
        </Box>
    );
};

export default LoadoutBuilder;
