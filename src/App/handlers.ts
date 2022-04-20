import { saveAs } from "file-saver";

import { checkNameAvailability } from "./helper";
import { loadPresets } from "./save_and_load";

// -------------------------------------
// Preset macros
// when new augment is added via the builder
export const addPreset = <Preset extends { name: string }>(
    preset: Preset,
    setter: React.Dispatch<React.SetStateAction<Preset[]>>,
) => {
    let new_name = "";
    setter((prev) => {
        const used_name = prev.map((preset) => preset.name);
        const validated_name = checkNameAvailability(
            preset.name.normalize().trim(),
            used_name,
        );
        new_name = validated_name;
        return [...prev, { ...preset, name: validated_name }];
    });

    // for snackbar
    let text: string;
    let options: { variant: "warning" | "success" };
    if (new_name !== preset.name) {
        text = `Your preset was saved as "${new_name}".`;
        options = { variant: "warning" };
    } else {
        text = "Preset saved 👍.";
        options = { variant: "success" };
    }
    return { text, options };
};

// when an augment is selected for editing
export const editPreset = <Preset extends { name: string }>(
    index: number,
    edited_preset: Preset,
    setter: React.Dispatch<React.SetStateAction<Preset[]>>,
) => {
    let new_name = "";
    setter((prev) => {
        let used_name = prev.map((pres) => pres.name);
        // remove current name from used name
        used_name.splice(index, 1);
        const validated_name = checkNameAvailability(
            edited_preset.name.trim(),
            used_name,
        );
        new_name = validated_name;
        let updated = [...prev];
        updated[index].name = validated_name;
        return updated;
    });

    // for snackbar
    let text: string;
    let options: { variant: "warning" | "success" };
    if (new_name !== edited_preset.name) {
        text = `Your preset was saved as "${new_name}".`;
        options = { variant: "warning" };
    } else {
        text = "Preset saved 👍.";
        options = {
            variant: "success",
        };
    }
    return { text, options };
};

export const importPreset = <
    Signature extends { name: string },
    Preset extends { name: string },
>(
    text_data: string,
    setter: React.Dispatch<React.SetStateAction<Preset[]>>,
    typeguard_checker: (obj: any) => boolean,
    preset_retriever: (obj: Signature[]) => Preset[],
) => {
    const uncheck_presets = JSON.parse(text_data);
    let text: string = "Import failed.";
    let options: { variant: "error" | "success" } = {
        variant: "error",
    };
    // perform check first before any else
    if (!Array.isArray(uncheck_presets)) {
        return { text, options };
    }

    const checked_presets: Preset[] = loadPresets(
        uncheck_presets,
        typeguard_checker,
        preset_retriever,
    );

    for (const preset of checked_presets) {
        addPreset(preset, setter);
    }
    // for snackbar
    text = "Preset imported.";
    options = {
        variant: "success",
    };
    return { text, options };
};
// when one preset is exported
export const exportPreset = <
    Signature,
    Preset extends { name: string },
>(
    preset: Preset,
    signature_retriever: (presets: Preset[]) => Signature[],
) => {
    const signatures = signature_retriever([preset]);
    const blob = new Blob([JSON.stringify(signatures)], {
        type: "application/json;charset=utf-8",
    });
    saveAs(blob, `${preset.name}.json`);
};
// when all presets is exported
export const exportAllPresets = <
    Signature,
    Preset extends { name: string },
>(
    presets: Preset[],
    signature_retriever: (presets: Preset[]) => Signature[],
) => {
    const signatures = signature_retriever(presets);
    const blob = new Blob([JSON.stringify(signatures)], {
        type: "application/json;charset=utf-8",
    });
    saveAs(blob, "augment presets.json");
};
// -------------------------------------
