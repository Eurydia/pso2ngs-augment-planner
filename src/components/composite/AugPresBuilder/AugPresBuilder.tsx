import { useState } from "react";

import Stack from "@mui/material/Stack";
import { prepareStatsToDisplay } from "./helper";

import StatsDisplay from "../../basic/StatsDisplay";
import AugmentPicker from "../../basic/AugmentPicker";
import NameDescFields from "../../basic/NameDescFields";
import SaveClearButtons from "../../basic/SaveClearButtons";

import { AugmentData, AugmentPreset } from "../../../types";
import { TextField } from "@mui/material";

interface AugPresBuilderProps {
    initPreset?: AugmentPreset;
    onSave: (preset: AugmentPreset) => void;
}
const AugPresBuilder = (props: AugPresBuilderProps) => {
    // -------------------------------------
    // prepare states
    const [name, setName] = useState(props.initPreset?.name || "");
    const [desc, setDesc] = useState(
        props.initPreset?.description || "",
    );
    const [augments, setAugments] = useState<AugmentData[]>(
        props.initPreset?.augments || [],
    );
    // -------------------------------------

    // -------------------------------------
    // handlers
    const handleSave = () => {
        props.onSave({
            name: name.normalize().trim(),
            description: desc.normalize(),
            augments,
        });
        resetFields();
    };
    const resetFields = () => {
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
                <SaveClearButtons
                    disableSaveButton={!Boolean(name)}
                    onSaveClick={() => handleSave()}
                    onClearClick={() => resetFields()}
                />
            </Stack>
            <StatsDisplay {...parsed_stats} />
        </Stack>
    );
};
export default AugPresBuilder;
