import {
  useState,
  useMemo,
  type ReactNode,
  useCallback,
  useEffect,
} from "react";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeContext, ThemeMode } from "./ThemeContext";
import { setupTheme } from "../theme";

interface ThemeContextProviderProps {
  children: ReactNode;
}

export const ThemeContextProvider = ({
  children,
}: ThemeContextProviderProps) => {
  const [mode, setMode] = useState<ThemeMode>(() => {
    const storedTheme = localStorage.getItem("appTheme") as ThemeMode;
    return storedTheme ? storedTheme : ThemeMode.Dark;
  });

  const toggleColorMode = useCallback(() => {
    setMode((prevMode) =>
      prevMode === ThemeMode.Dark ? ThemeMode.Light : ThemeMode.Dark
    );
  }, []);

  const theme = useMemo(() => {
    return setupTheme(mode);
  }, [mode]);

  useEffect(() => {
    localStorage.setItem("appTheme", mode);
  }, [mode]);

  const contextValue = useMemo(
    () => ({
      mode,
      toggleColorMode,
    }),
    [mode, toggleColorMode]
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline /> {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};
