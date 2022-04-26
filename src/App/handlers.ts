import { Dispatch, SetStateAction } from "react";

import { saveAs } from "file-saver";

import { sanitizePresetSignatures } from "./session";
import {
    OptionsObject,
    SnackbarKey,
    SnackbarMessage,
} from "notistack";

// ---------------------------------
/**
 * The app relies on the fact that preset names are unique.
 * This function makes sure names are diffrent
 * by adding index if the name would be a duplicate.
 * @param name the base name which
 * @param used_name names taken
 * @returns
 */
const getValidName = (name: string, used_name: string[]) => {
    const name_seen = new Set(used_name);
    let temp_name = name.concat("");
    let counter = 1;
    while (name_seen.has(temp_name)) {
        temp_name = `${name} (${counter})`;
        counter++;
    }
    return temp_name;
};
// ---------------------------------

// -------------------------------------
// Preset macros
/**
 * When a new preset would be added to preset array,
 * check its name and add it to the end.
 * @param new_preset
 * @param presetSetter
 * @param enqueue_snackbar
 */
export const addPreset = <Preset extends { name: string }>(
    new_preset: Preset,
    presetSetter: Dispatch<SetStateAction<Preset[]>>,
    enqueue_snackbar: (
        text: SnackbarMessage,
        options: OptionsObject,
    ) => SnackbarKey,
) => {
    presetSetter((prev) => {
        const used_name = prev.map((preset) => preset.name);
        const valid_name = getValidName(
            new_preset.name.normalize().trim(),
            used_name,
        );
        let updated = [...prev];
        updated.push({ ...new_preset, name: valid_name });
        return updated;
    });
    enqueue_snackbar("Preset saved 👍.", {
        variant: "success",
    });
};

/**
 * When an existing preset is duplicated,
 * rename and add it to the end of preset array.
 * @param index index to duplicate
 * @param presetSetter
 * @param enqueue_snackbar
 */
export const duplicatePreset = <Preset extends { name: string }>(
    index: number,
    presetSetter: Dispatch<SetStateAction<Preset[]>>,
    enqueue_snackbar: (
        text: SnackbarMessage,
        options: OptionsObject,
    ) => SnackbarKey,
) => {
    presetSetter((prev) => {
        const preset = prev[index];
        const used_name = prev.map((preset) => preset.name);
        const valid_name = getValidName(preset.name, used_name);

        let updated = [...prev];
        updated.push({ ...preset, name: valid_name });
        return updated;
    });
    enqueue_snackbar("Preset duplicated.", { variant: "success" });
};
/**
 * When an existing augment is removed,
 * splice it from the preset array.
 * @param index
 * @param presetSetter
 * @param enqueue_snackbar
 */
export const deletePreset = <Preset extends { name: string }>(
    index: number,
    presetSetter: Dispatch<SetStateAction<Preset[]>>,
    enqueue_snackbar: (
        text: SnackbarMessage,
        options: OptionsObject,
    ) => SnackbarKey,
) => {
    presetSetter((prev) => {
        let updated = [...prev];
        updated.splice(index, 1);
        return updated;
    });
    enqueue_snackbar("Preset deleted.", { variant: "success" });
};
/**
 * When an existing preset is edited,
 * make sure the name isn't taken.
 * @param index
 * @param edited_preset
 * @param presetSetter
 * @param enqueue_snackbar
 */
export const editPreset = <Preset extends { name: string }>(
    index: number,
    edited_preset: Preset,
    presetSetter: Dispatch<SetStateAction<Preset[]>>,
    enqueue_snackbar: (
        text: SnackbarMessage,
        options: OptionsObject,
    ) => SnackbarKey,
) => {
    presetSetter((prev) => {
        let used_name = prev.map((pres) => pres.name);
        // remove current name from used name
        used_name.splice(index, 1);
        const valid_name = getValidName(
            edited_preset.name,
            used_name,
        );
        let updated = [...prev];
        updated[index].name = valid_name;
        return updated;
    });
    enqueue_snackbar("Preset saved 👍.", { variant: "success" });
};
/**
 * When preset array is imported.
 * @param text_data
 * @param presetSetter
 * @param enqueue_snackbar
 * @param typeGuard
 * @param presetsFromSignatures
 * @returns
 */
export const importPreset = <
    Signature extends { name: string },
    Preset extends { name: string },
>(
    text_data: string,
    presetSetter: Dispatch<SetStateAction<Preset[]>>,
    enqueue_snackbar: (
        text: SnackbarMessage,
        options: OptionsObject,
    ) => SnackbarKey,
    typeGuard: (obj: any) => boolean,
    presetsFromSignatures: (obj: Signature[]) => Preset[],
) => {
    // if text data isn't an array,
    // then don't proceed any further.
    const json_data = JSON.parse(text_data);
    if (!Array.isArray(json_data)) {
        enqueue_snackbar("Import failed.", {
            variant: "error",
        });
        return;
    }
    const sanitized_signatures: Signature[] =
        sanitizePresetSignatures(json_data, typeGuard);
    const presets = presetsFromSignatures(sanitized_signatures);
    // add sanitized presets to preset array
    // all at once.
    presetSetter((prev) => {
        let updated = [...prev];
        for (const preset of presets) {
            const used_name = updated.map((preset) => preset.name);
            const valid_name = getValidName(preset.name, used_name);
            updated.push({ ...preset, name: valid_name });
        }
        return updated;
    });
    // for snackbar
    enqueue_snackbar("Preset(s) imported.", { variant: "success" });
};
/**
 * When a preset is exported,
 * convert it to signature and use `file-saver` to download.
 * @param preset
 * @param presetsToSignatures
 * @param enqueue_snackbar
 */
export const exportPreset = <
    Signature,
    Preset extends { name: string },
>(
    preset: Preset,
    presetsToSignatures: (presets: Preset[]) => Signature[],
    enqueue_snackbar: (
        text: SnackbarMessage,
        options: OptionsObject,
    ) => SnackbarKey,
) => {
    const signatures = presetsToSignatures([preset]);
    const blob = new Blob([JSON.stringify(signatures)], {
        type: "application/json;charset=utf-8",
    });
    saveAs(blob, `preset.json`);
    enqueue_snackbar("Preset exported.", {
        variant: "success",
    });
};
/**
 * Same as export one but takes an array of presets instead.
 * @param presets
 * @param presetsToSignatures
 * @param enqueue_snackbar
 */
export const exportAllPresets = <
    Signature,
    Preset extends { name: string },
>(
    presets: Preset[],
    presetsToSignatures: (presets: Preset[]) => Signature[],
    enqueue_snackbar: (
        text: SnackbarMessage,
        options: OptionsObject,
    ) => SnackbarKey,
) => {
    const signatures = presetsToSignatures(presets);
    const blob = new Blob([JSON.stringify(signatures)], {
        type: "application/json;charset=utf-8",
    });
    saveAs(blob, "presets.json");
    enqueue_snackbar("All presets exported.", {
        variant: "success",
    });
};
// -------------------------------------
