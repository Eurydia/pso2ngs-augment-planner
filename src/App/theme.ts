import createTheme from "@mui/material/styles/createTheme";

import {
    deepPurple,
    blue,
    pink,
    grey,
    deepOrange,
    yellow,
    indigo,
} from "@mui/material/colors";

// declare module "@mui/material/styles" {
//     interface Theme {
//         status: {
//             dange
//         }
//     }
// }

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
