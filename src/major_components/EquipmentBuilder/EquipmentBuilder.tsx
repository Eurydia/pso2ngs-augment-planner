import { useState } from "react";

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import useTheme from "@mui/material/styles/useTheme";

import EquipmentPicker, {
    EquipmentPickerMode,
} from "../../components/EquipmentPicker";
import { AugmentPresetPicker } from "../../components/PresetPicker";
import AugmentPicker from "../../components/AugmentPicker";

import {
    EquipmentData,
    AugmentPreset,
    AugmentData,
    Equipment,
} from "../../types";

interface EquipmentBuilderProps {
    header: string;
    mode: EquipmentPickerMode;
    augmentPresets: AugmentPreset[];
    value: Equipment;
    onEquipmentChange: (value: EquipmentData | null) => void;
    onAugmentsChange: (value: AugmentData[]) => void;
    allowEmptyEquipment?: boolean;
}

const EquipmentBuilder = (props: EquipmentBuilderProps) => {
    const theme = useTheme();
    // -------------------------------------------------
    // states
    const [augPreset, setAugPreset] = useState<AugmentPreset | null>(
        null,
    );
    // -------------------------------------------------

    // -------------------------------------------------
    // handlers
    const handlePresetChange = (preset: AugmentPreset | null) => {
        if (preset) {
            handleAugmentChange(preset.augments);
        }
        setAugPreset(preset);
    };
    const handleAugmentChange = (augemnts: AugmentData[]) => {
        // when a change is made to the augment
        // reset the augment preset to null
        if (augPreset !== null) {
            setAugPreset(null);
        }
        props.onAugmentsChange(augemnts);
    };
    // -------------------------------------------------

    // if no equipment is selected, then augment picker
    // and augment preset pick should be disable.
    // However, this is ignored if the allowEmptyEquipment flag is true
    return (
        <Stack width={1} spacing={1}>
            <Typography
                component="h3"
                sx={{
                    fontSize: theme.typography.h6.fontSize,
                    fontWeight: theme.typography.fontWeightMedium,
                    color: theme.palette.primary.main,
                    textTransform: "capitalize",
                }}
            >
                {props.header}
            </Typography>
            <EquipmentPicker
                variant={props.mode}
                value={props.value.equipment}
                onChange={props.onEquipmentChange}
            />
            <AugmentPresetPicker
                presets={props.augmentPresets}
                value={
                    props.value.augments.length === 0
                        ? null
                        : augPreset
                }
                onChange={handlePresetChange}
            />
            <AugmentPicker
                values={props.value.augments}
                onChange={handleAugmentChange}
            />
        </Stack>
    );
};
export default EquipmentBuilder;
// const shouldEquipmentBuilderNOTRerender = (
//     prev: EquipmentBuilderProps,
//     next: EquipmentBuilderProps,
// ) => {
//     const p = prev.value;
//     const n = next.value;
//     if (p.equipment?.name !== n.equipment?.name) {
//         return false;
//     }
//     const p_augs = p.augments;
//     const n_augs = n.augments;
//     if (p_augs.length !== n_augs.length) {
//         return false;
//     }
//     for (let i = 0; i < p_augs.length; i++) {
//         const p_a_a = p_augs[i];
//         const n_a_a = n_augs[i];
//         if (
//             p_a_a.name !== n_a_a.name ||
//             p_a_a.level !== n_a_a.level
//         ) {
//             return false;
//         }
//     }
//     return true;
// };

// export default memo(
//     EquipmentBuilder,
//     shouldEquipmentBuilderNOTRerender,
// );
