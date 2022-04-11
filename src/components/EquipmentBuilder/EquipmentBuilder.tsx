import { useState } from "react";

import Box from "@mui/material/Box";

import EquipmentPicker from "../EquipmentPicker";
import AugmentPicker from "../AugmentPicker";
import AugmentPresetPicker, {
    AugmentPreset,
} from "../AugmentPresetPicker";
import { AugmentData, EquipmentData } from "../util";

interface EquipmentBuilderProps {
    weapons: boolean;
    armors: boolean;
    augmentPresets: AugmentPreset[];
    allowEquipmentEmpty: boolean;
    onChange: (values: (AugmentData | EquipmentData)[]) => void;
}

const EquipmentBuilder = (props: EquipmentBuilderProps) => {
    const [augment, setAugment] = useState<AugmentData[]>([]);
    const [equipment, setEquipment] = useState<EquipmentData | null>(null);
    const [preset, setPreset] = useState<AugmentPreset | null>(null);

    const disabled = equipment === null || props.allowEquipmentEmpty;

    const handleEquipmentChange = (value: EquipmentData | null) => {
        setEquipment(value);
        handleChange();
    };

    const handleAugmentChange = (values: AugmentData[]) => {
        setAugment(values);
        handleChange();
    };

    const handleAugmentPresetChange = (value: AugmentPreset | null) => {
        setPreset(value);
        if (value) {
            setAugment(value.augments);
        }
        handleChange();
    };

    const handleChange = () => {
        let values: (AugmentData | EquipmentData)[] = [];
        if (equipment) {
            values = [equipment];
        }
        if (!disabled) {
            values = [...values, ...augment];
        }
        props.onChange(values);
    };

    return (
        <Box width={1}>
            <EquipmentPicker
                weapons={props.weapons}
                armors={props.armors}
                value={equipment}
                onChange={handleEquipmentChange}
            />
            <AugmentPresetPicker
                value={preset}
                disabled={disabled}
                onChange={handleAugmentPresetChange}
                presets={props.augmentPresets}
            />
            <AugmentPicker
                values={augment}
                disabled={disabled}
                onChange={handleAugmentChange}
            />
        </Box>
    );
};
export default EquipmentBuilder;
