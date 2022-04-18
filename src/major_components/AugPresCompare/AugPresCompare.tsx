import { useState, memo } from "react";

import Stack from "@mui/material/Stack";

import { compareStats } from "./helper";

import EquipmentBuilder from "../EquipmentBuilder/EquipmentBuilder";
import StatsDisplay from "../../components/StatsDisplay";

import {
    AugmentData,
    AugmentPreset,
    EquipmentData,
    EquipmentWithAugments,
} from "../../types";

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

    // ------------------------------------
    // handlers
    const handleAugmentChange = (
        augments: AugmentData[],
        old_value: EquipmentWithAugments,
        updater: (new_value: EquipmentWithAugments) => void,
    ) => {
        let updated: EquipmentWithAugments = Object.create(old_value);
        updated.augments = augments;
        updater(updated);
    };

    const handleEquipmentChange = (
        equipment: EquipmentData | null,
        old_value: EquipmentWithAugments,
        updater: (new_value: EquipmentWithAugments) => void,
    ) => {
        let updated: EquipmentWithAugments = Object.create(old_value);
        updated.equipment = equipment;
        updater(updated);
    };
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
                    value={subject}
                    augmentPresets={props.augmentPresets}
                    onAugmentsChange={(augments) =>
                        handleAugmentChange(
                            augments,
                            subject,
                            setSubject,
                        )
                    }
                    onEquipmentChange={(equipment) =>
                        handleEquipmentChange(
                            equipment,
                            subject,
                            setSubject,
                        )
                    }
                />
                <EquipmentBuilder
                    allowEmptyEquipment
                    header="Comparand"
                    mode="both"
                    value={comparand}
                    augmentPresets={props.augmentPresets}
                    onAugmentsChange={(augments) =>
                        handleAugmentChange(
                            augments,
                            comparand,
                            setComparand,
                        )
                    }
                    onEquipmentChange={(equipment) =>
                        handleEquipmentChange(
                            equipment,
                            comparand,
                            setComparand,
                        )
                    }
                />
            </Stack>
            <StatsDisplay {...stats} />
        </Stack>
    );
};

export default memo(AugPresCompare);
