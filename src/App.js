import React from "react";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import HomePage from "./pages/HomePage";
import About from "./pages/About";
import AdjustTime from "./pages/AdjustTime";



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="about/*" element={<About />} />
        <Route path="adjusttime" element={<AdjustTime/>} />
      </Routes>
    </BrowserRouter>
  );
}


export default App;