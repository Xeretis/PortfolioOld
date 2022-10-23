import App from "./App";
import { MantineProvider } from "@mantine/core";
import React from "react";
import ReactDOM from "react-dom/client";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <MantineProvider withNormalizeCSS withGlobalStyles theme={{ colorScheme: "dark" }}>
            <App />
        </MantineProvider>
    </React.StrictMode>
);
