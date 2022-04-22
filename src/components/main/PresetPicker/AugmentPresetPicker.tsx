import Box from "@mui/material/Box";
import { FilterOptionsState } from "@mui/material";

import { matchSorter } from "match-sorter";

import BasePresetPicker from "./BasePresetPicker";

import PickerOption from "../PickerOption";

import { convertToRoman, EFFECT_NAME_TRANSLATE } from "../../util";
import { AugmentPreset } from "../../../types";

// ---------------------------------------------
/**
 * For rendering options on dropdown menu
 * @param props
 * @param option
 * @returns
 */
export const renderOption = (props: any, option: AugmentPreset) => {
    let subheaders: string[] = [];
    for (const aug of option.augments) {
        const roman_lvl = convertToRoman(aug.level);
        const parsed_name = `${aug.name} ${roman_lvl}`.trim();

        let emojis: string = "";
        for (const eff of aug.effs) {
            const { emoji } = EFFECT_NAME_TRANSLATE[eff.eff];
            emojis = emojis.concat(emoji);
        }
        subheaders.push(`${emojis} ${parsed_name}`);
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
 * Augment name,
 * Augment level.
 * @param options
 * @param state
 * @returns
 */
export const filterOptions = (
    options: AugmentPreset[],
    state: FilterOptionsState<AugmentPreset>,
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
                keys: ["name", "augments.*.level", "augments.*.name"],
            }),
        options,
    );
    return found;
};
// ---------------------------------------------

// ---------------------------------------------
interface AugmentPresetPickerProps {
    value: AugmentPreset;
    presets: AugmentPreset[];
    onChange: (value: AugmentPreset | null) => void;
}
const AugmentPresetPicker = (props: AugmentPresetPickerProps) => {
    return (
        <BasePresetPicker
            value={props.value}
            presets={props.presets}
            onChange={props.onChange}
            // static
            label="Augment preset picker"
            renderOption={renderOption}
            filterOptions={filterOptions}
        />
    );
};
export default AugmentPresetPicker;
// ---------------------------------------------
