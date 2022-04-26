import React, { useState, useEffect } from "react";

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

import Construction from "@mui/icons-material/Construction";
import Compare from "@mui/icons-material/Compare";
import Dashboard from "@mui/icons-material/Dashboard";
import InfoOutlined from "@mui/icons-material/InfoOutlined";

import { useSnackbar } from "notistack";

import {
    setPresetData,
    getPresetData,
    sanitizePresetSignatures,
} from "./session";
import {
    augmentPresetsFromSignatures,
    loadoutPresetsFromSignatures,
    loadoutPresetsToSignatures,
    augmentPresetsToSignatures,
} from "./conversion";
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

const tab_labels = [
    { text: "build", icon: <Construction /> },
    { text: "compare", icon: <Compare /> },
    { text: "manage", icon: <Dashboard /> },
];

const App = () => {
    const { enqueueSnackbar } = useSnackbar();

    // -------------------------------------
    const [dialogEditor, setDialogEditor] =
        useState<React.ReactElement>(
            <React.Fragment></React.Fragment>,
        );
    const [dialogOpen, setDialogOpen] = useState(false);
    // -------------------------------------

    // -------------------------------------
    // load and sanitized preset signatures from
    // local storage.
    const aug_pres_sigs = sanitizePresetSignatures(
        getPresetData<AugmentPresetSignature>("augmentPreset"),
        typeGuardAugmentPresetSignature,
    );
    // build presets from signatures and use them
    // as initial state.
    const init_aug_pres = augmentPresetsFromSignatures(aug_pres_sigs);
    const [augPresets, setAugPresets] = useState(init_aug_pres);
    const [augTab, setAugTab] = useState(0);
    // when a change is made to preset array
    // update local storage.
    useEffect(() => {
        setPresetData(
            "augmentPreset",
            augmentPresetsToSignatures(augPresets),
        );
    }, [augPresets]);
    // -------------------------------------

    // -------------------------------------
    const loadout_pres_sigs = sanitizePresetSignatures(
        getPresetData<LoadoutPresetSignature>("loadoutPreset"),
        TypeguardLoadoutPresetSignature,
    );
    const init_loadout_pres =
        loadoutPresetsFromSignatures(loadout_pres_sigs);
    const [loadoutPresets, setLoadoutPresets] =
        useState(init_loadout_pres);
    const [loadoutTab, setLoadoutTab] = useState(0);
    useEffect(() => {
        setPresetData(
            "loadoutPreset",
            loadoutPresetsToSignatures(loadoutPresets),
        );
    }, [loadoutPresets]);
    // -------------------------------------

    // -------------------------------------
    const editAugmentPreset = (index: number) => {
        const preset_to_edit = augPresets[index];
        const component = (
            <AugPresBuilder
                initPreset={preset_to_edit}
                onSave={(edited_preset: AugmentPreset) => {
                    setDialogOpen(false);
                    editPreset(
                        index,
                        edited_preset,
                        setAugPresets,
                        enqueueSnackbar,
                    );
                }}
            />
        );
        setDialogEditor(component);
        setDialogOpen(true);
    };
    // -------------------------------------

    // -------------------------------------
    const editLoadoutPreset = (index: number) => {
        const preset_to_edit = loadoutPresets[index];
        const component = (
            <LoadoutPresBuilder
                initPreset={preset_to_edit}
                augmentPresets={augPresets}
                onSave={(edited_preset: LoadoutPreset) => {
                    setDialogOpen(false);
                    editPreset(
                        index,
                        edited_preset,
                        setLoadoutPresets,
                        enqueueSnackbar,
                    );
                }}
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
                labels={tab_labels}
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
                                augmentPresetsToSignatures,
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
                                augmentPresetsFromSignatures,
                            )
                        }
                        onExportAll={() =>
                            exportAllPresets(
                                augPresets,
                                augmentPresetsToSignatures,
                                enqueueSnackbar,
                            )
                        }
                    />
                </PaperBackground>
            </TabCombo>
            <TabCombo
                value={loadoutTab}
                onTabChange={setLoadoutTab}
                labels={tab_labels}
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
                                loadoutPresetsToSignatures,
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
                                loadoutPresetsToSignatures,
                                enqueueSnackbar,
                            )
                        }
                    />
                </PaperBackground>
            </TabCombo>
            <PaperBackground
                title="about"
                titleIcon={<InfoOutlined fontSize="inherit" />}
            >
                <Typography>
                    Check out more information about this project
                    <Link
                        variant="body1"
                        target="_blank"
                        rel="noopener"
                        href="https://meteor-danger-942.notion.site/PSO2NGS-Augment-Planner-116ef1dba12245279d1e00133b1bfa35"
                        sx={{ paddingX: 1 }}
                    >
                        {">here<"}
                    </Link>
                    .
                </Typography>
            </PaperBackground>
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
