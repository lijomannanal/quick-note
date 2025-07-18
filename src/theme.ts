import { createTheme } from "@mui/material";

export function setupTheme() {
  const palette = {
    primary: {
      main: "#5C6BC0",
    },
    secondary: {
      main: "#E6EEF2",
      dark: "#CFDDE5",
    },
    text: {
      primary: "#fff",
      main: "#000",
    },
    background: {
      default: "#fff",
    },
  };

  return createTheme({
    palette,
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
        fontSize: "2.7rem",
      },
      h3: {
        fontSize: "2.5rem",
      },
      h4: {
        fontSize: "2rem",
        fontWeight: 500,
      },
      h5: {
        fontSize: "1.8rem",
        fontWeight: 600,
      },
      body1: {
        fontSize: "1.4rem",
      },
      body2: {
        fontSize: "1.2rem",
      },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: ({ palette }) => {
          return `
                   html {
                      font-size: 62.5%;
                   }  
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
    },
  });
}
