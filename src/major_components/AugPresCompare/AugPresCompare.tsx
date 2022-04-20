import { useState } from "react";

import Stack from "@mui/material/Stack";

import { compareStats } from "./helper";

import EquipmentBuilder from "../EquipmentBuilder/EquipmentBuilder";
import StatsDisplay from "../../components/StatsDisplay";

import { AugmentPreset, Equipment } from "../../types";

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
                        setSubject((prev) => {
                            return { ...prev, augments };
                        })
                    }
                    onEquipmentChange={(equipment) =>
                        setSubject((prev) => {
                            return { ...prev, equipment };
                        })
                    }
                />
                <EquipmentBuilder
                    allowEmptyEquipment
                    header="Comparand"
                    mode="both"
                    value={comparand}
                    augmentPresets={props.augmentPresets}
                    onAugmentsChange={(augments) =>
                        setComparand((prev) => {
                            return {
                                ...prev,
                                augments,
                            };
                        })
                    }
                    onEquipmentChange={(equipment) =>
                        setComparand((prev) => {
                            return {
                                ...prev,
                                equipment,
                            };
                        })
                    }
                />
            </Stack>
            <StatsDisplay {...stats} />
        </Stack>
    );
};

export default AugPresCompare;
