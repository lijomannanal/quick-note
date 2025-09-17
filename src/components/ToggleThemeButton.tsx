import Box from "@mui/material/Box";
import { useThemeContext } from "../hooks/useThemeContext";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { Switch } from "@mui/material";
import { ThemeMode } from "../context/ThemeContext";

function ThemeToggleButton() {
  const { mode, toggleColorMode } = useThemeContext();

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "background.default",
        color: "text.primary",
        borderRadius: 1,
        paddingBlock: 3,
      }}
    >
      <Box sx={{ display: "flex", gap: "1rem", alignItems: "center" }}>
        <DarkModeIcon sx={{ fontSize: "1.25rem" }} /> Dark mode
        <Switch onChange={toggleColorMode} checked={mode === ThemeMode.Dark} />
      </Box>
    </Box>
  );
}

export default ThemeToggleButton;
