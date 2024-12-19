import React from "react";
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Header from "./Components/Header.jsx";
import Homepage from "./Components/Homepage.jsx";
import SparkTalk from "./Components/SparkTalk.jsx";
import Features from "./Components/Features.jsx";
import Programs from "./Components/Programs.jsx";
import Achievments from "./Components/Achievments.jsx";
import Workspace from "./Components/Workspace.jsx";
import Userin from "./Components/Userin.jsx"
import NotFound from "./Components/NotFound.jsx";
import Footer from "./Components//Footer.jsx";
import GoToTop from "./Components/GoToTop.jsx";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
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
      <GoToTop />
    </>
  );
}
export default App
