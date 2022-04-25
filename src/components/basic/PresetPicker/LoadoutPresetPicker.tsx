import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import useTheme from "@mui/material/styles/useTheme";
import { FilterOptionsState } from "@mui/material";

import { matchSorter } from "match-sorter";

import BasePresetPicker from "./BasePresetPicker";

import { convertToRoman } from "../../util";
import { LoadoutPreset } from "../../../types";

// ---------------------------------------------
interface EquipmentOptionProps {
    equipment: string;
    augments: string[];
}
const EquipnentOption = (props: EquipmentOptionProps) => {
    const theme = useTheme();
    const aug_displays = props.augments.join(" & ");
    return (
        <Stack
            sx={{
                paddingLeft: 1.2,
                textTransform: "capitalize",
            }}
        >
            <Typography
                sx={{
                    fontSize: theme.typography.body1.fontSize,
                    fontWeight: theme.typography.fontWeightMedium,
                }}
            >
                {props.equipment}
            </Typography>
            <Typography
                sx={{
                    paddingLeft: 1.5,
                    wordWrap: "break-word",
                    wordBreak: "keep-all",
                }}
            >
                {aug_displays}
            </Typography>
        </Stack>
    );
};

/**
 * For rendering options on dropdown menu
 * @param props
 * @param option
 * @returns
 */
export const renderOption = (props: any, option: LoadoutPreset) => {
    let equipment: JSX.Element[] = [];
    let i = 0;
    for (const eq of option.equipment) {
        const eq_name = eq.equipment
            ? eq.equipment.name
            : "[Equipment not selected]";

        let aug_names: string[] = [];
        for (const aug of eq.augments) {
            const roman_lvl = convertToRoman(aug.level);
            const name = `${aug.name} ${roman_lvl}`.trim();
            aug_names.push(name);
        }
        equipment.push(
            <EquipnentOption
                key={`#${i}`}
                equipment={eq_name}
                augments={aug_names}
            />,
        );
        i++;
    }
    return (
        <Box {...props}>
            <Stack
                sx={{
                    alignItems: "flex-start",
                    justifyContent: "flex-start",
                }}
            >
                <Typography
                    sx={{
                        fontWeight: "medium",
                    }}
                >
                    {option.name}
                </Typography>
                {equipment}
            </Stack>
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
