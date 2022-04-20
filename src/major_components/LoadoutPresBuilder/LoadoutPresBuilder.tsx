import { useState } from "react";

import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";

import Save from "@mui/icons-material/Save";
import Clear from "@mui/icons-material/Clear";

import { prepareStats } from "./helper";

import EquipmentBuilder from "../EquipmentBuilder";
import StatsDisplay from "../../components/StatsDisplay";
import { NameInputField, DescInputField } from "../InputComponents";

import { AugmentPreset, LoadoutPreset, Equipment } from "../../types";

interface LoadoutPresBuilderProps {
    // initPreset?: AugmentPreset;
    augmentPresets: AugmentPreset[];
    onPresetSave: (preset: LoadoutPreset) => void;
}

const init_equipment = [
    { equipment: null, augments: [] },
    { equipment: null, augments: [] },
    { equipment: null, augments: [] },
    { equipment: null, augments: [] },
];

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
    const [equipment, setEquipment] =
        useState<Equipment[]>(init_equipment);
    // -------------------------------------

    // -------------------------------------
    // handlers;
    const handleResetFields = () => {
        setName("");
        setDesc("");
        setEquipment(init_equipment);
    };
    const handlePresetSave = () => {
        const preset: LoadoutPreset = {
            name,
            description,
            equipment,
        };
        handleResetFields();
        props.onPresetSave(preset);
    };
    // -------------------------------------

    //  -------------------------------------
    // prepare the augment builders
    const headers = ["weapon", "unit #1", "unit #2", "unit #3"];
    const equipment_builders = headers.map((header, index) => {
        const mode = index === 0 ? "weapons" : "armors";
        return (
            <Grid key={`${header} ${index}`} item xs={1} paddingX={1}>
                <EquipmentBuilder
                    header={header}
                    mode={mode}
                    value={equipment[index]}
                    augmentPresets={props.augmentPresets}
                    onAugmentsChange={(augments) =>
                        setEquipment((prev) => {
                            let update = [...prev];
                            update[index].augments = augments;
                            return update;
                        })
                    }
                    onEquipmentChange={(equipment) =>
                        setEquipment((prev) => {
                            let update = [...prev];
                            update[index].equipment = equipment;
                            return update;
                        })
                    }
                />
            </Grid>
        );
    });
    // -------------------------------------

    const stats = prepareStats(equipment);

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
            <Grid
                container
                columns={{ xs: 1, sm: 2 }}
                rowSpacing={1.5}
            >
                {equipment_builders}
            </Grid>
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
                    onClick={handleResetFields}
                    variant="outlined"
                >
                    clear
                </Button>
            </Stack>
            <StatsDisplay {...stats} />
        </Stack>
    );
};

export default LoPresBuilder;
