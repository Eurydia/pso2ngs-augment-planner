import { useState } from "react";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import useTheme from "@mui/material/styles/useTheme";

import { useSnackbar } from "notistack";

import StatsDisplay from "../StatsDisplay";
import AugmentPicker from "../AugmentPicker";
import { AugmentData, getTotalStats, parseStats } from "../util";

interface AugmentPresetBuilderProps {
    onPresetSave: Function;
}

const AugmentPresetBuilder = (props: AugmentPresetBuilderProps) => {
    const theme = useTheme();
    const { enqueueSnackbar } = useSnackbar();

    const [name, setName] = useState("");
    const [desc, setDesc] = useState("");
    const [augments, setAugments] = useState<AugmentData[]>([]);

    let stats: { [key: string]: string } = {};
    const handleAugmentChange = (validated_values: AugmentData[]) => {
        setAugments(validated_values);
        // handle stats
        const total_stats = getTotalStats(validated_values);
        const parsed_stats = parseStats(total_stats);
        stats = parsed_stats;
    };

    const resetFields = () => {
        setName("");
        setDesc("");
        handleAugmentChange([]);
    };

    const savePreset = () => {
        if (name === "") {
            enqueueSnackbar("Please enter preset name.", {
                variant: "error",
            });
            return;
        }
        const preset = {
            name,
            desc,
            augments,
        };
        props.onPresetSave(preset);
        enqueueSnackbar("Preset saved 👍.", { variant: "success" });
        resetFields();
    };

    return (
        <Box>
            <Stack direction={{ xs: "column", md: "row" }}>
                <Stack spacing={1} minWidth={0.4}>
                    <TextField
                        required
                        value={name}
                        variant="filled"
                        onChange={(event) => setName(event.target.value)}
                        label="Preset name"
                    />
                    <TextField
                        multiline
                        rows={5}
                        value={desc}
                        variant="filled"
                        onChange={(event) => setDesc(event.target.value)}
                        label="Description"
                    />
                    <AugmentPicker
                        disabled={false}
                        values={augments}
                        onChange={handleAugmentChange}
                    />
                    <Button variant="contained" onClick={savePreset}>
                        Save
                    </Button>
                    <Button variant="outlined" onClick={resetFields}>
                        clear
                    </Button>
                </Stack>
                <StatsDisplay {...stats} />
            </Stack>
        </Box>
    );
};

export default AugmentPresetBuilder;
