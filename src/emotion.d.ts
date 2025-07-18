import { Theme as MuiTheme } from "@mui/material";

declare module "@emotion/react" {
  export type Theme = MuiTheme;
}
