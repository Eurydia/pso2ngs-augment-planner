import Container from "@mui/material/Container";
import Accordian from "@mui/material/Accordion";
import AccordianSummary from "@mui/material/AccordionSummary";
import AccordianDetails from "@mui/material/AccordionDetails";

import { ThemeProvider, createTheme } from "@mui/material/styles";

import AugmentBuilder from "./components/AugmentBuilder";
import LoadoutBuilder from "./components/LoadoutBuilder";

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
