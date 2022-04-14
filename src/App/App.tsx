import { useState } from "react";

import Stack from "@mui/material/Stack";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import createTheme from "@mui/material/styles/createTheme";
import useTheme from "@mui/material/styles/useTheme";

import { useSnackbar } from "notistack";

import { PaperBackground, doAddPreset } from "./helper";
import AugPresBuilder from "../major_components/AugPresBuilder";
import AugPresCompare from "../major_components/AugPresCompare/AugPresCompare";
import AugPresManager from "../major_components/AugPresManager";
import { AugmentPreset } from "../types";

const _theme = createTheme();

const my_augments: AugmentPreset[] = [
    {
        name: "🐳Fearless Erasing",
        description: "Max PP with no regards for anything else.",
        augments: [
            {
                name: "spi precision",
                level: 0,
            },
            {
                name: "pettas soul",
                level: 3,
            },
            {
                name: "dread keeper",
                level: 3,
            },
            {
                name: "addi spira",
                level: 0,
            },
            {
                name: "ael domina",
                level: 0,
            },
        ],
    },
];

const App = () => {
    const theme = useTheme();
    const { enqueueSnackbar } = useSnackbar();

    // -------------------------------------
    // for augment preset builder
    const [augPresets, setAugPresets] =
        useState<AugmentPreset[]>(my_augments);
    // -------------------------------------

    // const [loadouts, setLoadouts] = useState<LoadoutPresetSignature[]>([]);
    const addNewAugmentPres = (new_preset: AugmentPreset) => {
        const { snackbar, preset } = doAddPreset(
            new_preset,
            augPresets.map((preset) => preset.name),
        );
        if (preset) {
            setAugPresets([...augPresets, preset]);
        }
        enqueueSnackbar(snackbar.text, snackbar.option);
    };

    return (
        <ThemeProvider theme={_theme}>
            <Stack
                spacing={2}
                sx={{
                    marginX: "auto",
                    maxWidth: "md",
                    fontFamily: theme.typography.fontFamily,
                }}
            >
                <PaperBackground header="Augment Preset Manager">
                    <AugPresManager />
                </PaperBackground>
                <PaperBackground header="Augment Preset Builder">
                    <AugPresBuilder
                        onPresetSave={addNewAugmentPres}
                    />
                </PaperBackground>
                <PaperBackground header="Augment Preset Comparison">
                    <AugPresCompare augmentPresets={augPresets} />
                </PaperBackground>
            </Stack>
        </ThemeProvider>
    );
};
export default App;
