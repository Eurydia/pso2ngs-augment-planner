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
    uploadPreset,
} from "./helper_functions";
import {
    PaperBackground,
    ImportExportButtons,
    EditModal,
} from "./helper_components";
import AugPresBuilder from "../major_components/AugPresBuilder/AugPresBuilder";
import AugPresCompare from "../major_components/AugPresCompare/AugPresCompare";
import AugPresManager from "../major_components/AugPresManager";
import { AugmentPreset, TypeguardAugmentPreset } from "../types";

const App = () => {
    const theme = useTheme();
    const { enqueueSnackbar } = useSnackbar();

    // -------------------------------------
    // MODAL STATES
    const [modalEditor, setModalEditor] =
        useState<React.ReactElement>(
            <React.Fragment></React.Fragment>,
        );
    const [modalOpen, setModalOpen] = useState(false);
    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);
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
            closeModal();
            const { text, options } = editSavePreset(
                edited_preset,
                augPresets,
                index,
                updateAugmentPreset,
            );
            enqueueSnackbar(text, options);
        };
        const target_preset = augPresets[index];
        const editor = (
            <AugPresBuilder
                initPreset={target_preset}
                onPresetSave={handleEditSave}
            />
        );
        setModalEditor(editor);
        openModal();
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
        const { text, options } = uploadPreset(
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
                <EditModal
                    open={modalOpen}
                    onClose={closeModal}
                    editor={modalEditor}
                />
            </Stack>
        </ThemeProvider>
    );
};
export default App;
