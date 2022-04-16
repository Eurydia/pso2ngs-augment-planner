import React from "react";

import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import useTheme from "@mui/material/styles/useTheme";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

import Edit from "@mui/icons-material/Edit";
import CopyAll from "@mui/icons-material/CopyAll";
import Delete from "@mui/icons-material/Delete";
import Download from "@mui/icons-material/Download";

import blue from "@mui/material/colors/blue";
import pink from "@mui/material/colors/pink";

import {
    augmentFromSignature,
    EFFECT_NAME_TRANSLATE,
    convertToRoman,
} from "../../util";
import { AugmentSignature } from "../../types";

// -------------------------------------------------------
// icon with tool tip macro
interface IconWithTooltipProps {
    icon: React.ReactElement;
    title: string;
    onClick: () => void;
}

const IconWithTooltip = (props: IconWithTooltipProps) => {
    return (
        <Tooltip title={props.title}>
            <IconButton size="medium" onClick={props.onClick}>
                {props.icon}
            </IconButton>
        </Tooltip>
    );
};
// -------------------------------------------------------

// -------------------------------------------------------
// prepare string with augment name and icons to represent its effects
const prepareAugmentDisplay = (augments: AugmentSignature[]) => {
    let to_display: JSX.Element[] = [];
    for (const augment of augments) {
        const full_augment = augmentFromSignature(augment);
        if (full_augment === null) {
            continue;
        }

        let emojis = "";
        for (const eff of full_augment.effs) {
            const { emoji } = EFFECT_NAME_TRANSLATE[eff.eff];
            emojis = emojis.concat(emoji);
        }
        const roman_level = convertToRoman(augment.level);
        const name = `${augment.name} ${roman_level}`.trim();

        const display = (
            <Typography key={name}>{`${emojis} ${name}`}</Typography>
        );
        to_display.push(display);
    }
    return to_display;
};

interface CustomCardProps {
    header: string;
    desc: string;
    augments: AugmentSignature[];
    index: number;
    onEdit: (index: number) => void;
    onExport: (index: number) => void;
    onDuplicate: (index: number) => void;
    onDelete: (index: number) => void;
}
// Card to display an augment preset
export const CustomCard = (props: CustomCardProps) => {
    const theme = useTheme();

    const augment_to_display = prepareAugmentDisplay(props.augments);

    const button_sx = {
        color: theme.palette.primary.light,
    };
    return (
        <Card raised>
            <CardActions>
                <IconWithTooltip
                    onClick={() => props.onEdit(props.index)}
                    title="Edit"
                    icon={<Edit sx={button_sx} />}
                />
                <IconWithTooltip
                    onClick={() => props.onDuplicate(props.index)}
                    title="Duplicate"
                    icon={<CopyAll sx={button_sx} />}
                />
                <IconWithTooltip
                    onClick={() => props.onExport(props.index)}
                    title="Save"
                    icon={<Download sx={button_sx} />}
                />
                <IconWithTooltip
                    onClick={() => props.onDelete(props.index)}
                    title="Delete"
                    icon={
                        <Delete
                            sx={{
                                color: theme.palette.secondary.main,
                            }}
                        />
                    }
                />
            </CardActions>
            <CardContent>
                <Stack spacing={2} sx={{ wordWrap: "break-word" }}>
                    <Typography
                        fontSize={theme.typography.h6.fontSize}
                        fontWeight={theme.typography.fontWeightBold}
                        color={theme.palette.primary.main}
                    >
                        {props.header}
                    </Typography>
                    <Typography fontStyle="italic">
                        {props.desc ? `"${props.desc}"` : ""}
                    </Typography>
                    <Stack textTransform="capitalize">
                        {augment_to_display}
                    </Stack>
                </Stack>
            </CardContent>
        </Card>
    );
};
// -------------------------------------------------------
