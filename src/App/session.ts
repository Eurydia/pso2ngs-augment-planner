// ---------------------------------
// setting and retrieving data from local storage
type AugmentKey = "augmentPreset";
type LoadoutKey = "loadoutPreset";

/**
 * Retrieve and parse preset data from local storage.
 * Returns empty array if there's not data to retrieve or
 * the data failed the array check.
 * @warning Presets are not sanitized.
 * @param key
 * @returns
 */
export const loadData = <T>(key: AugmentKey | LoadoutKey): T[] => {
    const unparsed_value = localStorage.getItem(key);
    if (unparsed_value === null) {
        return [];
    }
    const uncheck_presets = JSON.parse(unparsed_value);
    // check if the uncheck is an array or not
    // before iterating over
    if (!Array.isArray(uncheck_presets)) {
        return [];
    }
    return uncheck_presets;
};
/**
 * Parse and save preset `signatures` to local storage.
 * @param key
 * @param signatures
 */
export const saveData = <Signature>(
    key: AugmentKey | LoadoutKey,
    signatures: Signature[],
) => {
    const json_data = JSON.stringify(signatures);
    localStorage.setItem(key, json_data);
};
// ---------------------------------

// ---------------------------------
/**
 * Macro for checking unsanitized presets.
 * Use in conjunction with `loadData`
 * to sanitize the presets.
 * @param uncheck_signatures unsanitzied preset signatures.
 * @param typeguard_checker runtime type gaurd to perform on the signatures.
 * @param preset_rebuilder function to convert signatures into their preset form.
 * @returns
 */
export const loadPresets = <Signature, Preset>(
    uncheck_signatures: Signature[],
    typeguard_checker: (obj: any) => boolean,
    preset_rebuilder: (obj: Signature[]) => Preset[],
) => {
    let checked_sigs: Signature[] = [];
    for (const uncheck_sig of uncheck_signatures) {
        const is_good = typeguard_checker(uncheck_sig);
        if (is_good) {
            checked_sigs.push(uncheck_sig);
        }
    }
    return preset_rebuilder(checked_sigs);
};
// ---------------------------------
