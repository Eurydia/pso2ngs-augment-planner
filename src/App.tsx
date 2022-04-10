import Container from "@mui/material/Container";

import { ThemeProvider, createTheme } from "@mui/material/styles";

import AugmentBuilder from "./components/T02AugmentPresetBuilder";
import LoadoutBuilder from "./components/T04LoadoutPresetBuilder";

const theme = createTheme();

function App() {
    return (
        <ThemeProvider theme={theme}>
            <Container maxWidth="md">
                <AugmentBuilder />
                <LoadoutBuilder />
            </Container>
        </ThemeProvider>
    );
}

export default App;
