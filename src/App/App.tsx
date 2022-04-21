import React, { useState } from "react";

import Stack from "@mui/material/Stack";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import useTheme from "@mui/material/styles/useTheme";

import Construction from "@mui/icons-material/Construction";
import Compare from "@mui/icons-material/Compare";
import Dashboard from "@mui/icons-material/Dashboard";

import { useSnackbar } from "notistack";
import { saveAs } from "file-saver";

import { default as main_theme } from "./theme";
import {
<<<<<<< Updated upstream
    checkNameAvailability,
    saveSession,
    loadSession,
    typeguardPresets,
=======
    saveData,
    loadData,
    loadPresets,
    augmentPresetFromSignatures,
    loadoutPresetsFromSignatures,
    loadoutPresetToSignatures,
    augmentPresetToSignature,
} from "./save_and_load";
import {
>>>>>>> Stashed changes
    addPreset,
    editSavePreset,
    importPreset,
<<<<<<< Updated upstream
} from "./helper_functions";
import {
    PaperBackground,
    ImportExportButtons,
    EditDialog as EditModal,
} from "./helper_components";
=======
    exportPreset,
    exportAllPresets,
    duplicatePreset,
    deletePreset,
} from "./handlers";
import {
    PaperBackground,
    ImportExportButtons,
    EditDialog,
} from "./components";
>>>>>>> Stashed changes

import TabCombo from "../components/TabCombo";
import AugPresBuilder from "../major_components/AugPresBuilder";
import AugPresCompare from "../major_components/AugPresCompare";
import AugPresManager from "../major_components/AugPresManager";
import LoadoutPresBuilder from "../major_components/LoadoutPresBuilder";
import LoadoutPresCompare from "../major_components/LoadoutPresCompare";
import LoadoutPresManager from "../major_components/LoadoutPresManager";

