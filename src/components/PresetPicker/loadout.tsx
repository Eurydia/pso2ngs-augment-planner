import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import useTheme from "@mui/material/styles/useTheme";
import { FilterOptionsState, Theme } from "@mui/material";

import { matchSorter } from "match-sorter";

import StyledAutoCompleteOption from "../StyledAutocompleteOption";
import { convertToRoman, EFFECT_NAME_TRANSLATE } from "../../util";
import {
    AugmentData,
    EquipmentData,
    LoadoutPreset,
} from "../../types";
import React from "react";

// ---------------------------------------------
// For rendering augment preset picker's options
interface OptionProps {
    preset: LoadoutPreset;
}
const Option = (props: OptionProps) => {
    const theme = useTheme();

    // let eq_displays: JSX.Element[] = [];
    // let index = 0;
    // for (const eq of props.preset.equipment) {
    //     index++;
    //     if (!eq.equipment && eq.augments.length === 0) {
    //         continue;
    //     }
    //     let augment_displays: JSX.Element[] = [];
    //     for (const aug of eq.augments) {
    //         let emojis = "";
    //         // for (const eff of aug.effs) {
    //         //     const { emoji } = EFFECT_NAME_TRANSLATE[eff.eff];
    //         //     emojis = emojis.concat(emoji);
    //         // }
    //         augment_displays.push(
    //             <Typography key={`${aug.name}-${aug.level}`}>
    //                 {`${emojis} ${aug.name} ${convertToRoman(
    //                     aug.level,
    //                 )}`.trim()}
    //             </Typography>,
    //         );
    //     }
    //     eq_displays.push(
    //         <Grid
    //             key={`${index}${index}`}
    //             item
    //             xs={1}
    //             sx={{
    //                 paddingX: 1,
    //                 textTransform: "capitalize",
    //             }}
    //         >
    //             <Typography
    //                 sx={{
    //                     fontSize: theme.typography.body2.fontSize,
    //                     fontWeight: theme.typography.fontWeightMedium,
    //                 }}
    //             >
    //                 {eq.equipment
    //                     ? eq.equipment.name
    //                     : "[equipment not selected]"}
    //             </Typography>
    //             <Stack
    //                 sx={{
    //                     paddingLeft: 1,
    //                     fontSize: theme.typography.body2.fontSize,
    //                 }}
    //             >
    //                 {augment_displays.length !== 0
    //                     ? augment_displays
    //                     : "[augment not selected]"}
    //             </Stack>
    //         </Grid>,
    //     );
    // }
    // return (
    //     <Stack>
    //         <Typography
    //             sx={{
    //                 fontSize: theme.typography.body1.fontSize,
    //                 fontWeight: theme.typography.fontWeightMedium,
    //             }}
    //         >
    //             {props.preset.name}
    //         </Typography>
    //         <Grid
    //             container
    //             columns={{ xs: 1, sm: 2, md: 4 }}
    //             columnSpacing={2}
    //             rowSpacing={1}
    //         >
    //             {eq_displays}
    //         </Grid>
    //     </Stack>
    // );
};

export const renderOption = (props: any, option: LoadoutPreset) => {
    return (
        <Box {...props}>
            {option.name}
            {/* <Option preset={option} /> */}
        </Box>
    );
};
// ---------------------------------------------

// ---------------------------------------------
// Users can search using
// preset name
// augment name in preset
// augment level in preset
// terms are seperated at evert `+` symbol
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
                keys: ["name"],
            }),
        options,
    );
    return found;
};
// ---------------------------------------------
