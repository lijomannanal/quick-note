// Layout.js
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import AppNavBar from "./AppNavbar";
import { useTheme } from "@mui/material/styles";

const Layout = () => {
  const theme = useTheme();
  const bgColor = theme.palette.background.default;
  return (
    <div className="root__layout">
      <Sidebar />
      <AppNavBar />
      <main className="main-section" style={{ backgroundColor: bgColor }}>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
