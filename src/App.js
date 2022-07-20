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

//timeline全域物件
import { EventContextProvider } from "./contexts/event";
//預約時間全域物件
import { TimeOpenContextProvider } from "./contexts/setOpenTime";



function App() {
  return (
    <BrowserRouter>
      <EventContextProvider>
        <TimeOpenContextProvider>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="about/*" element={<About />} />
            <Route path="adjusttime" element={<AdjustTime />} />
            <Route path="test" element={<Test />} />
          </Routes>
        </TimeOpenContextProvider>
      </EventContextProvider>
    </BrowserRouter>
  );
}


export default App;