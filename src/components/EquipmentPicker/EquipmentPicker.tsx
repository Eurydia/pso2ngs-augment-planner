import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

import StyledAutocompleteOption from "../StyledAutocompleteOption";
import { EquipmentData } from "../util";
import { default as W } from "../../assets/data/weapons";
import { default as U } from "../../assets/data/units";

const EquipmentPicker = () => {
    let options: EquipmentData[] = [...W, ...U];

    return (
        <Autocomplete
            fullWidth
            freeSolo
            options={options}
            getOptionLabel={(option) => option.name}
            renderOption={(props: any, option: EquipmentData) => {
                const { name, effs } = option;
                return (
                    <StyledAutocompleteOption
                        s_props={props}
                        name={name}
                        effs={effs}
                        condition=""
                    />
                );
            }}
            groupBy={(option) => option.group}
            renderInput={(params: any) => {
                return (
                    <TextField
                        {...params}
                        variant="filled"
                        // helperText="some result may be hidden."
                        label="Equipment"
                    />
                );
            }}
        />
    );
};

export default EquipmentPicker;
