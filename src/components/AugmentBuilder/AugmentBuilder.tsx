import { useState } from "react";

import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import {
    renderOption,
    getTotalStats,
    parseStats,
    validateValues,
    getOptionLabel,
} from "./helper";

import StatsDisplay from "../StatsDisplay";
import DATA, { AugmentData } from "../../assets/data/augments";

export default function AugmentBuilder() {
    const initial_stats: { [key: string]: string } = {};
    const [stats, setStats] = useState(initial_stats);

    const initial_value: AugmentData[] = [];
    const [values, setValues] = useState(initial_value);

    const handleChange = (values: (string | AugmentData)[]) => {
        // handle values
        const validated_values = validateValues(values);
        setValues(validated_values);
        // handle stats
        const stats = getTotalStats(validated_values);
        const parsed_stats = parseStats(stats);
        setStats(parsed_stats);
    };

    return (
        <Grid container direction="row" columns={10}>
            <Grid item xs={4}>
                <Stack spacing={2}>
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
                    <Autocomplete
                        fullWidth
                        freeSolo
                        multiple
                        filterSelectedOptions
                        value={values}
                        options={DATA}
                        getOptionLabel={getOptionLabel}
                        groupBy={(option) => option.group}
                        // `renderOption` renders options on dropdown
                        renderOption={renderOption}
                        // `renderInput` renders the input field itself
                        renderInput={(params: any) => {
                            return (
                                <TextField
                                    {...params}
                                    variant="filled"
                                    // helperText="some result may be hidden."
                                    label="Augment"
                                />
                            );
                        }}
                        onChange={(e, v, r) => handleChange(v)}
                        sx={{
                            textTransform: "capitalize",
                        }}
                    />
                    <Button variant="contained">Save</Button>
                    <Button variant="outlined">clear</Button>
                </Stack>
            </Grid>
            <Grid item xs={6}>
                <StatsDisplay {...stats} />
            </Grid>
        </Grid>
    );
}
