import { useState, useEffect, Dispatch, SetStateAction } from "react";

import Stack from "@mui/material/Stack";

import { Builders, prepareStatsToDisplay } from "./helper";

import TabCombo from "../../basic/TabCombo";
import StatsDisplay from "../../basic/StatsDisplay";
import { LoadoutPresetPicker } from "../../basic/PresetPicker";

import {
    LoadoutPreset,
    AugmentPreset,
    Equipment,
} from "../../../types";

const init_loadout: Equipment[] = [
    { equipment: null, augments: [] },
    { equipment: null, augments: [] },
    { equipment: null, augments: [] },
    { equipment: null, augments: [] },
];

interface LoadoutPresCompareProps {
    loadoutPresets: LoadoutPreset[];
    augmentPresets: AugmentPreset[];
}
const LoadoutPresCompare = (props: LoadoutPresCompareProps) => {
    // ------------------------------------
    // prepare states
    const [tab, setTab] = useState(0);

    const [subjPreset, setSubjPreset] =
        useState<LoadoutPreset | null>(null);
    const [subject, setSubject] = useState<Equipment[]>(init_loadout);

    const [compPreset, setCompPreset] =
        useState<LoadoutPreset | null>(null);
    const [comparand, setComparand] =
        useState<Equipment[]>(init_loadout);
    // ------------------------------------

    // ------------------------------------
    // handlers
    useEffect(() => {}, [subject]);
    const handlePresetChange = (
        preset: LoadoutPreset | null,
        loadout_setter: Dispatch<SetStateAction<Equipment[]>>,
        preset_setter: Dispatch<SetStateAction<LoadoutPreset | null>>,
    ) => {
        if (preset) {
            loadout_setter(preset.equipment);
        }
        preset_setter(preset);
    };
    // ------------------------------------

    const parsed_stats = prepareStatsToDisplay(subject, comparand);

    return (
        <TabCombo
            value={tab}
            onTabChange={setTab}
            labels={["subject", "comparand", "stats"]}
        >
            <Stack>
                <LoadoutPresetPicker
                    value={subjPreset}
                    onChange={(preset) =>
                        handlePresetChange(
                            preset,
                            setSubject,
                            setSubjPreset,
                        )
                    }
                    presets={props.loadoutPresets}
                />
                <Builders
                    values={subject}
                    loadout_setter={setSubject}
                    preset_setter={setSubjPreset}
                    augmentPreset={props.augmentPresets}
                />
            </Stack>
            <Stack>
                <LoadoutPresetPicker
                    value={compPreset}
                    onChange={(preset) => {
                        handlePresetChange(
                            preset,
                            setComparand,
                            setCompPreset,
                        );
                    }}
                    presets={props.loadoutPresets}
                />
                <Builders
                    values={comparand}
                    loadout_setter={setComparand}
                    preset_setter={setCompPreset}
                    augmentPreset={props.augmentPresets}
                />
            </Stack>
            <StatsDisplay {...parsed_stats} />
        </TabCombo>
    );
};

export default LoadoutPresCompare;
