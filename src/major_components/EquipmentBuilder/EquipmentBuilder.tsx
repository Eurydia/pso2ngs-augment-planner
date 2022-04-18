import { useState, useEffect, memo } from "react";

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
import { propsIsEqual } from "../../util";

interface EquipmentBuilderProps {
    allowEmptyEquipment?: boolean;
    header: string;
    mode: EquipmentPickerMode;
    augmentPresets: AugmentPreset[];
    initEquipment?: EquipmentData | null;
    initAugments?: AugmentData[];
    onChange: (value: EquipmentWithAugments) => void;
}

const EquipmentBuilder = (props: EquipmentBuilderProps) => {
    const theme = useTheme();
    // -----------------------------
    // prapare initial states
    const initial_equipment = props.initEquipment
        ? props.initEquipment
        : null;
    const initial_augments = props.initAugments
        ? props.initAugments
        : [];
    // -----------------------------

    // -----------------------------
    // prepare state
    const [equipment, setEquipment] = useState<EquipmentData | null>(
        initial_equipment,
    );
    const [augments, setAugments] =
        useState<AugmentData[]>(initial_augments);
    const [augPreset, setAugPreset] = useState<AugmentPreset | null>(
        null,
    );
    // -----------------------------

    // -----------------------------
    // handlers
    useEffect(() => {
        const value = {
            equipment,
            augments,
        };
        props.onChange(value);
    }, [equipment, augments, props]);

    const handleEquipmentChange = (
        equipment: EquipmentData | null,
    ) => {
        setEquipment(equipment);
    };
    const handleAugmentChange = (augments: AugmentData[]) => {
        // reset selected preset if augment chages
        if (augPreset && augPreset !== null) {
            setAugPreset(null);
        }
        setAugments(augments);
    };
    const handlePresetChange = (preset: AugmentPreset | null) => {
        setAugPreset(preset);
        if (preset) {
            const augments = collectAugmentsFromPreset(preset);
            handleAugmentChange(augments);
        }
    };

    // -----------------------------

    // if no equipment is selected, then augment picker
    // and augment preset pick should be disable.
    // However, this is ignored if the allowEmptyEquipment flag is true
    const disabled =
        props.initEquipment === null && !props.allowEmptyEquipment;

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
                {props.header}
            </Typography>
            <EquipmentPicker
                variant={props.mode}
                value={equipment}
                onChange={handleEquipmentChange}
            />
            <AugmentPresetPicker
                presets={props.augmentPresets}
                disabled={disabled}
                value={augPreset}
                onChange={handlePresetChange}
            />
            <AugmentPicker
                disabled={disabled}
                values={augments}
                onChange={handleAugmentChange}
            />
        </Stack>
    );
};

export default memo(EquipmentBuilder, propsIsEqual);
