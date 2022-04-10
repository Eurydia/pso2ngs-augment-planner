import React, { useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { capitalize } from "@mui/material";

import StyledAutocompleteOption from "../StyledAutocompleteOption";
import { default as WEAPONS } from "../../assets/data/weapons";
import { default as UNITS } from "../../assets/data/units";
import { EquipmentData } from "../util";

interface EquipmentPickerProps {
    weapons: boolean;
    armors: boolean;
    // onChange: Function;
}

const EquipmentPicker = (props: EquipmentPickerProps) => {
    const initial_value = null;
    const [value, setValue] = useState<EquipmentData | null>(
        initial_value,
    );

    let label = "";
    let placeholder = "";
    let options: EquipmentData[] = [];
    if (props.weapons) {
        label = "Weapons";
        placeholder = "No weapon selected";
        options = WEAPONS;
    } else if (props.armors) {
        label = "Units";
        placeholder = "No unit selected";
        options = UNITS;
    } else {
        label = "Equipment";
        placeholder = "No equipment selected";
        options = [...WEAPONS, ...UNITS];
    }

    const handleChange = (
        e: React.SyntheticEvent,
        v: string,
        r: string,
    ) => {
        let match_found: EquipmentData | null = initial_value;
        for (let i = 0; i < options.length; i++) {
            const { name } = options[i];
            if (v.toLocaleLowerCase() === name) {
                match_found = options[i];
                break;
            }
        }
        setValue(match_found);
    };

    return (
        <Autocomplete
            fullWidth
            filterSelectedOptions
            value={value}
            options={options}
            groupBy={(option) => option.group}
            getOptionLabel={(option) => option.name}
            onInputChange={handleChange}
            renderOption={(props: any, option: EquipmentData) => {
                const { name, effs } = option;
                return (
                    <StyledAutocompleteOption
                        s_props={props}
                        name={name}
                        effs={effs}
                        condition=""
                        key={name}
                    />
                );
            }}
            renderInput={(params: any) => {
                return (
                    <TextField
                        {...params}
                        inputProps={{
                            ...params.inputProps,
                            style: {
                                textTransform: "capitalize",
                            },
                        }}
                        variant="filled"
                        // helperText="some result may be hidden."
                        label={label}
                        placeholder={placeholder}
                    />
                );
            }}
        />
    );
};
export default EquipmentPicker;
