import { createContext } from "react";

export enum ThemeMode {
  Light = "light",
  Dark = "dark",
}

interface ThemeContextType {
  mode: ThemeMode;
  toggleColorMode: () => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
);
