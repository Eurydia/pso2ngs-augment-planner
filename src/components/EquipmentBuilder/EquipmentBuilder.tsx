import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { Box } from "@mui/material";
import useTheme from "@mui/material/styles/useTheme";

import EquipmentPicker from "../EquipmentPicker";
import AugmentPicker from "../AugmentPicker";

interface EquipmentBuilderProps {
    weapons: boolean;
    armors: boolean;
}

const EquipmentBuilder = (props: EquipmentBuilderProps) => {
    const theme = useTheme();

    return (
        <Box padding={2}>
            <EquipmentPicker
                weapons={props.weapons}
                armors={props.armors}
            />
            {/* <Autocomplete
                renderInput={(params: any) => {
                    return (
                        <TextField
                            {...params}
                            variant="filled"
                            label="Augment presets"
                        />
                    );
                }}
                options={[]}
            /> */}
            <AugmentPicker onChange={() => {}} />
        </Box>
    );
};
export default EquipmentBuilder;
