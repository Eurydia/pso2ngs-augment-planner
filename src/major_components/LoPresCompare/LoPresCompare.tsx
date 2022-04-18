import { useState, useEffect, memo } from "react";

import Stack from "@mui/material/Stack";

import { compareStats } from "./helper";
import EquipmentBuilder from "../EquipmentBuilder/EquipmentBuilder";
import StatsDisplay, {
    StatItemValue,
} from "../../components/StatsDisplay";
import { AugmentPreset, EquipmentWithAugments } from "../../types";
import { propsIsEqual } from "../../util";

interface AugPresCompareProps {
    augmentPresets: AugmentPreset[];
}

const init_states: EquipmentWithAugments = {
    equipment: null,
    augments: [],
};

const AugPresCompare = (props: AugPresCompareProps) => {
    // ------------------------------------
    // The subject of the comparison
    const [subject, setSubject] =
        useState<EquipmentWithAugments>(init_states);
    // The comparand of the comparison
    const [comparand, setComparand] =
        useState<EquipmentWithAugments>(init_states);
    // ------------------------------------

    const stats = compareStats(subject, comparand);
    return (
        <Stack spacing={2}>
            <Stack
                spacing={2}
                minWidth={0.4}
                direction={{ xs: "column", sm: "row" }}
            >
                <EquipmentBuilder
                    allowEmptyEquipment
                    header="Subject"
                    mode="both"
                    augmentPresets={props.augmentPresets}
                    onChange={setSubject}
                />
                <EquipmentBuilder
                    allowEmptyEquipment
                    header="Comparand"
                    mode="both"
                    augmentPresets={props.augmentPresets}
                    onChange={setComparand}
                />
            </Stack>
            <StatsDisplay {...stats} />
        </Stack>
    );
};

export default memo(AugPresCompare, propsIsEqual);
