import Box from "@mui/material/Box";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";

import AugmentPicker from "../AugmentPicker";

const EquipmentBuilder = () => {
    return (
        <Box>
            <Select />
            <Autocomplete
                renderInput={(params: any) => {
                    return (
                        <TextField
                            {...params}
                            label="Augment presets"
                        ></TextField>
                    );
                }}
                options={[]}
            />
            <AugmentPicker onChange={() => {}} />
        </Box>
    );
};
export default EquipmentBuilder;
