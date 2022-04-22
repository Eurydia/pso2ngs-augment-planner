import React, { useState, useEffect } from "react";

import Stack from "@mui/material/Stack";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import useTheme from "@mui/material/styles/useTheme";

import Construction from "@mui/icons-material/Construction";
import Compare from "@mui/icons-material/Compare";
import Dashboard from "@mui/icons-material/Dashboard";

import { useSnackbar } from "notistack";

import { default as main_theme } from "./theme";
import { saveData, loadData, loadPresets } from "./session";
import {
    augmentPresetFromSignatures,
    loadoutPresetsFromSignatures,
    loadoutPresetToSignatures,
    augmentPresetToSignature,
} from "./signature_conversion";
import {
    addPreset,
    editPreset,
    duplicatePreset,
    deletePreset,
    importPreset,
    exportPreset,
    exportAllPresets,
} from "./handlers";
import {
    PaperBackground,
    ImportExportButtons,
    EditDialog,
} from "./components";
import {
    typeGuardAugmentPresetSignature,
    TypeguardLoadoutPresetSignature,
} from "./typeguard";

import TabCombo from "../components/auxillery/TabCombo";
import AugPresBuilder from "../components/complete/AugPresBuilder";
import AugPresCompare from "../components/complete/AugPresCompare";
import AugPresManager from "../components/complete/AugPresManager";
import LoadoutPresBuilder from "../components/complete/LoadoutPresBuilder";
import LoadoutPresCompare from "../components/complete/LoadoutPresCompare";
import LoadoutPresManager from "../components/complete/LoadoutPresManager";

import {
    AugmentPreset,
    AugmentPresetSignature,
    LoadoutPreset,
    LoadoutPresetSignature,
} from "../types";

const App = () => {
    const theme = useTheme();

    // -------------------------------------
    // SNACKBAR FEEDBACK
    const { enqueueSnackbar } = useSnackbar();
    const [snackbar, setSnackbar] = useState({
        text: "",
        options: {},
    });
    useEffect(() => {
        if (snackbar.text) {
            enqueueSnackbar(snackbar.text, snackbar.options);
            setSnackbar({ text: "", options: {} });
        }
    }, [snackbar, enqueueSnackbar]);

    // -------------------------------------

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
    // -------------------------------------

    // -------------------------------------
    // AUGMENT PRESET STATES
    // load augment presets saved in local storage
    const loaded_aug_pres = loadPresets(
        loadData<AugmentPresetSignature>("augmentPreset"),
        typeGuardAugmentPresetSignature,
        augmentPresetFromSignatures,
    );
    // and use the loaded presets as initial values
    const [augPresets, setAugPresets] = useState(loaded_aug_pres);
    const [augTab, setAugTab] = useState(0);
    // when a change is made to the augment
    // update local storage
    useEffect(() => {
        saveData(
            "augmentPreset",
            augmentPresetToSignature(augPresets),
        );
    }, [augPresets]);
    // -------------------------------------

    // -------------------------------------
    // AUGMENT PRESETS HANDLERS
    // when a preset is going to be edited
    const editAugmentPreset = (index: number) => {
        const handleEditSave = (edited_preset: AugmentPreset) => {
            setDialogOpen(false);
            editPreset(
                index,
                edited_preset,
                setAugPresets,
                setSnackbar,
            );
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
        setDialogOpen(true);
    };
    // -------------------------------------

    // -------------------------------------
    // LOADOUT PRESET STATES
    // load augment presets saved in local storage
    const loadout_pres_from_session = loadPresets(
        loadData<LoadoutPresetSignature>("loadoutPreset"),
        TypeguardLoadoutPresetSignature,
        loadoutPresetsFromSignatures,
    );
    // and use the saved presets as initial values
    const [loadoutPresets, setLoadoutPresets] = useState(
        loadout_pres_from_session,
    );
    const [loadoutTab, setLoadoutTab] = useState(0);
    useEffect(() => {
        saveData(
            "loadoutPreset",
            loadoutPresetToSignatures(loadoutPresets),
        );
    }, [loadoutPresets]);
    // -------------------------------------

    // -------------------------------------
    // handlers
    const editLoadoutPreset = (index: number) => {
        const handleEditSave = (edited_preset: LoadoutPreset) => {
            setDialogOpen(false);
            editPreset(
                index,
                edited_preset,
                setLoadoutPresets,
                setSnackbar,
            );
        };
        const target_preset = loadoutPresets[index];
        const title = "Loadout Preset Edit";
        const component = (
            <LoadoutPresBuilder
                initPreset={target_preset}
                augmentPresets={augPresets}
                onPresetSave={handleEditSave}
            />
        );
        setDialogEditor({ title, component });
        setDialogOpen(true);
    };

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
                <TabCombo
                    value={augTab}
                    onTabChange={setAugTab}
                    labels={["build", "compare", "manage"]}
                >
                    <PaperBackground
                        title="Augment Preset Builder"
                        titleIcon={
                            <Construction fontSize="inherit" />
                        }
                    >
                        <AugPresBuilder
                            onPresetSave={(new_preset) => {
                                addPreset(
                                    new_preset,
                                    setAugPresets,
                                    setSnackbar,
                                );
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
                    >
                        <AugPresManager
                            augmentPresets={augPresets}
                            onEdit={editAugmentPreset}
                            onExport={(index) => {
                                exportPreset(
                                    augPresets[index],
                                    augmentPresetToSignature,
                                    setSnackbar,
                                );
                            }}
                            onDuplicate={(index) =>
                                duplicatePreset(
                                    index,
                                    setAugPresets,
                                    setSnackbar,
                                )
                            }
                            onDelete={(index) =>
                                deletePreset(
                                    index,
                                    setAugPresets,
                                    setSnackbar,
                                )
                            }
                        />
                    </PaperBackground>
                </TabCombo>
                <TabCombo
                    value={loadoutTab}
                    onTabChange={setLoadoutTab}
                    labels={["build", "compare", "manage"]}
                >
                    <PaperBackground
                        title="Loadout Preset Builder"
                        titleIcon={
                            <Construction fontSize="inherit" />
                        }
                    >
                        <LoadoutPresBuilder
                            augmentPresets={augPresets}
                            onPresetSave={(new_preset) => {
                                addPreset(
                                    new_preset,
                                    setLoadoutPresets,
                                    setSnackbar,
                                );
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
                    <PaperBackground
                        title="Loadout Preset Manager"
                        titleIcon={<Dashboard fontSize="inherit" />}
                    >
                        <LoadoutPresManager
                            augmentPresets={loadoutPresets}
                            onEdit={editLoadoutPreset}
                            onExport={(index) =>
                                exportPreset(
                                    loadoutPresets[index],
                                    loadoutPresetToSignatures,
                                    setSnackbar,
                                )
                            }
                            onDuplicate={(index) =>
                                duplicatePreset(
                                    index,
                                    setLoadoutPresets,
                                    setSnackbar,
                                )
                            }
                            onDelete={(index) =>
                                deletePreset(
                                    index,
                                    setLoadoutPresets,
                                    setSnackbar,
                                )
                            }
                        />
                    </PaperBackground>
                    <EditDialog
                        open={dialogOpen}
                        onClose={() => setDialogOpen(true)}
                        editor={dialogEditor}
                    />
                </TabCombo>
            </Stack>
        </ThemeProvider>
    );
};
export default App;
