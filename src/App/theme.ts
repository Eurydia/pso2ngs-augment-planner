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
            main: deepPurple["A700"],
            light: deepPurple[50],
            contrastText: "#FFFFFF",
        },
        secondary: {
            main: pink["A400"],
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
