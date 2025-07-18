// Layout.js
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import AppNavBar from "./AppNavbar";

const Layout = () => {
  return (
    <div className="root__layout">
      <Sidebar />
      <AppNavBar />
      <main className="main-section">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
