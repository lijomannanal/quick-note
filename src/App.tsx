import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./components/Home";
import { DBConfig } from "./config/DBConfig";
import { initDB } from "./hooks/useIndexedDB";
import Archive from "./components/Archive";
import { ThemeContextProvider } from "./context/ThemeContextProvider";

initDB(DBConfig);

function App() {
  return (
    <ThemeContextProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="archive" element={<Archive />} />
          </Route>
        </Routes>
      </Router>
    </ThemeContextProvider>
  );
}

export default App;
