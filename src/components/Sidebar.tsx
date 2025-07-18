import { styled } from "@mui/material/styles";

import MuiDrawer, { drawerClasses } from "@mui/material/Drawer";
import AppTitle from "./AppTitle";
import { Box, Divider } from "@mui/material";
import { useIsMobile } from "../hooks/useIsMobile";

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
  const isMobile = useIsMobile();
  return (
    <Drawer
      open={open}
      variant={isMobile ? "temporary" : "permanent"}
      onClose={toggleDrawer?.(false)}
      sx={{
        [`& .${drawerClasses.paper}`]: {
          backgroundColor: "primary.main",
        },
      }}
    >
      <Box
        sx={{
          padding: "24px 32px 10px",
        }}
      >
        <AppTitle color="text.primary" />
      </Box>

      <Divider />
    </Drawer>
  );
}
