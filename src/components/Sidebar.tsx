import { styled } from "@mui/material/styles";

import MuiDrawer, { drawerClasses } from "@mui/material/Drawer";
import AppTitle from "./AppTitle";
import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { Device, MenuItems } from "../constants";
import { useEffect, useState, useTransition } from "react";
import ThemeToggleButton from "./ToggleThemeButton";

const drawerWidth = 240;

const Drawer = styled(MuiDrawer)({
  width: drawerWidth,
  flexShrink: 0,
  boxSizing: "border-box",
  mt: 10,
  [`& .${drawerClasses.paper}`]: {
    width: drawerWidth,
    boxSizing: "border-box",
  },
});

interface SidebarProps {
  open?: boolean | undefined;
  toggleDrawer?: (newOpen: boolean) => () => void;
}

export default function Sidebar({ open, toggleDrawer }: SidebarProps) {
  const isDesktop = useMediaQuery(Device.Desktop);
  const location = useLocation();
  const [selectedMenu, setSelectedMenu] = useState("/");
  const navigate = useNavigate();
  const [, startTransition] = useTransition();

  useEffect(() => {
    setSelectedMenu(location.pathname);
  }, [location.pathname]);

  const onMenuSelection = (path: string) => {
    setSelectedMenu(path);
    startTransition(() => {
      navigate(path);
    });
  };

  return (
    <Drawer
      open={open}
      variant={isDesktop ? "permanent" : "temporary"}
      onClose={toggleDrawer?.(false)}
      sx={{
        [`& .${drawerClasses.paper}`]: {
          backgroundColor: "background.default",
        },
      }}
    >
      <Box
        sx={{
          padding: "24px 16px 10px",
        }}
      >
        <AppTitle color="text.title" />
      </Box>
      <Box sx={{ overflow: "auto", padding: "0.5rem 1rem" }}>
        <List>
          {MenuItems.map(({ title, path, icon: Icon }) => {
            return (
              <ListItem
                key={title}
                disablePadding
                sx={{
                  marginBottom: "0.5rem",
                }}
              >
                <ListItemButton
                  onClick={() => onMenuSelection(path)}
                  selected={selectedMenu === path}
                  sx={{
                    borderRadius: "7px",
                    "&.Mui-selected": {
                      backgroundColor: "primary.main",
                      color: "text.secondary",
                    },
                    "&.Mui-selected:hover": {
                      backgroundColor: "primary.main",
                      color: "text.secondary",
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: "42px",
                      color:
                        selectedMenu === path
                          ? "text.secondary"
                          : "text.primary",
                    }}
                  >
                    <Icon sx={{ height: "1.5rem", width: "1.5rem" }} />
                  </ListItemIcon>
                  <ListItemText primary={title} />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
        <Divider />
        <ThemeToggleButton />
      </Box>
    </Drawer>
  );
}
