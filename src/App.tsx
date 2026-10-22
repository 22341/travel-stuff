import { Routes, Route, Navigate } from "react-router";
import Home from "./pages/Home";
import Itinerary from "./pages/Itinerary";
import Maps from "./pages/Maps";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/maps" element={<Maps />} />
      <Route path="/:slug" element={<Itinerary />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
