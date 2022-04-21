import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import useTheme from "@mui/material/styles/useTheme";
import { FilterOptionsState } from "@mui/material";

import { matchSorter } from "match-sorter";

import { convertToRoman } from "../../util";
import {
    AugmentData,
    EquipmentData,
    LoadoutPreset,
} from "../../types";

// ---------------------------------------------
/**
 * Display equipment and augments on the option.
 */
interface OptionItemProps {
    eq: EquipmentData | null;
    augments: AugmentData[];
}
const OptionItem = (props: OptionItemProps) => {
    const theme = useTheme();
    const eq_name = props.eq
        ? props.eq.name
        : "[equipment not selected]";
    let augments: JSX.Element[] = [];
    for (const aug of props.augments) {
        const roman_level = convertToRoman(aug.level);
        const name = `${aug.name} ${roman_level}`.trim();
        augments.push(<Typography key={name}>{name}</Typography>);
    }
    const aug_displays =
        augments.length !== 0 ? augments : "[augment not selected]";
    return (
        <Grid
            item
            xs={1}
            sx={{
                padding: 1,
                paddingLeft: 2,
                fontSize: theme.typography.body1.fontSize,
            }}
        >
            <Typography
                sx={{
                    fontSize: theme.typography.body1.fontSize,
                    fontWeight: theme.typography.fontWeightMedium,
                }}
            >
                {eq_name}
            </Typography>
            {aug_displays}
        </Grid>
    );
};

/**
 * Option on dropdown menu
 */
interface OptionProps {
    preset: LoadoutPreset;
}
const Option = (props: OptionProps) => {
    const theme = useTheme();

    let eq_displays: JSX.Element[] = [];
    let index = 0;
    for (const eq of props.preset.equipment) {
        index++;
        const key = `${index}${index}`;
        eq_displays.push(
            <OptionItem
                key={key}
                eq={eq.equipment}
                augments={eq.augments}
            />,
        );
    }
    return (
        <Stack>
            <Typography
                sx={{
                    fontSize: theme.typography.h6.fontSize,
                    fontWeight: theme.typography.fontWeightMedium,
                }}
            >
                {props.preset.name}
            </Typography>
            <Grid
                container
                columns={{ xs: 1, sm: 2, md: 4 }}
                sx={{
                    textTransform: "capitalize",
                    justifyContent: "space-between",
                }}
            >
                {eq_displays}
            </Grid>
        </Stack>
    );
};

export const renderOption = (props: any, option: LoadoutPreset) => {
    return (
        <Box {...props}>
            <Option preset={option} />
        </Box>
    );
};
// ---------------------------------------------

// ---------------------------------------------
/**
 * Allow fuzzy search by
 * Preset name,
 * Equipment names,
 * Augment names,
 * Augment level
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
                    "equipment.*.augments.*.name",
                    "equipment.*.augments.*.level",
                ],
            }),
        options,
    );
    return found;
};
// ---------------------------------------------
