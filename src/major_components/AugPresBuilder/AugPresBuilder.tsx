import React, { useState } from "react";

import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

import Save from "@mui/icons-material/Save";
import Clear from "@mui/icons-material/Clear";

import { prepareInitalStates, prepareStatsToDisplay } from "./helper";
import StatsDisplay from "../../components/StatsDisplay";
import AugmentPicker from "../../components/AugmentPicker";
import { augmentToSignature } from "../../util";
import { AugmentData, AugmentPreset } from "../../types";
import { NameInputField, DescInputField } from "../InputComponents";

interface AugPresBuilderProps {
    initPreset?: AugmentPreset;
    onPresetSave: (preset: AugmentPreset) => void;
}

const AugPresBuilder = (props: AugPresBuilderProps) => {
    // -------------------------------------
    // prepare initial states
    const { initial_name, initial_desc, initial_augments } =
        prepareInitalStates(props.initPreset);
    // -------------------------------------

    // -------------------------------------
    // prepare states
    const [name, setName] = useState(initial_name);
    const [description, setDesc] = useState(initial_desc);
    const [augments, setAugments] =
        useState<AugmentData[]>(initial_augments);
    // -------------------------------------

    // -------------------------------------
    // handlers
    const handlePresetSave = () => {
        const augment_signatures = augments.map(augmentToSignature);
        const data = {
            name,
            description,
            augments: augment_signatures,
        };
        props.onPresetSave(data);
        handleResetFields();
    };

    const handleResetFields = () => {
        setName("");
        setDesc("");
        setAugments([]);
    };
    // -------------------------------------

    const parsed_stats = prepareStatsToDisplay(augments);

    return (
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <Stack spacing={1} minWidth={0.4}>
                <NameInputField
                    maxLength={40}
                    value={name}
                    onChange={setName}
                />
                <DescInputField
                    maxLength={200}
                    value={description}
                    onChange={setDesc}
                />
                <AugmentPicker
                    disabled={false}
                    values={augments}
                    onChange={setAugments}
                />
                <Stack direction="row" spacing={1}>
                    <Button
                        sx={{ width: 0.62 }}
                        startIcon={<Save />}
                        variant="contained"
                        disabled={!Boolean(name)}
                        onClick={handlePresetSave}
                    >
                        save
                    </Button>
                    <Button
                        sx={{ width: 0.38 }}
                        startIcon={<Clear />}
                        variant="outlined"
                        onClick={handleResetFields}
                    >
                        clear
                    </Button>
                </Stack>
            </Stack>
            <StatsDisplay {...parsed_stats} />
        </Stack>
    );
};

export default AugPresBuilder;
