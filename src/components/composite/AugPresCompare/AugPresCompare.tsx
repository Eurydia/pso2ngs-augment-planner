import { useState, Dispatch, SetStateAction } from "react";

import Stack from "@mui/material/Stack";

import { compareStats } from "./helper";

import EquipmentBuilder, {
    BuilderGridItem,
    BuilderGridContainer,
} from "../EquipmentBuilder";
import StatsDisplay from "../../basic/StatsDisplay";

import {
    AugmentData,
    AugmentPreset,
    Equipment,
    EquipmentData,
} from "../../../types";

interface AugPresCompareProps {
    augmentPresets: AugmentPreset[];
}

const init_states: Equipment = {
    equipment: null,
    augments: [],
};

const AugPresCompare = (props: AugPresCompareProps) => {
    // ------------------------------------
    // The subject of the comparison
    const [subject, setSubject] = useState<Equipment>(init_states);
    // The comparand of the comparison
    const [comparand, setComparand] =
        useState<Equipment>(init_states);
    // ------------------------------------

    // ------------------------------------
    // handlers
    const handleAugChange = (
        augments: AugmentData[],
        setter: Dispatch<SetStateAction<Equipment>>,
    ) => {
        setter((prev) => {
            let updated = { ...prev };
            updated.augments = augments;
            return updated;
        });
    };
    const handleEquipChange = (
        equipment: EquipmentData | null,
        setter: Dispatch<SetStateAction<Equipment>>,
    ) => {
        setter((prev) => {
            let updated = { ...prev };
            updated.equipment = equipment;
            return updated;
        });
    };
    // ------------------------------------

    const parsed_stats = compareStats(subject, comparand);

    return (
        <Stack spacing={2}>
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
            <StatsDisplay {...parsed_stats} />
        </Stack>
    );
};
export default AugPresCompare;
