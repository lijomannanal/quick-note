import { AppBar, Box, Toolbar } from "@mui/material";
import AppTitle from "./AppTitle";
import { useState } from "react";
import MenuButton from "./MenuButton";
import Sidebar from "./Sidebar";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";

export default function AppNavBar() {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };
  return (
    <Box sx={{ display: { xs: "auto", laptop: "none" } }}>
      <AppBar
        sx={{
          backgroundColor: "background.default",
          height: "59px",
        }}
        className="app-bar"
        position="static"
      >
        <Toolbar>
          <Box
            sx={{
              display: "flex",
              width: "100%",
              padding: "1rem",
              justifyContent: "space-between",
            }}
          >
            <AppTitle color="text.title" />
            <MenuButton
              sx={{ paddingTop: "1rem" }}
              aria-label="menu"
              onClick={toggleDrawer(true)}
            >
              <MenuRoundedIcon />
            </MenuButton>
            {open && <Sidebar open={open} toggleDrawer={toggleDrawer} />}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
