import createTheme from "@mui/material/styles/createTheme";

import { deepPurple, pink } from "@mui/material/colors";

/**
 * Main theme for app
 */
const theme = createTheme({
    palette: {
        primary: {
            light: deepPurple["200"],
            main: deepPurple["A200"],
            dark: deepPurple["A700"],
            contrastText: "#FFFFFF",
        },
        secondary: {
            main: pink["400"],
        },

        background: {
            default: deepPurple["50"],
        },
        warning: {
            main: pink["A400"],
        },
    },
});

export default theme;
