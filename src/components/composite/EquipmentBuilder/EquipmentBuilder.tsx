import { useState } from "react";

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import useTheme from "@mui/material/styles/useTheme";

import EquipmentPicker, {
    EquipmentPickerMode,
} from "../../basic/EquipmentPicker";
import { AugmentPresetPicker } from "../../basic/PresetPicker";
import AugmentPicker from "../../basic/AugmentPicker";

import {
    EquipmentData,
    AugmentData,
    Equipment,
    AugmentPreset,
} from "../../../types";

interface EquipmentBuilderProps {
    allowEmptyEquipment?: boolean;
    name: string;
    mode: EquipmentPickerMode;
    value: Equipment;
    augmentPresets: AugmentPreset[];
    onEquipmentChange: (value: EquipmentData | null) => void;
    onAugmentsChange: (value: AugmentData[]) => void;
}

const EquipmentBuilder = (props: EquipmentBuilderProps) => {
    const theme = useTheme();
    // -------------------------------------------------
    // states
    const [preset, setPreset] = useState<AugmentPreset | null>(null);
    // -------------------------------------------------

    // -------------------------------------------------
    // handlers
    const handlePresetChange = (preset: AugmentPreset | null) => {
        if (preset) {
            props.onAugmentsChange(preset.augments);
        }
        setPreset(preset);
    };
    const handleAugmentChange = (augments: AugmentData[]) => {
        if (preset) {
            // if the augment picker changes without preset
            // then reset the preset back to null.
            setPreset(null);
        }
        props.onAugmentsChange(augments);
    };
    // -------------------------------------------------

    return (
        <Stack width={1} spacing={1}>
            <Typography
                component="h3"
                sx={{
                    fontSize: theme.typography.h5.fontSize,
                    fontWeight: theme.typography.fontWeightBold,
                    color: theme.palette.primary.main,
                    textTransform: "capitalize",
                }}
            >
                {props.name}
            </Typography>
            <EquipmentPicker
                variant={props.mode}
                value={props.value.equipment}
                onChange={props.onEquipmentChange}
            />
            <AugmentPresetPicker
                presets={props.augmentPresets}
                value={preset}
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
