import { Theme as MuiTheme } from "@mui/material";

declare module "@mui/material/styles" {
  interface BreakpointOverrides {
    mobile: false;
    tablet: false;
    laptop: true;
    desktop: false;
    xs: true;
    sm: true;
    md: true;
    lg: true;
    xl: true;
  }
}

declare module "@emotion/react" {
  export type Theme = MuiTheme;
}
