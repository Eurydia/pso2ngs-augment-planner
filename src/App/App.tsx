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
    checkNameAvailability,
    saveSession,
    loadSession,
    typeguardPresets,
    addPreset,
    editSavePreset,
    importPreset,
} from "./helper_functions";
import {
    PaperBackground,
    ImportExportButtons,
    EditDialog as EditModal,
} from "./helper_components";

import AugPresBuilder from "../major_components/AugPresBuilder";
import AugPresCompare from "../major_components/AugPresCompare";
import AugPresManager from "../major_components/AugPresManager";
import LoPresBuilder from "../major_components/LoPresBuilder";

import {
    AugmentPreset,
    LoadoutPreset,
    TypeguardAugmentPreset,
} from "../types";

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
    // -------------------------------------

    // -------------------------------------
    // LOADOUT PRESET STATES
    // // load augment presets saved in local storage
    // const loadout_preset_init = typeguardPresets(
    //     loadSession<LoadoutPreset>("loadoutPreset"),
    //     TypeguardAugmentPreset,
    // );
    // // and use the saved presets as initial values
    const [loPresets, setLoPresets] = useState<LoadoutPreset[]>([]);
    // // updating value on memory and in local storage
    const updateLoadoutPresets = (to_update: LoadoutPreset[]) => {
        setLoPresets(to_update);
        saveSession<LoadoutPreset>("loadoutPreset", to_update);
    };
    // -------------------------------------

    // -------------------------------------
    // LOADOUT PRESETS HANDLERS
    // when a new preset is added
    const addLoadoutPreset = (new_preset: LoadoutPreset) => {
        const { text, options } = addPreset(
            new_preset,
            loPresets,
            updateLoadoutPresets,
        );
        enqueueSnackbar(text, options);
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
                        />
                    }
                >
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
                    <LoPresBuilder
                        augmentPresets={augPresets}
                        onPresetSave={addLoadoutPreset}
                    />
                </PaperBackground>
                <EditModal
                    open={dialogOpen}
                    onClose={closeDialog}
                    editor={dialogEditor}
                />
            </Stack>
        </ThemeProvider>
    );
};
export default App;
