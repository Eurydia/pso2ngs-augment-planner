import Box from "@mui/material/Box";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

import EquipmentPicker from "../EquipmentPicker";
import AugmentPicker from "../AugmentPicker";

const EquipmentBuilder = () => {
    return (
        <Box>
            <EquipmentPicker />
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
