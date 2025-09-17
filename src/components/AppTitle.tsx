import { Box, Link, Typography } from "@mui/material";
import { basePath } from "../../basepath";
type Props = {
  color: string;
};

export default function AppTitle({ color }: Props) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        textAlign: "center",
        opacity: 1,
        background: "transparent",
        color: { md: "rgb(52, 71, 103)" },
      }}
    >
      <Link
        href="#"
        sx={{
          textDecoration: "none",
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
        }}
      >
        <Box
          component="img"
          sx={{
            width: "2rem",
            height: "2rem",
          }}
          alt="Logo"
          src={`/${basePath}/note.svg`}
        />

        <Typography
          variant="h4"
          sx={{
            color,
            letterSpacing: "0.05em",
            fontWeight: 600,
          }}
        >
          QuickNote
        </Typography>
      </Link>
    </Box>
  );
}
