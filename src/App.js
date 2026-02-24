import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import AboutPage from "./pages/AboutPage";
import SejarahPage from "./pages/SejarahPage";
import GerejaListPage from "./pages/GerejaListPage";
import MajelisListPage from "./pages/MajelisListPage";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/sejarah" element={<SejarahPage />} />
          <Route path="/gereja" element={<GerejaListPage />} />
          <Route path="/majelis" element={<MajelisListPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
