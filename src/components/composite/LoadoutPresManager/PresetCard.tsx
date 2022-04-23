import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import useTheme from "@mui/material/styles/useTheme";

import { convertToRoman } from "../../util";
import {
    Equipment,
    EquipmentData,
    AugmentData,
} from "../../../types";
import ActionButtons from "../../basic/ActionButtons";
import { Fragment } from "react";

// -------------------------------------------------------
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
        <Fragment>
            <Typography
                sx={{
                    fontSize: theme.typography.body1.fontSize,
                    fontWeight: theme.typography.fontWeightMedium,
                }}
            >
                {eq_name}
            </Typography>
            {aug_displays}
        </Fragment>
    );
};

// Card to display an augment preset
interface PresetCardProps {
    name: string;
    desc: string;
    equipment: Equipment[];
    index: number;
    onEdit: (index: number) => void;
    onExport: (index: number) => void;
    onDuplicate: (index: number) => void;
    onDelete: (index: number) => void;
}
const PresetCard = (props: PresetCardProps) => {
    const theme = useTheme();
    const desc = props.desc ? `"${props.desc}"` : "...";
    const eq_to_display = props.equipment.map((preset, index) => (
        <CardEquipment
            key={`${index}${index}`}
            eq={preset.equipment}
            augments={preset.augments}
        />
    ));
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
                    <Stack sx={{ textTransform: "capitalize" }}>
                        {eq_to_display}
                    </Stack>
                </Stack>
            </CardContent>
        </Card>
    );
};
export default PresetCard;
// -------------------------------------------------------
