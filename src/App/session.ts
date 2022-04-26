type AugmentKey = "augmentPreset";
type LoadoutKey = "loadoutPreset";
// ---------------------------------
/**
 * Retrieve and parse preset data from local storage.
 *
 * Returns empty array if there's not data to retrieve or
 * the data failed the array check.
 * @warning Presets are not sanitized.
 * @param key
 * @returns
 */
export const getPresetData = <PresetSignature>(
    key: AugmentKey | LoadoutKey,
): PresetSignature[] => {
    const data_string = localStorage.getItem(key);
    if (data_string === null) {
        return [];
    }
    const parsed_string = JSON.parse(data_string);
    if (!Array.isArray(parsed_string)) {
        return [];
    }
    return parsed_string;
};
/**
 * Parse and save `PresetSignature`s to local storage.
 * @param key
 * @param signatures
 */
export const setPresetData = <PresetSignature>(
    key: AugmentKey | LoadoutKey,
    signatures: PresetSignature[],
) => {
    // TODO: This function in particular is called quite often.
    // Everytime there's a change to the preset array to be exact.
    // It's probably a good idea to implement a better system
    // for saving data to local without using the `stringify` method.
    const string_data = JSON.stringify(signatures);
    localStorage.setItem(key, string_data);
};
// ---------------------------------

// ---------------------------------
/**
 * Sanitize preset signautures.
 * @param type_guard .
 * @returns
 */
export const sanitizePresetSignatures = <Signature>(
    uncheck_signatures: Signature[],
    type_guard: (obj: any) => boolean,
) => {
    let checked_signatures: Signature[] = [];
    for (const uncheck_sig of uncheck_signatures) {
        const is_good = type_guard(uncheck_sig);
        if (is_good) {
            checked_signatures.push(uncheck_sig);
        }
    }
    return checked_signatures;
};
// ---------------------------------
