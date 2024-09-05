import React from "react";
import Header from "./Header.js";
import Homepage from "./Homepage.js";
import Features from "./Features.js";
import Programs from "./Programs.js";
import Achievments from "./Achievments.js";
import SparkTalk from "./SparkTalk.js";
import Footer from "./Footer.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <SparkTalk />
        <Routes>
          <Route path="/wattwizards" element={<Homepage />}></Route>
          <Route path="/homepage" element={<Homepage />}></Route>
          <Route path="/programs" element={<Programs />}></Route>
          <Route path="/features" element={<Features />}></Route>
          <Route path="/achievments" element={<Achievments />}></Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}
export default App
