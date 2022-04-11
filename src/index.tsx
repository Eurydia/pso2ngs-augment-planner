import React from "react";
import ReactDOM from "react-dom";

import { SnackbarProvider } from "notistack";

import App from "./App";

ReactDOM.render(
    <React.StrictMode>
        <SnackbarProvider maxSnack={3}>
            <App />
        </SnackbarProvider>
    </React.StrictMode>,
    document.getElementById("root"),
);
