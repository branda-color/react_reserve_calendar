import React from "react";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import HomePage from "./pages/HomePage";
import About from "./pages/About";
import AdjustTime from "./pages/AdjustTime";
import Test from "./pages/Test";



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="about/*" element={<About />} />
        <Route path="adjusttime" element={<AdjustTime/>} />
        <Route path="test" element={<Test/>} />
 
      </Routes>
    </BrowserRouter>
  );
}


export default App;