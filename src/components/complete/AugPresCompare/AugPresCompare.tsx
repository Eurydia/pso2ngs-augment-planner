import { useState, memo } from "react";

import Stack from "@mui/material/Stack";

import { compareStats } from "./helper";

import EquipmentBuilder, {
    BuilderGridContainer,
    BuilderGridItem,
} from "../EquipmentBuilder";
import StatsDisplay from "../../main/StatsDisplay";

import {
    AugmentData,
    AugmentPreset,
<<<<<<< Updated upstream
    EquipmentData,
    EquipmentWithAugments,
=======
    Equipment,
    EquipmentData,
>>>>>>> Stashed changes
} from "../../../types";

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

    // ------------------------------------
    // handlers
    const handleAugChange = (
        augments: AugmentData[],
        setter: React.Dispatch<React.SetStateAction<Equipment>>,
    ) => {
        setter((prev) => {
            let updated = { ...prev };
            updated.augments = augments;
            return updated;
        });
    };
    const handleEquipChange = (
        equipment: EquipmentData | null,
        setter: React.Dispatch<React.SetStateAction<Equipment>>,
    ) => {
        setter((prev) => {
            let updated = { ...prev };
            updated.equipment = equipment;
            return updated;
        });
    };

    // ------------------------------------

    const stats = compareStats(subject, comparand);

    return (
        <Stack spacing={2}>
<<<<<<< Updated upstream
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
=======
            <BuilderGridContainer>
                <BuilderGridItem>
                    <EquipmentBuilder
                        header="subject"
                        mode="both"
                        value={subject}
                        onAugmentsChange={(augs) =>
                            handleAugChange(augs, setSubject)
                        }
                        onEquipmentChange={(eq) =>
                            handleEquipChange(eq, setSubject)
                        }
                        augmentPresets={props.augmentPresets}
                    />
                </BuilderGridItem>
                <BuilderGridItem>
                    <EquipmentBuilder
                        header="comparand"
                        mode="both"
                        value={subject}
                        onAugmentsChange={(augs) =>
                            handleAugChange(augs, setComparand)
                        }
                        onEquipmentChange={(eq) =>
                            handleEquipChange(eq, setComparand)
                        }
                        augmentPresets={props.augmentPresets}
                    />
                </BuilderGridItem>
            </BuilderGridContainer>
>>>>>>> Stashed changes
            <StatsDisplay {...stats} />
        </Stack>
    );
};

export default memo(AugPresCompare);
