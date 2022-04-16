import createTheme from "@mui/material/styles/createTheme";

import {
    deepPurple,
    blue,
    pink,
    grey,
    deepOrange,
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
            main: deepPurple["A400"],
            light: deepPurple[50],
            contrastText: "#FFFFFF",
        },
        secondary: {
            main: pink["A400"],
        },

        background: {
            default: "#FFFFFF",
        },
        warning: {
            main: pink["A400"],
        },
    },
});

export default theme;
