import React, { useEffect, useState } from "react";

import Stack from "@mui/material/Stack";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import useTheme from "@mui/material/styles/useTheme";

import Construction from "@mui/icons-material/Construction";
import Compare from "@mui/icons-material/Compare";
import Dashboard from "@mui/icons-material/Dashboard";

import { useSnackbar } from "notistack";

import { default as main_theme } from "./theme";
import {
    saveSession,
    loadSession,
    loadPresets,
    augmentPresetFromSignatures,
    loadoutPresetsFromSignatures,
    loadoutPresetToSignatures,
    augmentPresetToSignature,
} from "./save_and_load";
import {
    addPreset,
    editPreset,
    importPreset,
    exportPreset,
    exportAllPresets,
} from "./handlers";
import {
    PaperBackground,
    ImportExportButtons,
    EditDialog,
} from "./helper_components";

import AugPresBuilder from "../major_components/AugPresBuilder";
import AugPresCompare from "../major_components/AugPresCompare";
import AugPresManager from "../major_components/AugPresManager";
import LoadoutPresBuilder from "../major_components/LoadoutPresBuilder";
import LoadoutPresCompare from "../major_components/LoadoutPresCompare";

import {
    AugmentPreset,
    AugmentPresetSignature,
    LoadoutPreset,
    LoadoutPresetSignature,
} from "../types";
import {
    TypeguardAugmentPresetSignature,
    TypeguardLoadoutPresetSignature,
} from "../typeguards";

const App = () => {
    const theme = useTheme();
    const { enqueueSnackbar } = useSnackbar();

    // -------------------------------------
    // MODAL STATES
    const [dialogEditor, setDialogEditor] = useState<{
        title: string;
        component: React.ReactElement;
    }>({
        title: "",
        component: <React.Fragment></React.Fragment>,
    });
    const [dialogOpen, setDialogOpen] = useState(false);
    const openDialog = () => setDialogOpen(true);
    const closeDialog = () => setDialogOpen(false);
    // -------------------------------------

    // -------------------------------------
    // AUGMENT PRESET STATES
    // load augment presets saved in local storage
    const loaded_aug_pres = loadPresets(
        loadSession<AugmentPresetSignature>("augmentPreset"),
        TypeguardAugmentPresetSignature,
        augmentPresetFromSignatures,
    );
    // and use the loaded presets as initial values
    const [augPresets, setAugPresets] = useState(loaded_aug_pres);
    // updating value on memory and in local storage
    // -------------------------------------

    // -------------------------------------
    // AUGMENT PRESETS HANDLERS
    // when a change is made to the augment
    // update local storage
    useEffect(() => {
        saveSession(
            "augmentPreset",
            augmentPresetToSignature(augPresets),
        );
    }, [augPresets]);
    // when a preset is going to be edited
    const editAugmentPreset = (index: number) => {
        const handleEditSave = (edited_preset: AugmentPreset) => {
            closeDialog();
            const { text, options } = editPreset(
                index,
                edited_preset,
                setAugPresets,
            );
            enqueueSnackbar(text, options);
        };
        const target_preset = augPresets[index];
        const title = "Augment Preset Edit";
        const component = (
            <AugPresBuilder
                initPreset={target_preset}
                onPresetSave={handleEditSave}
            />
        );
        setDialogEditor({ title, component });
        openDialog();
    };

    // -------------------------------------
    // LOADOUT PRESET STATES
    // load augment presets saved in local storage
    const loaded_loadout_pres = loadPresets(
        loadSession<LoadoutPresetSignature>("loadoutPreset"),
        TypeguardLoadoutPresetSignature,
        loadoutPresetsFromSignatures,
    );
    // and use the saved presets as initial values
    const [loadoutPresets, setLoadoutPresets] = useState(
        loaded_loadout_pres,
    );
    // updating value on memory and in local storage
    // -------------------------------------

    // -------------------------------------
    // handlers
    useEffect(() => {
        saveSession(
            "loadoutPreset",
            loadoutPresetToSignatures(loadoutPresets),
        );
    }, [loadoutPresets]);
    // -------------------------------------

    return (
        <ThemeProvider theme={main_theme}>
            <Stack
                spacing={2}
                sx={{
                    marginX: "auto",
                    maxWidth: "md",
                    fontFamily: theme.typography.fontFamily,
                }}
            >
                <PaperBackground
                    title="Augment Preset Builder"
                    titleIcon={<Construction fontSize="inherit" />}
                >
                    <AugPresBuilder
                        onPresetSave={(new_preset) => {
                            const { text, options } = addPreset(
                                new_preset,
                                setAugPresets,
                            );
                            enqueueSnackbar(text, options);
                        }}
                    />
                </PaperBackground>
                <PaperBackground
                    title="Augment Preset Comparison"
                    titleIcon={<Compare fontSize="inherit" />}
                >
                    <AugPresCompare augmentPresets={augPresets} />
                </PaperBackground>
                <PaperBackground
                    title="Augment Preset Manager"
                    titleIcon={<Dashboard fontSize="inherit" />}
                    headerOther={
                        <ImportExportButtons
                            importAction={(data_string) => {
                                const { text, options } =
                                    importPreset(
                                        data_string,
                                        setAugPresets,
                                        TypeguardAugmentPresetSignature,
                                        augmentPresetFromSignatures,
                                    );
                                enqueueSnackbar(text, options);
                            }}
                            exportAction={() => {
                                exportAllPresets(
                                    augPresets,
                                    augmentPresetToSignature,
                                );
                                enqueueSnackbar(
                                    "All presets exported.",
                                    {
                                        variant: "success",
                                    },
                                );
                            }}
                        />
                    }
                >
                    <AugPresManager
                        augmentPresets={augPresets}
                        onEdit={editAugmentPreset}
                        onExport={(index) => {
                            exportPreset(
                                augPresets[index],
                                augmentPresetToSignature,
                            );
                            enqueueSnackbar("Preset exported.", {
                                variant: "success",
                            });
                        }}
                        onDuplicate={(index) => {
                            setAugPresets((prev) => {
                                return [...prev, prev[index]];
                            });
                            enqueueSnackbar("Preset duplicated.", {
                                variant: "success",
                            });
                        }}
                        onDelete={(index) => {
                            setAugPresets((prev) => {
                                let updated = [...prev];
                                updated.splice(index, 1);
                                return updated;
                            });
                            enqueueSnackbar("Preset deleted.", {
                                variant: "success",
                            });
                        }}
                    />
                </PaperBackground>
                <PaperBackground
                    title="Loadout Preset Builder"
                    titleIcon={<Construction fontSize="inherit" />}
                >
                    <LoadoutPresBuilder
                        augmentPresets={augPresets}
                        onPresetSave={(new_preset) => {
                            const { text, options } = addPreset(
                                new_preset,
                                setLoadoutPresets,
                            );
                            enqueueSnackbar(text, options);
                        }}
                    />
                </PaperBackground>
                <PaperBackground
                    title="Loadout Preset Compare"
                    titleIcon={<Compare fontSize="inherit" />}
                >
                    <LoadoutPresCompare
                        augmentPresets={augPresets}
                        loadoutPresets={loadoutPresets}
                    />
                </PaperBackground>
                <EditDialog
                    open={dialogOpen}
                    onClose={closeDialog}
                    editor={dialogEditor}
                />
            </Stack>
        </ThemeProvider>
    );
};
export default App;
