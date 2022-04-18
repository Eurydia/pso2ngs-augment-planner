import { useState, memo } from "react";

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { prepareEquipmentBuilders, Loadout } from "./helper";

import StatsDisplay from "../../components/StatsDisplay";
import TwobyTwoGridLayout from "../../components/2x2GridLayout";

import {
    AugmentPreset,
    EquipmentWithAugments,
    LoadoutPreset,
} from "../../types";

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
    const [subject, setSubject] = useState<Loadout>(init_loadout);
    // The comparand of the comparison
    const [comparand, setComparand] = useState<Loadout>(init_loadout);
    // ------------------------------------

    // ------------------------------------
    // handlers
    // ------------------------------------

    // const stats = compareStats(subject, comparand);

    const subject_builders = prepareEquipmentBuilders(
        "subject",
        subject,
        props.augmentPresets,
        setSubject,
    );
    return (
        <Stack spacing={2}>
            <TwobyTwoGridLayout>
                {subject_builders}
            </TwobyTwoGridLayout>
            {/* <TwobyTwoGridLayout></TwobyTwoGridLayout> */}
            {/* <StatsDisplay {...stats} /> */}
        </Stack>
    );
};

export default memo(LoadoutPresCompare);
