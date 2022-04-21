import { useState, memo } from "react";

import Stack from "@mui/material/Stack";

import { prepareInitalStates, prepareStatsToDisplay } from "./helper";

import StatsDisplay from "../../components/StatsDisplay";
import AugmentPicker from "../../components/AugmentPicker";
import {
    SaveClearButtonsCombo,
    NameDescFields,
} from "../../components/InputComponents";

import { augmentToSignature } from "../../util";
import { AugmentData, AugmentPreset } from "../../types";

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
    const [desc, setDesc] = useState(initial_desc);
    const [augments, setAugments] =
        useState<AugmentData[]>(initial_augments);
    // -------------------------------------

    // -------------------------------------
    // handlers
    const handlePresetSave = () => {
<<<<<<< Updated upstream
        const augment_signatures = augments.map(augmentToSignature);
        const data = {
            name,
            description,
            augments: augment_signatures,
        };
        props.onPresetSave(data);
=======
        props.onPresetSave({
            name: name.normalize().trim(),
            description: desc.normalize(),
            augments,
        });
>>>>>>> Stashed changes
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
                <NameDescFields
                    nameValue={name}
                    nameLength={40}
                    onNameChange={setName}
                    descValue={desc}
                    descLength={200}
                    onDescChange={setDesc}
                />
                <AugmentPicker
                    disabled={false}
                    values={augments}
                    onChange={setAugments}
                />
                <SaveClearButtonsCombo
                    disableSaveButton={!Boolean(name)}
                    onSaveClick={handlePresetSave}
                    onClearClick={handleResetFields}
                />
            </Stack>
            <StatsDisplay {...parsed_stats} />
        </Stack>
    );
};

export default memo(AugPresBuilder);
