import React, { useState } from "react";

import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

import Save from "@mui/icons-material/Save";
import Clear from "@mui/icons-material/Clear";

import { prepareStatsToDisplay, toSignature } from "./helper";

import LoadoutLayout from "../../components/2x2GridLayout";
import EquipmentBuilder from "../EquipmentBuilder";
import StatsDisplay from "../../components/StatsDisplay";
import { NameInputField, DescInputField } from "../InputComponents";

import {
    AugmentPreset,
    LoadoutPreset,
    EquipmentWithAugments,
    EquipmentWithAugmentSignature,
    AugmentData,
    EquipmentData,
} from "../../types";

interface LoadoutPresBuilderProps {
    // initPreset?: AugmentPreset;
    augmentPresets: AugmentPreset[];
    onPresetSave: (preset: LoadoutPreset) => void;
}

const init_equipment = {
    equipment: null,
    augments: [],
};

const LoPresBuilder = (props: LoadoutPresBuilderProps) => {
    // // -------------------------------------
    // // prepare initial states
    // const { initial_name, initial_desc, initial_augments } =
    //     prepareInitalStates(props.initPreset);
    // // -------------------------------------

    // -------------------------------------
    // prepare states
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
        setWeapon(init_equipment);
        setUnitOne(init_equipment);
        setUnitTwo(init_equipment);
        setUnitThree(init_equipment);
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
            name,
            description,
            weapon: weapon_signature,
            units: unit_signatures,
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

    return (
        <Stack spacing={1}>
            <NameInputField
                maxLength={40}
                value={name}
                onChange={setName}
            />
            <DescInputField
                maxLength={200}
                rows={3}
                value={description}
                onChange={setDesc}
            />
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
        </Stack>
    );
};

export default LoPresBuilder;
