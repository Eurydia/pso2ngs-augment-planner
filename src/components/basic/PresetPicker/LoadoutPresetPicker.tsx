import Box from "@mui/material/Box";
import { FilterOptionsState } from "@mui/material";

import { matchSorter } from "match-sorter";

import BasePresetPicker from "./BasePresetPicker";

import PickerOption from "../PickerOption";

import { convertToRoman, EFFECT_NAME_TRANSLATE } from "../../util";
import { LoadoutPreset } from "../../../types";

// ---------------------------------------------
/**
 * For rendering options on dropdown menu
 * @param props
 * @param option
 * @returns
 */
export const renderOption = (props: any, option: LoadoutPreset) => {
    let subheaders: string[] = [];
    for (const eq of option.equipment) {
        let eq_name = "[Equipment not selected]";
        if (eq.equipment) {
            eq_name = eq.equipment.name;
        }
        subheaders.push(eq_name);

        let aug_names: string[] = [];
        for (const aug of eq.augments) {
            const roman_lvl = convertToRoman(aug.level);
            const parsed_name = `${aug.name} ${roman_lvl}`.trim();

            let emojis: string = "";
            for (const eff of aug.effs) {
                const { emoji } = EFFECT_NAME_TRANSLATE[eff.eff];
                emojis = emojis.concat(emoji);
            }
            aug_names.push(`>>${emojis} ${parsed_name}`);
        }
        subheaders = subheaders.concat(aug_names.join(" "));
    }
    return (
        <Box {...props}>
            <PickerOption
                key={option.name}
                header={option.name}
                subheaders={subheaders}
            />
        </Box>
    );
};
// ---------------------------------------------

// ---------------------------------------------
/**
 * Allow fuzzy search using
 * Preset name,
 * Equipment name
 * Augment name,
 * Augment level.
 * @param options
 * @param state
 * @returns
 */
export const filterOptions = (
    options: LoadoutPreset[],
    state: FilterOptionsState<LoadoutPreset>,
) => {
    const value = state.inputValue.normalize();
    if (!value || !value.length) {
        return options;
    }
    const terms = state.inputValue
        .split("+")
        .map((term) => term.trim())
        .filter((term) => Boolean(term));
    if (!terms) {
        return options;
    }
    const found = terms.reduceRight(
        (res, term) =>
            matchSorter(res, term, {
                keys: [
                    "name",
                    "equipment.*.equipment.name",
                    "equipment.*.augments.*.level",
                    "equipment.*.augments.*.name",
                ],
            }),
        options,
    );
    return found;
};
// ---------------------------------------------

// ---------------------------------------------
interface AugmentPresetPickerProps {
    value: LoadoutPreset | null;
    presets: LoadoutPreset[];
    onChange: (value: LoadoutPreset | null) => void;
}
const AugmentPresetPicker = (props: AugmentPresetPickerProps) => {
    return (
        <BasePresetPicker
            value={props.value}
            presets={props.presets}
            onChange={props.onChange}
            // static
            label="Loadout preset picker"
            renderOption={renderOption}
            filterOptions={filterOptions}
        />
    );
};
export default AugmentPresetPicker;
// ---------------------------------------------
