import { useState, memo } from "react";

import Stack from "@mui/material/Stack";
<<<<<<< Updated upstream
import Typography from "@mui/material/Typography";

import { prepareEquipmentBuilders, Loadout } from "./helper";

import StatsDisplay from "../../main/StatsDisplay";
import TwobyTwoGridLayout from "../../components/2x2GridLayout";

import {
    AugmentPreset,
    EquipmentWithAugments,
    LoadoutPreset,
} from "../../../types";
=======

import {
    compareStats,
    prepareBuilders,
    BuilderGridContainer,
} from "./helper";

import { LoadoutPresetPicker } from "../../components/PresetPicker";
import StatsDisplay from "../../components/StatsDisplay";
import TabCombo from "../../components/TabCombo";

import { AugmentPreset, Equipment, LoadoutPreset } from "../../types";
>>>>>>> Stashed changes

interface LoadoutPresCompareProps {
    loadoutPresets: LoadoutPreset[];
    augmentPresets: AugmentPreset[];
}

const init_loadout: Loadout = {
    weapon: { equipment: null, augments: [] },
    units: [],
};

const LoadoutPresCompare = (props: LoadoutPresCompareProps) => {
    // ------------------------------------
    // prepare states
    // The subject of the comparison
<<<<<<< Updated upstream
    const [subject, setSubject] = useState<Loadout>(init_loadout);
=======
    const [subjPreset, setSubjPreset] =
        useState<LoadoutPreset | null>(null);
    const [subject, setSubject] =
        useState<Equipment[]>(init_equipment);

>>>>>>> Stashed changes
    // The comparand of the comparison
    const [comparand, setComparand] = useState<Loadout>(init_loadout);
    // ------------------------------------

<<<<<<< Updated upstream
    // ------------------------------------
    // handlers
    // ------------------------------------

    // const stats = compareStats(subject, comparand);
=======
    const stats = compareStats(subject, comparand);
>>>>>>> Stashed changes

    const subject_builders = prepareEquipmentBuilders(
        "subject",
        subject,
        props.augmentPresets,
        setSubject,
    );
    return (
<<<<<<< Updated upstream
        <Stack spacing={2}>
            <TwobyTwoGridLayout>
                {subject_builders}
            </TwobyTwoGridLayout>
            {/* <TwobyTwoGridLayout></TwobyTwoGridLayout> */}
            {/* <StatsDisplay {...stats} /> */}
        </Stack>
=======
        <TabCombo
            value={tab}
            onTabChange={setTab}
            labels={["subject", "comparand", "stats"]}
        >
            <Stack>
                <LoadoutPresetPicker
                    value={subjPreset}
                    presets={props.loadoutPresets}
                    onChange={(preset) => {
                        if (preset) {
                            setSubject(preset.equipment);
                        }
                        setSubjPreset(preset);
                    }}
                />
                <BuilderGridContainer>
                    {prepareBuilders(
                        subject,
                        props.augmentPresets,
                        setSubject,
                    )}
                </BuilderGridContainer>
            </Stack>
            <Stack>
                <LoadoutPresetPicker
                    value={compPreset}
                    presets={props.loadoutPresets}
                    onChange={(preset) => {
                        if (preset) {
                            setComparand(preset.equipment);
                        }
                        setCompPreset(preset);
                    }}
                />
                <BuilderGridContainer>
                    {prepareBuilders(
                        comparand,
                        props.augmentPresets,
                        setComparand,
                    )}
                </BuilderGridContainer>
            </Stack>
            <StatsDisplay {...stats} />
        </TabCombo>
>>>>>>> Stashed changes
    );
};

export default memo(LoadoutPresCompare);
