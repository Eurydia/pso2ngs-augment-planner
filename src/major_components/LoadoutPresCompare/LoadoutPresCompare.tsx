import React, { useState, memo } from "react";

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import useTheme from "@mui/material/styles/useTheme";

import { compareStats } from "./helper";

import EquipmentBuilder from "../EquipmentBuilder";
import { LoadoutPresetPicker } from "../../components/PresetPicker";
import StatsDisplay from "../../components/StatsDisplay";

import {
    AugmentPreset,
    AugmentData,
    EquipmentData,
    Equipment,
    LoadoutPreset,
} from "../../types";

interface LoadoutPresCompareProps {
    augmentPresets: AugmentPreset[];
    loadoutPresets: LoadoutPreset[];
}

const init_equipment = [
    {
        equipment: null,
        augments: [],
    },
    {
        equipment: null,
        augments: [],
    },
    {
        equipment: null,
        augments: [],
    },
    {
        equipment: null,
        augments: [],
    },
];

const LoadoutPresCompare = (props: LoadoutPresCompareProps) => {
    const theme = useTheme();
    // ------------------------------------
    // prepare states
    const [tab, setTab] = useState(0);

    // The subject of the comparison
    const [subjPreset, setSubjPreset] =
        useState<LoadoutPreset | null>(null);
    const [subject, setSubject] =
        useState<Equipment[]>(init_equipment);
    // The comparand of the comparison
    const [compPreset, setCompPreset] =
        useState<LoadoutPreset | null>(null);
    const [comparand, setComparand] =
        useState<Equipment[]>(init_equipment);
    // ------------------------------------

    //  -------------------------------------
    // prepare the augment builders
    const headers = ["weapon", "unit #1", "unit #2", "unit #3"];
    const prepareBuilders = (
        values: Equipment[],
        setter: React.Dispatch<React.SetStateAction<Equipment[]>>,
    ) =>
        headers.map((header, index) => {
            const mode = index === 0 ? "weapons" : "armors";
            const value = values[index];
            return (
                <Grid
                    item
                    key={`${header} ${index}`}
                    xs={1}
                    paddingX={1}
                >
                    <EquipmentBuilder
                        header={`${header}`}
                        mode={mode}
                        value={value}
                        augmentPresets={props.augmentPresets}
                        onAugmentsChange={(augments) =>
                            setter((prev) => {
                                let updated = [...prev];
                                updated[index].augments = augments;
                                return updated;
                            })
                        }
                        onEquipmentChange={(equipment) =>
                            setter((prev) => {
                                let updated = [...prev];
                                updated[index].equipment = equipment;
                                return updated;
                            })
                        }
                    />
                </Grid>
            );
        });
    // -------------------------------------

    const stats = compareStats(subject, comparand);

    return (
        <Stack spacing={1}>
            <Tabs
                value={tab}
                onChange={(e, new_tab) => setTab(new_tab)}
            >
                <Tab label="Subject" value={0} />
                <Tab label="Comparand" value={1} />
                <Tab label="Stats" value={2} />
            </Tabs>
            <Typography
                sx={{
                    fontSize: theme.typography.h5.fontSize,
                    color: theme.palette.primary.main,
                    fontWeight: theme.typography.fontWeightBold,
                    textTransform: "capitalize",
                }}
            >
                {tab === 0 && "subject"}
                {tab === 1 && "comparand"}
                {tab === 2 && "stats"}
            </Typography>
            {tab === 0 && (
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
            )}
            {tab === 1 && (
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
            )}
            <Grid
                container
                columns={{ xs: 1, sm: 2 }}
                rowSpacing={1.5}
            >
                {tab === 0 && prepareBuilders(subject, setSubject)}
                {tab === 1 &&
                    prepareBuilders(comparand, setComparand)}
            </Grid>
            {tab === 2 && <StatsDisplay {...stats} />}
        </Stack>
    );
};

export default memo(LoadoutPresCompare);