import {
    AugmentPreset,
    LoadoutPreset,
    TypeguardAugmentPreset,
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
<<<<<<< Updated upstream
    const aug_preset_init = typeguardPresets(
        loadSession<AugmentPreset>("augmentPreset"),
        TypeguardAugmentPreset,
    );
    // and use the saved presets as initial values
    const [augPresets, setAugPresets] =
        useState<AugmentPreset[]>(aug_preset_init);
    const updateAugmentPreset = (to_update: AugmentPreset[]) => {
        // updating value on memory and in local storage
        setAugPresets(to_update);
        saveSession<AugmentPreset>("augmentPreset", to_update);
    };
    // -------------------------------------

    // -------------------------------------
    // AUGMENT PRESETS HANDLERS
    // when a new preset is added
    const addAugmentPreset = (new_preset: AugmentPreset) => {
        const { text, options } = addPreset(
            new_preset,
            augPresets,
            updateAugmentPreset,
        );
        enqueueSnackbar(text, options);
    };
    // when a preset is going to be edited
    const editAugmentPreset = (index: number) => {
        const handleEditSave = (edited_preset: AugmentPreset) => {
            closeDialog();
            const { text, options } = editSavePreset(
                edited_preset,
                augPresets,
                index,
                updateAugmentPreset,
=======
    const loaded_aug_pres = loadPresets(
        loadData<AugmentPresetSignature>("augmentPreset"),
        TypeguardAugmentPresetSignature,
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
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
    // when a preset is duplicated
    const duplicateAugmentPreset = (index: number) => {
        let target_preset = Object.create(augPresets[index]);
        let used_name = augPresets.map((preset) => preset.name);
        const validated_name = checkNameAvailability(
            `${target_preset.name}`,
            used_name,
        );
        target_preset.name = validated_name;
        updateAugmentPreset([...augPresets, target_preset]);
        enqueueSnackbar("Preset duplicated.", { variant: "success" });
    };
    // when a preset is deleted
    const deleteAugmentPreset = (index: number) => {
        let preset_removed = Array.from(augPresets);
        preset_removed.splice(index, 1);
        updateAugmentPreset(preset_removed);
        enqueueSnackbar("Preset deleted.", { variant: "success" });
    };
    // when presets is imported to the manager
    const importAugmentPreset = (text_data: string) => {
        const { text, options } = importPreset(
            text_data,
            augPresets,
            updateAugmentPreset,
            TypeguardAugmentPreset,
        );
        enqueueSnackbar(text, options);
    };
    // when a single perset is exported
    const exportAugmentPreset = (index: number) => {
        const target_preset = augPresets[index];
        const blob = new Blob([JSON.stringify([target_preset])], {
            type: "application/json;charset=utf-8",
        });
        saveAs(blob, `${target_preset.name}.json`);
        enqueueSnackbar("Preset exported.", { variant: "success" });
    };
    // when all presets is exported
    const exportAllAugmentPresets = () => {
        const blob = new Blob([JSON.stringify(augPresets)], {
            type: "application/json;charset=utf-8",
        });
        saveAs(blob, "augment presets.json");
        enqueueSnackbar("Presets exported.", { variant: "success" });
    };
=======
>>>>>>> Stashed changes
    // -------------------------------------

    // -------------------------------------
    // LOADOUT PRESET STATES
<<<<<<< Updated upstream
    // // load augment presets saved in local storage
    // const loadout_preset_init = typeguardPresets(
    //     loadSession<LoadoutPreset>("loadoutPreset"),
    //     TypeguardAugmentPreset,
    // );
    // // and use the saved presets as initial values
    const [loadoutPresets, setLoadPresets] = useState<
        LoadoutPreset[]
    >([]);
    // // updating value on memory and in local storage
    const updateLoadoutPresets = (to_update: LoadoutPreset[]) => {
        setLoadPresets(to_update);
        saveSession<LoadoutPreset>("loadoutPreset", to_update);
    };
    // -------------------------------------

    // -------------------------------------
    // LOADOUT PRESETS HANDLERS
    // when a new preset is added
    const addLoadoutPreset = (new_preset: LoadoutPreset) => {
        const { text, options } = addPreset(
            new_preset,
            loadoutPresets,
            updateLoadoutPresets,
=======
    // load augment presets saved in local storage
    const loaded_loadout_pres = loadPresets(
        loadData<LoadoutPresetSignature>("loadoutPreset"),
        TypeguardLoadoutPresetSignature,
        loadoutPresetsFromSignatures,
    );
    // and use the saved presets as initial values
    const [loadoutPresets, setLoadoutPresets] = useState(
        loaded_loadout_pres,
    );
    const [loadoutTab, setLoadoutTab] = useState(0);

    // update value in local storage
    useEffect(() => {
        saveData(
            "loadoutPreset",
            loadoutPresetToSignatures(loadoutPresets),
>>>>>>> Stashed changes
        );
        enqueueSnackbar(text, options);
    };
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
<<<<<<< Updated upstream
                <PaperBackground
                    title="Augment Preset Builder"
                    titleIcon={<Construction fontSize="inherit" />}
                >
                    <AugPresBuilder onPresetSave={addAugmentPreset} />
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
                            importAction={importAugmentPreset}
                            exportAction={exportAllAugmentPresets}
=======
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
                        headerOther={
                            <ImportExportButtons
                                importAction={(data_string) => {
                                    importPreset(
                                        data_string,
                                        setAugPresets,
                                        setSnackbar,
                                        TypeguardAugmentPresetSignature,
                                        augmentPresetFromSignatures,
                                    );
                                }}
                                exportAction={() => {
                                    exportAllPresets(
                                        augPresets,
                                        augmentPresetToSignature,
                                        setSnackbar,
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
>>>>>>> Stashed changes
                        />
                    </PaperBackground>
                </TabCombo>
                <TabCombo
                    value={loadoutTab}
                    onTabChange={setLoadoutTab}
                    labels={["build", "compare", "manage"]}
                >
<<<<<<< Updated upstream
                    <AugPresManager
                        augmentPresets={augPresets}
                        onEdit={editAugmentPreset}
                        onExport={exportAugmentPreset}
                        onDuplicate={duplicateAugmentPreset}
                        onDelete={deleteAugmentPreset}
                    />
                </PaperBackground>
                <PaperBackground
                    title="Loadout Preset Builder"
                    titleIcon={<Construction fontSize="inherit" />}
                >
                    <LoadoutPresBuilder
                        augmentPresets={augPresets}
                        onPresetSave={addLoadoutPreset}
                    />
                </PaperBackground>
                <PaperBackground
                    title="Loadout Preset Compare"
                    titleIcon={<Compare fontSize="inherit" />}
                >
                    <LoadoutPresCompare
                        loadoutPresets={loadoutPresets}
                        augmentPresets={augPresets}
                    />
                </PaperBackground>
                <EditModal
                    open={dialogOpen}
                    onClose={closeDialog}
                    editor={dialogEditor}
                />
=======
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
                        headerOther={
                            <ImportExportButtons
                                importAction={(data_string) => {
                                    importPreset(
                                        data_string,
                                        setLoadoutPresets,
                                        setSnackbar,
                                        TypeguardLoadoutPresetSignature,
                                        loadoutPresetsFromSignatures,
                                    );
                                }}
                                exportAction={() => {
                                    exportAllPresets(
                                        loadoutPresets,
                                        loadoutPresetToSignatures,
                                        setSnackbar,
                                    );
                                }}
                            />
                        }
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
>>>>>>> Stashed changes
            </Stack>
        </ThemeProvider>
    );
};
export default App;
