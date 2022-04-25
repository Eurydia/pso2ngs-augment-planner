import React, { useState, useEffect } from "react";

import Stack from "@mui/material/Stack";

import Construction from "@mui/icons-material/Construction";
import Compare from "@mui/icons-material/Compare";
import Dashboard from "@mui/icons-material/Dashboard";

import { useSnackbar } from "notistack";

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
    typeGuardAugmentPresetSignature,
    TypeguardLoadoutPresetSignature,
} from "./typeguard";

import TabCombo from "../components/basic/TabCombo";
import PaperBackground from "../components/basic/PaperBackground";
import EditDialog from "../components/basic/EditDialog";
import AugPresBuilder from "../components/composite/AugPresBuilder";
import AugPresCompare from "../components/composite/AugPresCompare";
import AugPresManager from "../components/composite/AugPresManager";
import LoadoutPresBuilder from "../components/composite/LoadoutPresBuilder";
import LoadoutPresCompare from "../components/composite/LoadoutPresCompare";
import LoadoutPresManager from "../components/composite/LoadoutPresManager";

import {
    AugmentPreset,
    AugmentPresetSignature,
    LoadoutPreset,
    LoadoutPresetSignature,
} from "../types";

const App = () => {
    const { enqueueSnackbar } = useSnackbar();

    // -------------------------------------
    // MODAL STATES
    const [dialogEditor, setDialogEditor] =
        useState<React.ReactElement>(
            <React.Fragment></React.Fragment>,
        );
    const [dialogOpen, setDialogOpen] = useState(false);
    // -------------------------------------

    // -------------------------------------
    // AUGMENT PRESET STATES
    // load augment presets saved in local storage
    const aug_pres_from_session = loadPresets(
        loadData<AugmentPresetSignature>("augmentPreset"),
        typeGuardAugmentPresetSignature,
        augmentPresetFromSignatures,
    );
    // and use the loaded presets as initial values
    const [augPresets, setAugPresets] = useState(
        aug_pres_from_session,
    );
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
                enqueueSnackbar,
            );
        };
        const init_preset = augPresets[index];
        const component = (
            <AugPresBuilder
                initPreset={init_preset}
                onSave={handleEditSave}
            />
        );
        setDialogEditor(component);
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
                enqueueSnackbar,
            );
        };
        const init_preset = loadoutPresets[index];
        const component = (
            <LoadoutPresBuilder
                initPreset={init_preset}
                augmentPresets={augPresets}
                onSave={handleEditSave}
            />
        );
        setDialogEditor(component);
        setDialogOpen(true);
    };
    // -------------------------------------

    return (
        <Stack
            spacing={2}
            sx={{
                marginX: "auto",
                maxWidth: "md",
            }}
        >
            <TabCombo
                value={augTab}
                onTabChange={setAugTab}
                labels={[
                    { text: "build", icon: <Construction /> },
                    { text: "compare", icon: <Compare /> },
                    { text: "manage", icon: <Dashboard /> },
                ]}
            >
                <PaperBackground
                    title="Augment Preset Builder"
                    titleIcon={<Construction fontSize="inherit" />}
                >
                    <AugPresBuilder
                        onSave={(new_preset) => {
                            addPreset(
                                new_preset,
                                setAugPresets,
                                enqueueSnackbar,
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
                                enqueueSnackbar,
                            );
                        }}
                        onDuplicate={(index) =>
                            duplicatePreset(
                                index,
                                setAugPresets,
                                enqueueSnackbar,
                            )
                        }
                        onDelete={(index) =>
                            deletePreset(
                                index,
                                setAugPresets,
                                enqueueSnackbar,
                            )
                        }
                        onImport={(data) =>
                            importPreset(
                                data,
                                setAugPresets,
                                enqueueSnackbar,
                                typeGuardAugmentPresetSignature,
                                augmentPresetFromSignatures,
                            )
                        }
                        onExportAll={() =>
                            exportAllPresets(
                                augPresets,
                                augmentPresetToSignature,
                                enqueueSnackbar,
                            )
                        }
                    />
                </PaperBackground>
            </TabCombo>
            <TabCombo
                value={loadoutTab}
                onTabChange={setLoadoutTab}
                labels={[
                    { text: "build", icon: <Construction /> },
                    { text: "compare", icon: <Compare /> },
                    { text: "manage", icon: <Dashboard /> },
                ]}
            >
                <PaperBackground
                    title="Loadout Preset Builder"
                    titleIcon={<Construction fontSize="inherit" />}
                >
                    <LoadoutPresBuilder
                        augmentPresets={augPresets}
                        onSave={(new_preset) => {
                            addPreset(
                                new_preset,
                                setLoadoutPresets,
                                enqueueSnackbar,
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
                        loadoutPresets={loadoutPresets}
                        onEdit={editLoadoutPreset}
                        onExport={(index) =>
                            exportPreset(
                                loadoutPresets[index],
                                loadoutPresetToSignatures,
                                enqueueSnackbar,
                            )
                        }
                        onDuplicate={(index) =>
                            duplicatePreset(
                                index,
                                setLoadoutPresets,
                                enqueueSnackbar,
                            )
                        }
                        onDelete={(index) =>
                            deletePreset(
                                index,
                                setLoadoutPresets,
                                enqueueSnackbar,
                            )
                        }
                        onImport={(data) =>
                            importPreset(
                                data,
                                setLoadoutPresets,
                                enqueueSnackbar,
                                TypeguardLoadoutPresetSignature,
                                loadoutPresetsFromSignatures,
                            )
                        }
                        onExportAll={() =>
                            exportAllPresets(
                                loadoutPresets,
                                loadoutPresetToSignatures,
                                enqueueSnackbar,
                            )
                        }
                    />
                </PaperBackground>
            </TabCombo>
            <EditDialog
                open={dialogOpen}
                onClose={() => setDialogOpen(false)}
            >
                {dialogEditor}
            </EditDialog>
        </Stack>
    );
};
export default App;
