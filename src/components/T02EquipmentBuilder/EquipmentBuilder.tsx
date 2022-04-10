import { Box } from "@mui/material";
import useTheme from "@mui/material/styles/useTheme";

import EquipmentPicker from "../T01EquipmentPicker";
import AugmentPicker from "../T01AugmentPicker";

interface EquipmentBuilderProps {
    weapons: boolean;
    armors: boolean;
}

const EquipmentBuilder = (props: EquipmentBuilderProps) => {
    const theme = useTheme();

    return (
        <Box width={1}>
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
