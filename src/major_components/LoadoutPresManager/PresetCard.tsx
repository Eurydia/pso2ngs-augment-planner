import React from "react";

import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
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

import { EFFECT_NAME_TRANSLATE, convertToRoman } from "../../util";
import { Equipment, EquipmentData, AugmentData } from "../../types";

// -------------------------------------------------------
/**
 * Icon button macro props
 */
interface IconWithTooltipProps {
    icon: React.ReactElement;
    title: string;
    onClick: () => void;
}
/**
 * Button with icon and tooltip props
 * @param props
 * @returns
 */
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
// ---------------------------------------------
// For rendering augment preset picker's options
interface OptionItemProps {
    eq: EquipmentData | null;
    augments: AugmentData[];
}
const CardEquipment = (props: OptionItemProps) => {
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
interface PresetCardProps {
    header: string;
    desc: string;
    equipment: Equipment[];
    index: number;
    onEdit: (index: number) => void;
    onExport: (index: number) => void;
    onDuplicate: (index: number) => void;
    onDelete: (index: number) => void;
}
// Card to display an augment preset
const PresetCard = (props: PresetCardProps) => {
    const theme = useTheme();
    const eq_to_display = props.equipment.map((preset, index) => (
        <CardEquipment
            key={`${index}${index}`}
            eq={preset.equipment}
            augments={preset.augments}
        />
    ));
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
                        {props.desc ? `"${props.desc}"` : "..."}
                    </Typography>
                    <Grid
                        container
                        columns={{ xs: 1, sm: 2, md: 4 }}
                        sx={{ textTransform: "capitalize" }}
                    >
                        {eq_to_display}
                    </Grid>
                </Stack>
            </CardContent>
        </Card>
    );
};
export default PresetCard;
// -------------------------------------------------------
