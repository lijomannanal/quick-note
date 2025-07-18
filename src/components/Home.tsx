import { Box, Typography } from "@mui/material";
import SearchBar from "./SearchBar";

export default function Home() {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Typography sx={{ color: "text.main" }} variant="h5">
        Notes
      </Typography>
      <SearchBar />
    </Box>
  );
}
