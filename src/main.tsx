import React from "react";
import ReactDOM from "react-dom/client";
import { MantineProvider } from '@mantine/core';
import { theme } from "./theme";
import App from "./App.tsx";
import { ItemsContextProvider } from './context/ItemContext.js'

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <MantineProvider theme={theme}>
    <React.StrictMode>
      <ItemsContextProvider>
        <App />
      </ItemsContextProvider>
    </React.StrictMode>
  </MantineProvider>
);
