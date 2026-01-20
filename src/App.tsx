import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Itinerary from "./pages/Itinerary";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/:slug" element={<Itinerary />} />
    </Routes>
  );
}

export default App;
