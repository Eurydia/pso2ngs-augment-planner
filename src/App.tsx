import Container from "@mui/material/Container";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import AugmentBuilder from "./components/AugmentBuilder";

const theme = createTheme();

function App() {
    return (
        <ThemeProvider theme={theme}>
            <Container>
                <AugmentBuilder />
            </Container>
        </ThemeProvider>
    );
}

export default App;
