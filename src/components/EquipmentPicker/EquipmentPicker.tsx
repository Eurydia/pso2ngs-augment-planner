import Autocomplete from "@mui/material/Autocomplete";

import { default as UNITS } from "../../assets/data/units";
import { default as WEAPONS } from "../../assets/data/weapons";
import { EquipmentData } from "../../assets/data/types";

interface EquipmentPickerProps {
    weapons?: boolean;
    armors?: boolean;
}

const EquipmentPicker = (props: EquipmentPickerProps) => {
    let options: EquipmentData[] = [];
    if (props.weapons !== undefined) {
        options = WEAPONS;
    }
    if (props.armors !== undefined) {
        options = [...UNITS];
    }

    return (
        <Autocomplete
            freeSolo
            getOptionLabel={(option) => option.name}
            options={options}
        />
    );
};

export default EquipmentPicker;
