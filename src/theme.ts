import { createTheme, type PaletteMode } from "@mui/material";
import { ThemeMode } from "./context/ThemeContext";

export function setupTheme(mode: ThemeMode) {
  const lightThemePalette = {
    mode: ThemeMode.Light as PaletteMode,
    primary: {
      main: "#2196F3",
      cardIcon: "#fff",
    },
    secondary: {
      main: "#E6EEF2",
      dark: "#CFDDE5",
    },
    text: {
      primary: "#00000099",
      secondary: "#fff",
      title: "#000",
      activeTab: "#fff",
    },
    background: {
      default: "#fff",
    },
  };
  const darkThemePalette = {
    mode: ThemeMode.Dark as PaletteMode,
    primary: {
      main: "#2196F3",
      cardIcon: "#fff",
    },
    secondary: {
      main: "#E6EEF2",
      dark: "#CFDDE5",
    },
    text: {
      primary: "#fff",
      secondary: "#00000099",
      title: "#fff",
      activeTab: "#fff",
    },
    background: {
      default: "rgb(42, 52, 71)",
    },
  };

  return createTheme({
    palette: mode === ThemeMode.Light ? lightThemePalette : darkThemePalette,
    shape: {
      borderRadius: 8,
    },
    typography: {
      htmlFontSize: 10,
      fontFamily: "Roboto, Arial, sans-serif",
      h1: {
        fontSize: "3rem",
      },
      h2: {
        fontSize: "2rem",
      },
      h3: {
        fontSize: "1.8rem",
      },
      h4: {
        fontSize: "1.5rem",
        fontWeight: 500,
      },
      h5: {
        fontSize: "1.4rem",
        fontWeight: 600,
      },
      h6: {
        fontSize: "1.25rem",
        fontWeight: 600,
      },
      body1: {
        fontSize: "1rem",
      },
      body2: {
        fontSize: "0.9rem",
      },
      caption: {
        fontSize: "0.9rem",
        lineHeight: "1.25rem",
        opacity: "0.7",
      },
    },
    breakpoints: {
      values: {
        xs: 0,
        sm: 576,
        md: 768,
        lg: 992,
        laptop: 1024,
        xl: 1200,
      },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: ({ palette }) => {
          return `
                   *::-webkit-scrollbar {
                      height: 8px;
                      width: 8px;
                   }
                   *::-webkit-scrollbar-track {
                      border-radius: 4px;
                      background-color: ${palette.secondary.main};
                   }
                    *::-webkit-scrollbar-track:hover {
                      background-color: ${palette.secondary.dark};
                    }
                    *::-webkit-scrollbar-track:active {
                      background-color: ${palette.secondary.dark};
                    }
                `;
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            border: 0,
            borderRadius: 3,
            height: 40,
            padding: "0 1.8rem",
            fontSize: "0.9rem",
            "&: focus-visible": {
              outline: "none",
            },
            "&: focus": {
              outline: "none",
            },
          },
        },
      },
      MuiSvgIcon: {
        styleOverrides: {
          root: {
            "&: focus-visible": {
              outline: "none",
            },
            "&: focus": {
              outline: "none",
            },
          },
        },
      },
      MuiTabs: {
        styleOverrides: {
          indicator: {
            backgroundColor: "transparent", // or any other valid CSS color
          },
        },
      },
      MuiTab: {
        styleOverrides: {
          root: {
            fontSize: "1.2rem",
            minWidth: "105px !important",
            "&: focus-visible": {
              outline: "none",
            },
            "&: focus": {
              outline: "none",
            },
          },
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: {
            "&.MuiIconButton-sizeSmall": {
              width: 24,
              height: 24,
              "& svg": {
                fontSize: 18,
              },
            },
            "&.MuiIconButton-sizeLarge": {
              width: 48,
              height: 48,
              "& svg": {
                fontSize: 32,
              },
            },
            "&: focus-visible": {
              outline: "none",
            },
            "&: focus": {
              outline: "none",
            },
          },
        },
      },

      MuiInputBase: {
        styleOverrides: {
          root: ({ theme }) => ({
            input: {
              color: theme.palette.text.primary,
            },
            "& input::placeholder": {
              color: theme.palette.text.primary,
            },
            textarea: {
              color: theme.palette.text.primary,
            },
            "> div": {
              color: theme.palette.text.primary,
            },
          }),
        },
      },
      MuiInputLabel: {
        styleOverrides: {
          root: ({ theme }) => ({
            color: theme.palette.text.primary,
          }),
        },
      },
    },
  });
}
