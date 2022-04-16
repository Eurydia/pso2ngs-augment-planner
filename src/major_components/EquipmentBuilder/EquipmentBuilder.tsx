import { useState } from "react";

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import useTheme from "@mui/material/styles/useTheme";

import { collectAugments } from "./helper";
import EquipmentPicker, {
    EquipmentPickerVariant,
} from "../../components/EquipmentPicker";
import AugmentPresetPicker from "../../components/AugmentPresetPicker";
import AugmentPicker from "../../components/AugmentPicker";
import {
    EquipmentData,
    AugmentPreset,
    AugmentData,
} from "../../types";

interface EquipmentBuilderProps {
    header?: string;
    variant: EquipmentPickerVariant;
    allowEmptyEquipment: boolean;
    augPresets: AugmentPreset[];
    equipmentValue: EquipmentData | null;
    augsValues: AugmentData[];
    onEquipmentChange: (value: EquipmentData | null) => void;
    onAugsChange: (value: AugmentData[]) => void;
}

const EquipmentBuilder = (props: EquipmentBuilderProps) => {
    const theme = useTheme();
    // -----------------------------
    // prepare state
    const [augPresVal, setAugPresVal] =
        useState<AugmentPreset | null>(null);
    // -----------------------------

    // -----------------------------
    // handlers
    const handlePresetChange = (preset: AugmentPreset | null) => {
        if (preset) {
            const augments = collectAugments(preset);
            props.onAugsChange(augments);
        }
        setAugPresVal(preset);
    };

    const handleAugmentChange = (values: AugmentData[]) => {
        if (augPresVal) {
            setAugPresVal(null);
        }
        props.onAugsChange(values);
    };
    // -----------------------------

    // if no equipment is selected, then augment picker
    // and augment preset pick should be disable.
    // However, this is ignored if the allowEmptyEquipment flag is true
    const disabled =
        props.equipmentValue === null && !props.allowEmptyEquipment;

    return (
        <Stack width={1} spacing={1}>
            <Typography
                component="h3"
                sx={{
                    fontSize: theme.typography.h5.fontSize,
                    fontWeight: theme.typography.fontWeightBold,
                    color: theme.palette.primary.main,
                }}
            >
                {props.header || ""}
            </Typography>
            <EquipmentPicker
                variant={props.variant}
                value={props.equipmentValue}
                onChange={props.onEquipmentChange}
            />
            <AugmentPresetPicker
                presets={props.augPresets}
                disabled={disabled}
                value={augPresVal}
                onChange={handlePresetChange}
            />
            <AugmentPicker
                disabled={disabled}
                values={props.augsValues}
                onChange={handleAugmentChange}
            />
        </Stack>
    );
};

export default EquipmentBuilder;
