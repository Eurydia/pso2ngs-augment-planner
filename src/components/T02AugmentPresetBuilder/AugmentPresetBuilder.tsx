import { useState } from "react";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import StatsDisplay from "../T01StatsDisplay";
import AugmentPicker from "../T01AugmentPicker";
import { AugmentData, getTotalStats, parseStats } from "../util";

const AugmentPresetBuilder = () => {
    const initial_stats: { [key: string]: string } = {};
    const [stats, setStats] = useState(initial_stats);

    const handleChange = (validated_values: AugmentData[]) => {
        // handle stats
        const stats = getTotalStats(validated_values);
        const parsed_stats = parseStats(stats);
        setStats(parsed_stats);
    };

    return (
        <Box>
            <Stack direction={{ xs: "column", md: "row" }}>
                <Stack spacing={2} minWidth={0.4}>
                    <Typography fontSize="h5.fontSize">
                        Augment Builder
                    </Typography>
                    <TextField variant="filled" label="Preset name" />
                    <TextField
                        multiline
                        variant="filled"
                        rows={5}
                        label="Description"
                    />
                    <AugmentPicker onChange={handleChange} />
                    <Button variant="contained">Save</Button>
                    <Button variant="outlined">clear</Button>
                </Stack>
                <StatsDisplay {...stats} />
            </Stack>
        </Box>
    );
};

export default AugmentPresetBuilder;
