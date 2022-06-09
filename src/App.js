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

import {EventContextProvider} from "./contexts/event";



function App() {
  return (
    <BrowserRouter>
    <EventContextProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="about/*" element={<About />} />
        <Route path="adjusttime" element={<AdjustTime/>} />
        <Route path="test" element={<Test/>} />
 
      </Routes>
      </EventContextProvider>
    </BrowserRouter>
  );
}


export default App;