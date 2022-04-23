import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import React from "react";
import ReactDOM from "react-dom";

import ThemeProvider from "@mui/material/styles/ThemeProvider";

import { SnackbarProvider } from "notistack";

import App from "./App";

import theme from "./theme";
import giveGift from "./gift";

giveGift();

ReactDOM.render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <SnackbarProvider>
                <App />
            </SnackbarProvider>
        </ThemeProvider>
    </React.StrictMode>,
    document.getElementById("root"),
);
