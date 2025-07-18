import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { setupTheme } from "./theme.ts";
import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
const theme = setupTheme();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline enableColorScheme />
      <App />
    </ThemeProvider>
  </StrictMode>
);
