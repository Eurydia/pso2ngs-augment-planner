// ---------------------------------
// Checking if preset name is available
export const checkNameAvailability = (
    name: string,
    used_name: string[],
) => {
    let temp_name = name;
    let counter = 1;
    const name_seen = new Set(used_name);
    while (name_seen.has(temp_name)) {
        temp_name = `${name} (${counter})`;
        counter++;
    }
    return temp_name;
};
// ---------------------------------

// ---------------------------------
// macro for checking preests
export const typeguardPresets = <T,>(
    uncheck_presets: T[],
    typeguard_checker: (obj: any) => boolean,
) => {
    let checked_presets: T[] = [];
    for (const uncheck_preset of uncheck_presets) {
        const is_good = typeguard_checker(uncheck_preset);
        if (is_good) {
            checked_presets.push(uncheck_preset);
        }
    }
    return checked_presets;
};
// ---------------------------------

// ---------------------------------
// Loading and saving from local storage
type AugmentKey = "augmentPreset";
type LoadoutKey = "loadoutPreset";

export const loadSession = <T,>(
    key: AugmentKey | LoadoutKey,
    // typeguard_checker: (obj: any) => boolean,
): T[] => {
    const unparsed_value = localStorage.getItem(key);
    if (unparsed_value === null) {
        return [];
    }
    const uncheck_preset_arr = JSON.parse(unparsed_value);
    // check if the uncheck is an array or not
    // before iterating over
    if (!Array.isArray(uncheck_preset_arr)) {
        return [];
    }
    return uncheck_preset_arr;
};

export const saveSession = <T,>(
    key: AugmentKey | LoadoutKey,
    value: T[],
) => {
    const json_value = JSON.stringify(value);
    localStorage.setItem(key, json_value);
};
// ---------------------------------

// -------------------------------------
// Preset macros
// when new augment is added via the builder
export const addPreset = <T extends { name: string }>(
    new_preset: T,
    existing_presets: T[],
    action: (values: T[]) => void,
) => {
    const new_preset_name = new_preset.name.normalize().trim();
    new_preset.name = new_preset_name;
    const used_name = existing_presets.map((preset) => preset.name);
    const validated_name = checkNameAvailability(
        new_preset.name,
        used_name,
    );
    new_preset.name = validated_name;
    action([...existing_presets, new_preset]);

    let text: string;
    let options: { variant: "warning" | "success" };
    if (validated_name !== new_preset_name) {
        text = `Your preset was saved as "${validated_name}".`;
        options = { variant: "warning" };
    } else {
        text = "Preset saved 👍.";
        options = { variant: "success" };
    }
    return { text, options };
};

// when an augment is selected for editing
export const editSavePreset = <T extends { name: string }>(
    edited_preset: T,
    existing_presets: T[],
    index: number,
    action: (values: T[]) => void,
) => {
    let used_name = existing_presets.map((preset) => preset.name);
    used_name.splice(index, 1);
    const validated_name = checkNameAvailability(
        edited_preset.name.trim(),
        used_name,
    );
    edited_preset.name = validated_name;

    let updated_preset = Array.from(existing_presets);
    updated_preset[index] = edited_preset;
    action(updated_preset);

    let text: string;
    let options: { variant: "warning" | "success" };
    if (validated_name !== edited_preset.name) {
        text = `Your preset was saved as "${validated_name}".`;
        options = { variant: "warning" };
    } else {
        text = "Preset saved 👍.";
        options = {
            variant: "success",
        };
    }
    return { text, options };
};

export const importPreset = <T extends { name: string }>(
    text_data: string,
    existing_presets: T[],
    action: (values: T[]) => void,
    typeguard_checker: (obj: any) => boolean,
) => {
    const uncheck_presets = JSON.parse(text_data);
    let text: string;
    let options: { variant: "error" | "success" };
    if (Array.isArray(uncheck_presets)) {
        const checked_presets: T[] = typeguardPresets(
            uncheck_presets,
            typeguard_checker,
        );

        let updated_presets = Array.from(existing_presets);
        const setPresets = (values: T[]) =>
            (updated_presets = values);
        for (const checked of checked_presets) {
            addPreset<T>(checked, updated_presets, (values) =>
                setPresets(values),
            );
        }
        action(updated_presets);
        text = "Preset imported.";
        options = {
            variant: "success",
        };
    } else {
        text = "Import failed.";
        options = {
            variant: "error",
        };
    }
    return { text, options };
};
// -------------------------------------
