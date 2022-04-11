import { useState } from "react";

import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Drawer from "@mui/material/Drawer";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import createTheme from "@mui/material/styles/createTheme";

import AugmentBuilder from "./components/AugmentPresetBuilder";
import EquipmentBuilder from "./components/EquipmentBuilder";
import { AugmentPreset } from "./components/AugmentPresetPicker";
// import LoadoutBuilder from "./components/T04LoadoutPresetBuilder";
import { AugmentData } from "./components/util";

const theme = createTheme();

const App = () => {
    const [augments, setAugments] = useState<AugmentPreset[]>([]);
    // const [loadouts, setLoadouts] = useState<LoadoutPresetSignature[]>([]);

    const saveAugmentPreset = (augment_preset: AugmentPreset) => {
        const new_presets = [...augments, augment_preset];
        setAugments(new_presets);
    };

    return (
        <ThemeProvider theme={theme}>
            <Drawer
                variant="persistent"
                anchor="left"
                sx={{
                    width: 1,
                }}
            >
                <Typography fontSize={theme.typography.h5.fontSize}>
                    Augment Preset Builder
                </Typography>
            </Drawer>
            <Container maxWidth="md">
                <Box>
                    <Typography fontSize={theme.typography.h5.fontSize}>
                        Augment Preset Builder
                    </Typography>
                    <AugmentBuilder onPresetSave={saveAugmentPreset} />
                </Box>
                <EquipmentBuilder
                    weapons={true}
                    armors={false}
                    augmentPresets={augments}
                    allowEquipmentEmpty={false}
                    onChange={console.log}
                />
            </Container>
        </ThemeProvider>
    );
};
export default App;
