import React, { useState } from "react";

import Stack from "@mui/material/Stack";

import { compareStats } from "./helper";
import EquipmentBuilder from "../EquipmentBuilder/EquipmentBuilder";
import StatsDisplay from "../../components/StatsDisplay";
import {
    AugmentPreset,
    EquipmentData,
    AugmentData,
} from "../../types";

interface AugPresCompareProps {
    augmentPresets: AugmentPreset[];
}

const AugPresCompare = (props: AugPresCompareProps) => {
    // ------------------------------------
    // The subject of the comparison
    const [subjEquipVal, setSubjEquipVal] =
        useState<EquipmentData | null>(null);
    const [subjAugsVals, setSubjAugsVal] = useState<AugmentData[]>(
        [],
    );
    // ------------------------------------

    // ------------------------------------
    // The comparand of the comparison
    const [compEquipVal, setCompEquipVal] =
        useState<EquipmentData | null>(null);
    const [compAugsVals, setCompAugsVals] = useState<AugmentData[]>(
        [],
    );
    // ------------------------------------

    // ------------------------------------
    // parse and compare stats
    const stats = compareStats(
        subjAugsVals,
        subjEquipVal,
        compAugsVals,
        compEquipVal,
    );
    // ------------------------------------

    return (
        <React.Fragment>
            <Stack
                spacing={2}
                paddingTop={2}
                // direction={{ xs: "column", sm: "row" }}
            >
                <Stack
                    spacing={2}
                    minWidth={0.4}
                    direction={{ xs: "column", sm: "row" }}
                >
                    <EquipmentBuilder
                        header="Subject"
                        variant="both"
                        allowEmptyEquipment={true}
                        augPresets={props.augmentPresets}
                        equipmentValue={subjEquipVal}
                        augsValues={subjAugsVals}
                        onEquipmentChange={setSubjEquipVal}
                        onAugsChange={setSubjAugsVal}
                    />
                    <EquipmentBuilder
                        header="Comparand"
                        variant="both"
                        allowEmptyEquipment={true}
                        augPresets={props.augmentPresets}
                        equipmentValue={compEquipVal}
                        augsValues={compAugsVals}
                        onEquipmentChange={setCompEquipVal}
                        onAugsChange={setCompAugsVals}
                    />
                </Stack>
                <StatsDisplay {...stats} />
            </Stack>
        </React.Fragment>
    );
};

export default AugPresCompare;
