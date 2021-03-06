import { useState } from "react";

import Stack from "@mui/material/Stack";

import Hardware from "@mui/icons-material/Hardware";
import Equalizer from "@mui/icons-material/Equalizer";

import {
    prepareInitialStates,
    prepareStatsToDisplay,
    Builders,
} from "./helper";

import StatsDisplay from "../../basic/StatsDisplay";
import TabCombo from "../../basic/TabCombo";
import NameDescFields from "../../basic/NameDescFields";
import SaveClearButtons from "../../basic/SaveClearButtons";

import {
    Equipment,
    AugmentPreset,
    LoadoutPreset,
} from "../../../types";

interface LoadoutPresBuilderProps {
    initPreset?: LoadoutPreset;
    augmentPresets: AugmentPreset[];
    onSave: (preset: LoadoutPreset) => void;
}

const LoadoutPresBuilder = (props: LoadoutPresBuilderProps) => {
    // -------------------------------------
    // prepare initial states
    const { initial_name, initial_desc, initial_equipment } =
        prepareInitialStates(props.initPreset);
    // -------------------------------------

    // -------------------------------------
    // states
    const [tab, setTab] = useState(0);
    const [name, setName] = useState(initial_name);
    const [description, setDesc] = useState(initial_desc);
    const [equipment, setEquipment] =
        useState<Equipment[]>(initial_equipment);
    // -------------------------------------

    // -------------------------------------
    // handler
    const handleResetFields = () => {
        setName("");
        setDesc("");
        setEquipment([
            { equipment: null, augments: [] },
            { equipment: null, augments: [] },
            { equipment: null, augments: [] },
            { equipment: null, augments: [] },
        ]);
    };
    const handlePresetSave = () => {
        props.onSave({
            name: name.normalize().trim(),
            description: description.normalize(),
            equipment,
        });
        handleResetFields();
    };
    // -------------------------------------

    const parsed_stats = prepareStatsToDisplay(equipment);

    return (
        <Stack spacing={1}>
            <NameDescFields
                nameLength={40}
                nameValue={name}
                onNameChange={setName}
                descLength={200}
                descRows={3}
                descValue={description}
                onDescChange={setDesc}
            />
            <TabCombo
                value={tab}
                labels={[
                    { text: "builder", icon: <Hardware /> },
                    { text: "stats", icon: <Equalizer /> },
                ]}
                onTabChange={setTab}
            >
                <Builders
                    augmentPreset={props.augmentPresets}
                    values={equipment}
                    setter={setEquipment}
                />
                <StatsDisplay {...parsed_stats} />
            </TabCombo>
            <SaveClearButtons
                disableSaveButton={!Boolean(name)}
                onSaveClick={handlePresetSave}
                onClearClick={handleResetFields}
            />
        </Stack>
    );
};

export default LoadoutPresBuilder;
