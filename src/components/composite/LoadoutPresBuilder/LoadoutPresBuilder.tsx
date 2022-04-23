import React, { useState } from "react";

import Stack from "@mui/material/Stack";
<<<<<<< Updated upstream
import Button from "@mui/material/Button";
=======
>>>>>>> Stashed changes

import { prepareInitialStates } from "./helper";

<<<<<<< Updated upstream
import { prepareStatsToDisplay, toSignature } from "./helper";

import LoadoutLayout from "../../components/2x2GridLayout";
import EquipmentBuilder from "../EquipmentBuilder";
=======
import {
    BuilderGridContainer,
    prepareBuilders,
    parseStatsFromMultipleEquipment,
} from "../EquipmentBuilder";
>>>>>>> Stashed changes
import StatsDisplay from "../../basic/StatsDisplay";
import TabCombo from "../../auxillery/TabCombo";
import {
    NameDescFields,
    SaveClearButtonsCombo,
} from "../../auxillery";

import {
    AugmentPreset,
    LoadoutPreset,
    EquipmentWithAugments,
    EquipmentWithAugmentSignature,
    AugmentData,
    EquipmentData,
} from "../../../types";

interface LoadoutPresBuilderProps {
    initPreset?: LoadoutPreset;
    augmentPresets: AugmentPreset[];
    onPresetSave: (preset: LoadoutPreset) => void;
}

<<<<<<< Updated upstream
const init_equipment = {
    equipment: null,
    augments: [],
};

=======
>>>>>>> Stashed changes
const LoPresBuilder = (props: LoadoutPresBuilderProps) => {
    // -------------------------------------
    // prepare initial states
    const { initial_name, initial_desc, initial_equipment } =
        prepareInitialStates(props.initPreset);
    // -------------------------------------

    // -------------------------------------
    // prepare states
<<<<<<< Updated upstream
    const [name, setName] = useState("");
    const [description, setDesc] = useState("");
    const [weapon, setWeapon] =
        useState<EquipmentWithAugments>(init_equipment);
    const [unitOne, setUnitOne] =
        useState<EquipmentWithAugments>(init_equipment);
    const [unitTwo, setUnitTwo] =
        useState<EquipmentWithAugments>(init_equipment);
    const [unitThree, setUnitThree] =
        useState<EquipmentWithAugments>(init_equipment);
=======
    const [tab, setTab] = useState(0);
    const [name, setName] = useState(initial_name);
    const [description, setDesc] = useState(initial_desc);
    const [equipment, setEquipment] =
        useState<Equipment[]>(initial_equipment);
>>>>>>> Stashed changes
    // -------------------------------------

    // -------------------------------------
    // handler
    const handleEquipmentChange = (
        equipment: EquipmentData | null,
        old_value: EquipmentWithAugments,
        setter: (new_value: EquipmentWithAugments) => void,
    ) => {
        let updated: EquipmentWithAugments = Object.create(old_value);
        updated.equipment = equipment;
        setter(updated);
    };

    const handleAugmentChange = (
        augments: AugmentData[],
        old_value: EquipmentWithAugments,
        setter: (new_value: EquipmentWithAugments) => void,
    ) => {
        let updated: EquipmentWithAugments = Object.create(old_value);
        updated.augments = augments;
        setter(updated);
    };

    const handleResetFields = () => {
        setName("");
        setDesc("");
<<<<<<< Updated upstream
        setWeapon(init_equipment);
        setUnitOne(init_equipment);
        setUnitTwo(init_equipment);
        setUnitThree(init_equipment);
=======
        setEquipment([
            { equipment: null, augments: [] },
            { equipment: null, augments: [] },
            { equipment: null, augments: [] },
            { equipment: null, augments: [] },
        ]);
>>>>>>> Stashed changes
    };

    const handlePresetSave = () => {
        // -------------------------
        // prepareing preset before call the props callback
        const weapon_signature = toSignature(weapon);

        const units = [unitOne, unitTwo, unitThree];
        let unit_signatures: EquipmentWithAugmentSignature[] = [];
        for (const u of units) {
            const u_signature = toSignature(u);
            if (u_signature) {
                unit_signatures.push(u_signature);
            }
        }
        const preset: LoadoutPreset = {
<<<<<<< Updated upstream
            name,
            description,
            weapon: weapon_signature,
            units: unit_signatures,
=======
            name: name.normalize().trim(),
            description: description.normalize(),
            equipment,
>>>>>>> Stashed changes
        };
        // -------------------------
        handleResetFields();
        props.onPresetSave(preset);
    };
    // -------------------------------------

    const stats = prepareStatsToDisplay([
        weapon,
        unitOne,
        unitTwo,
        unitThree,
    ]);

    // -------------------------------------
    // prepare the augment builders
<<<<<<< Updated upstream
    const equipment_headers = [
        "weapon",
        "unit #1",
        "unit #2",
        "unit #3",
    ];
    const equipment_setters = [
        setWeapon,
        setUnitOne,
        setUnitTwo,
        setUnitThree,
    ];
    const equipment_states = [weapon, unitOne, unitTwo, unitThree];

    const equipment_builders = equipment_headers.map(
        (header, index) => {
            return (
                <EquipmentBuilder
                    key={`${header} ${index}`}
                    header={header}
                    mode={index === 0 ? "weapons" : "armors"}
                    value={equipment_states[index]}
                    augmentPresets={props.augmentPresets}
                    onAugmentsChange={(augments) =>
                        handleAugmentChange(
                            augments,
                            equipment_states[index],
                            equipment_setters[index],
                        )
                    }
                    onEquipmentChange={(equipment) =>
                        handleEquipmentChange(
                            equipment,
                            equipment_states[index],
                            equipment_setters[index],
                        )
                    }
                />
            );
        },
    );
    // -------------------------------------

=======
    const equipment_builders = prepareBuilders(
        ["weapon", "unit #1", "unit #2", "unit #3"],
        equipment,
        setEquipment,
        props.augmentPresets,
    );
    // -------------------------------------

    const stats = parseStatsFromMultipleEquipment(equipment);

>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
            <LoadoutLayout>{equipment_builders}</LoadoutLayout>
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
            <StatsDisplay {...stats} />
=======
            <TabCombo
                value={tab}
                labels={["builder", "stats"]}
                onTabChange={setTab}
            >
                <BuilderGridContainer>
                    {equipment_builders}
                </BuilderGridContainer>
                <StatsDisplay {...stats} />
            </TabCombo>
            <SaveClearButtonsCombo
                disableSaveButton={!Boolean(name)}
                onSaveClick={handlePresetSave}
                onClearClick={handleResetFields}
            />
>>>>>>> Stashed changes
        </Stack>
    );
};

export default LoPresBuilder;
