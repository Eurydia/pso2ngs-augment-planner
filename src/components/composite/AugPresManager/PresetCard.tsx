import React from "react";

import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import useTheme from "@mui/material/styles/useTheme";

import ActionButtons from "../../basic/ActionButtons";

import { EFFECT_NAME_TRANSLATE, convertToRoman } from "../../util";
import { AugmentData } from "../../../types";

// -------------------------------------------------------
// prepare string with augment name and icons to represent its effects
const prepareAugmentString = (augments: AugmentData[]) => {
    let displays: string[] = [];
    for (const aug of augments) {
        const roman_level = convertToRoman(aug.level);
        const name = `${aug.name} ${roman_level}`.trim();

        let emojis = "";
        for (const eff of aug.effs) {
            const { emoji } = EFFECT_NAME_TRANSLATE[eff.eff];
            emojis = emojis.concat(emoji);
        }
        displays.push(`${emojis} ${name}`);
    }
    return displays;
};
const getAugmentTypo = (augment: AugmentData[]) => {
    let aug_string = ["[augment not selected]"];
    if (augment.length > 0) {
        aug_string = prepareAugmentString(augment);
    }

    return aug_string.map((aug_str, index) => (
        <Typography key={`${index}${index}`}>{aug_str}</Typography>
    ));
};

// -------------------------------------------------------

// -------------------------------------------------------
// Card to display an augment preset
interface PresetCardProps {
    name: string;
    desc: string;
    augments: AugmentData[];
    index: number;
    onEdit: (index: number) => void;
    onExport: (index: number) => void;
    onDuplicate: (index: number) => void;
    onDelete: (index: number) => void;
}
const PresetCard = (props: PresetCardProps) => {
    const theme = useTheme();

    const desc = props.desc ? `"${props.desc}"` : "...";
    const augs = getAugmentTypo(props.augments);
    return (
        <Card raised>
            <CardActions>
                <ActionButtons
                    onEdit={() => props.onEdit(props.index)}
                    onDuplicate={() => props.onDuplicate(props.index)}
                    onExport={() => props.onExport(props.index)}
                    onDelete={() => props.onDelete(props.index)}
                />
            </CardActions>
            <CardContent>
                <Stack spacing={2} sx={{ wordWrap: "break-word" }}>
                    <Typography
                        fontSize={theme.typography.h6.fontSize}
                        fontWeight={theme.typography.fontWeightBold}
                        color={theme.palette.primary.main}
                    >
                        {props.name}
                    </Typography>
                    <Typography fontStyle="italic">{desc}</Typography>
                    <Stack textTransform="capitalize">{augs}</Stack>
                </Stack>
            </CardContent>
        </Card>
    );
};
export default PresetCard;
