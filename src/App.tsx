import { Box } from "@mui/material";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import Search from "./pages/Search";
import NotFound from "./pages/NotFound";
import ScrollToTop from "./utils/scrollToTop";

function App() {
  return (
    <div>
      <Box>
        <BrowserRouter>
          <Navbar />
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/search" element={<Search />} />
            {/* 404 Fallback */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </Box>
    </div>
  );
}

export default App;
