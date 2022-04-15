import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import React from "react";
import ReactDOM from "react-dom";

import { SnackbarProvider } from "notistack";

import App from "./App/App";
import giveGift from "./gift";

giveGift();

ReactDOM.render(
    <React.StrictMode>
        <SnackbarProvider>
            <App />
        </SnackbarProvider>
    </React.StrictMode>,
    document.getElementById("root"),
);
