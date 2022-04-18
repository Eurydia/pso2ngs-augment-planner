import { useState, memo } from "react";

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import useTheme from "@mui/material/styles/useTheme";

import { collectAugmentsFromPreset } from "./helper";

import EquipmentPicker, {
    EquipmentPickerMode,
} from "../../components/EquipmentPicker";
import { AugmentPresetPicker } from "../../components/PresetPicker";
import AugmentPicker from "../../components/AugmentPicker";

import {
    EquipmentData,
    AugmentPreset,
    AugmentData,
    EquipmentWithAugments,
} from "../../types";

interface EquipmentBuilderProps {
    header: string;
    mode: EquipmentPickerMode;
    augmentPresets: AugmentPreset[];
    value: EquipmentWithAugments;
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
            const augments = collectAugmentsFromPreset(preset);
            props.onAugmentsChange(augments);
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
    const disabled =
        props.value.equipment === null && !props.allowEmptyEquipment;

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
                {props.header}
            </Typography>
            <EquipmentPicker
                variant={props.mode}
                value={props.value.equipment}
                onChange={props.onEquipmentChange}
            />
            <AugmentPresetPicker
                presets={props.augmentPresets}
                disabled={disabled}
                value={augPreset}
                onChange={handlePresetChange}
            />
            <AugmentPicker
                disabled={disabled}
                values={props.value.augments}
                onChange={handleAugmentChange}
            />
        </Stack>
    );
};

const shouldEquipmentBuilderNOTRerender = (
    prev: EquipmentBuilderProps,
    next: EquipmentBuilderProps,
) => {
    const p_e = prev.value.equipment;
    const n_e = next.value.equipment;
    if (p_e?.name !== n_e?.name) {
        return false;
    }

    const p_a = prev.value.augments;
    const n_a = next.value.augments;
    if (p_a.length !== n_a.length) {
        return false;
    }
    for (let i = 0; i < p_a.length; i++) {
        const p_a_a = p_a[i];
        const n_a_a = n_a[i];
        if (
            p_a_a.name !== n_a_a.name ||
            p_a_a.level !== n_a_a.level
        ) {
            return false;
        }
    }

    return true;
};

export default memo(
    EquipmentBuilder,
    shouldEquipmentBuilderNOTRerender,
);
