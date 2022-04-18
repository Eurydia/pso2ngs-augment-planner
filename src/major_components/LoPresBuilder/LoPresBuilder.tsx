import React, { useState } from "react";

import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

import Save from "@mui/icons-material/Save";
import Clear from "@mui/icons-material/Clear";

import {
    GridContainer,
    GridItem,
    prepareStatsToDisplay,
    toSignature,
    // EquipmentWithAugments,
    // toSignature,
    // prepareStatsToDisplay,
} from "./helper";
import StatsDisplay from "../../components/StatsDisplay";
import { NameInputField, DescInputField } from "../InputComponents";
import EquipmentBuilder from "../EquipmentBuilder";
import {
    AugmentPreset,
    LoadoutPreset,
    EquipmentWithAugments,
    EquipmentSignature,
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
    const handleResetFields = () => {
        const empty_equipment = {
            equipment: null,
            augments: [],
        };
        setName("");
        setDesc("");
        setWeapon(empty_equipment);
        setUnitOne(empty_equipment);
        setUnitTwo(empty_equipment);
        setUnitThree(empty_equipment);
    };

    const handlePresetSave = () => {
        const units = [unitOne, unitTwo, unitThree];
        let unit_signatures: EquipmentSignature[] = [];
        for (const u of units) {
            const u_signature = toSignature(u);
            if (u_signature) {
                unit_signatures.push(u_signature);
            }
        }
        const weapon_signature = toSignature(weapon);
        const preset: LoadoutPreset = {
            name,
            description,
            weapon: weapon_signature,
            units: unit_signatures,
        };
        props.onPresetSave(preset);
        handleResetFields();
    };
    // -------------------------------------

    const stats = prepareStatsToDisplay([
        weapon,
        unitOne,
        unitTwo,
        unitThree,
    ]);
    return (
        <Stack spacing={1}>
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
            <GridContainer>
                <GridItem>
                    <EquipmentBuilder
                        header="Weapon"
                        mode="weapons"
                        augmentPresets={props.augmentPresets}
                        initAugments={weapon.augments}
                        initEquipment={weapon.equipment}
                        onChange={setWeapon}
                    />
                </GridItem>
                <GridItem>
                    <EquipmentBuilder
                        header="Unit #1"
                        mode="armors"
                        augmentPresets={props.augmentPresets}
                        initAugments={unitOne.augments}
                        initEquipment={unitOne.equipment}
                        onChange={setUnitOne}
                    />
                </GridItem>
                <GridItem>
                    <EquipmentBuilder
                        header="Unit #2"
                        mode="armors"
                        augmentPresets={props.augmentPresets}
                        initAugments={unitTwo.augments}
                        initEquipment={unitTwo.equipment}
                        onChange={setUnitTwo}
                    />
                </GridItem>
                <GridItem>
                    <EquipmentBuilder
                        header="Unit #3"
                        mode="armors"
                        augmentPresets={props.augmentPresets}
                        initAugments={unitThree.augments}
                        initEquipment={unitThree.equipment}
                        onChange={setUnitThree}
                    />
                </GridItem>
            </GridContainer>
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
