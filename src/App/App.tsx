import React, { useState } from "react";

import Stack from "@mui/material/Stack";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import useTheme from "@mui/material/styles/useTheme";

import Construction from "@mui/icons-material/Construction";
import Compare from "@mui/icons-material/Compare";
import Dashboard from "@mui/icons-material/Dashboard";
import { default as main_theme } from "./theme";

import { useSnackbar } from "notistack";
import { saveAs } from "file-saver";

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
import AugPresBuilder from "../major_components/AugPresBuilder";
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
    const addAugmentPreset = (new_preset: AugmentPreset) => {
        const { text, options } = addPreset(
            new_preset,
            augPresets,
            updateAugmentPreset,
        );
        enqueueSnackbar(text, options);
    };

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

    const deleteAugmentPreset = (index: number) => {
        let preset_removed = Array.from(augPresets);
        preset_removed.splice(index, 1);
        updateAugmentPreset(preset_removed);
        enqueueSnackbar("Preset deleted.", { variant: "success" });
    };

    const importAugmentPreset = (text_data: string) => {
        const { text, options } = uploadPreset(
            text_data,
            augPresets,
            updateAugmentPreset,
            TypeguardAugmentPreset,
        );
        enqueueSnackbar(text, options);
    };

    const exportAugmentPreset = (index: number) => {
        const target_preset = augPresets[index];
        const blob = new Blob([JSON.stringify([target_preset])], {
            type: "application/json;charset=utf-8",
        });
        saveAs(blob, `${target_preset.name}.json`);
        enqueueSnackbar("Preset exported.", { variant: "success" });
    };

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
                    header="Augment Preset Builder"
                    icon={<Construction fontSize="inherit" />}
                    feature={
                        <AugPresBuilder
                            onPresetSave={addAugmentPreset}
                        />
                    }
                />
                <PaperBackground
                    header="Augment Preset Comparison"
                    icon={<Compare fontSize="inherit" />}
                    feature={
                        <AugPresCompare augmentPresets={augPresets} />
                    }
                />
                <PaperBackground
                    header="Augment Preset Manager"
                    icon={<Dashboard fontSize="inherit" />}
                    feature={
                        <React.Fragment>
                            <ImportExportButtons
                                importAction={importAugmentPreset}
                                exportAction={exportAllAugmentPresets}
                            />
                            <AugPresManager
                                augmentPresets={augPresets}
                                onEdit={editAugmentPreset}
                                onSave={exportAugmentPreset}
                                onDuplicate={duplicateAugmentPreset}
                                onDelete={deleteAugmentPreset}
                            />
                        </React.Fragment>
                    }
                />
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
