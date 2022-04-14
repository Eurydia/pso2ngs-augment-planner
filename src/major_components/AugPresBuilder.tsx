import React, { useState } from "react";

import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

import StatsDisplay from "../components/StatsDisplay";
import AugmentPicker from "../components/AugmentPicker";
import {
    augmentToSignature,
    getEffectsForStats,
    getTotalStats,
    parseStats,
} from "../util";
import { AugmentData, AugmentPreset } from "../types";
import { NameInputField, DescInputField } from "./InputComponents";

interface AugPresBuilderProps {
    onPresetSave: (preset: AugmentPreset) => void;
}

const AugPresBuilder = (props: AugPresBuilderProps) => {
    // -------------------------------------
    // preparing states
    const [name, setName] = useState("");
    const [description, setDesc] = useState("");
    const [augments, setAugments] = useState<AugmentData[]>([]);
    // -------------------------------------

    // -------------------------------------
    // prepare input props
    const name_max_length = 40;
    const desc_max_length = 200;
    const name_color =
        name.length > name_max_length ? "warning" : "primary";
    const desc_color =
        description.length > desc_max_length ? "warning" : "primary";
    // -------------------------------------

    // -------------------------------------
    // retrieving and parsing total stats from augments
    const all_effs = getEffectsForStats(augments);
    const total_stats = getTotalStats(all_effs);
    const parsed_stats: { [key: string]: string } =
        parseStats(total_stats);
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

    return (
        <React.Fragment>
            <Stack
                direction={{ xs: "column", md: "row" }}
                paddingTop={2}
                spacing={2}
            >
                <Stack spacing={1} minWidth={0.4}>
                    <NameInputField
                        maxLength={name_max_length}
                        color={name_color}
                        value={name}
                        onChange={setName}
                    />
                    <DescInputField
                        maxLength={desc_max_length}
                        color={desc_color}
                        value={description}
                        onChange={setDesc}
                    />
                    <AugmentPicker
                        disabled={false}
                        values={augments}
                        onChange={setAugments}
                    />
                    <Button
                        variant="contained"
                        disabled={!Boolean(name)}
                        onClick={handlePresetSave}
                    >
                        save
                    </Button>
                    <Button
                        variant="outlined"
                        onClick={handleResetFields}
                    >
                        clear
                    </Button>
                </Stack>
                <StatsDisplay {...parsed_stats} />
            </Stack>
        </React.Fragment>
    );
};

export default AugPresBuilder;
