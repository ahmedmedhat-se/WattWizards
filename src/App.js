import React from "react";
import Header from "./Header.js";
import SparkTalk from "./SparkTalk.js";
import Homepage from "./Homepage.js";
import Features from "./Features.js";
import Programs from "./Programs.js";
import Achievments from "./Achievments.js";
import Workspace from "./Workspace.js";
import Userin from "./Userin.js"
import NotFound from "./NotFound.js";
import Footer from "./Footer.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <SparkTalk />
        <Routes>
          <Route path="/" element={<Homepage />}></Route>
          <Route path="/WattWizards" element={<Homepage />}></Route>
          <Route path="/homepage" element={<Homepage />}></Route>
          <Route path="/programs" element={<Programs />}></Route>
          <Route path="/features" element={<Features />}></Route>
          <Route path="/achievments" element={<Achievments />}></Route>
          <Route path="/workspace" element={<Workspace />}></Route>
          <Route path="/login" element={<Userin />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}
export default App
