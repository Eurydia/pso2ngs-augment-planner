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
    // unpacking props
    const { variant, allowEmptyEquipment, augPresets } = props;
    const { equipmentValue, augsValues } = props;
    // -----------------------------

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
    const disabled = equipmentValue === null && !allowEmptyEquipment;
    return (
        <Stack width={1} spacing={1}>
            <Typography fontSize={theme.typography.h6.fontSize}>
                {props.header || ""}
            </Typography>
            <EquipmentPicker
                variant={variant}
                value={equipmentValue}
                onChange={props.onEquipmentChange}
            />
            <AugmentPresetPicker
                presets={augPresets}
                disabled={disabled}
                value={augPresVal}
                onChange={handlePresetChange}
            />
            <AugmentPicker
                disabled={disabled}
                values={augsValues}
                onChange={handleAugmentChange}
            />
        </Stack>
    );
};

export default EquipmentBuilder;
