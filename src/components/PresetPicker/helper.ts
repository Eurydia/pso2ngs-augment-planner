// ---------------------------------------------
/**
 * Match the name with a preset
 * @param value
 * @param presets
 * @returns
 */
export const matchPreset = <T extends { name: string }>(
    value: string,
    presets: T[],
) => {
    const v = value.normalize();
    for (const preset of presets) {
        if (preset.name.normalize() === v) {
            return preset;
        }
    }
    return null;
};
// ---------------------------------------------
