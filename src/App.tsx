import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Itinerary from "./pages/Itinerary";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/:slug" element={<Itinerary />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
