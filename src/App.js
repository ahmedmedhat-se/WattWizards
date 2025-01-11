import React from "react";
import Header from "./Components/Header.jsx";
import Homepage from "./Components/Homepage.jsx";
import SparkTalk from "./Components/SparkTalk.jsx";
import Programs from "./Components/Programs.jsx";
import Achievments from "./Components/Achievments.jsx";
import Workspace from "./Components/Workspace.jsx";
import CircuitVault from "./Components/CircuitVault.jsx";
import Userin from "./Components/Userin.jsx";
import Profile from "./Components/Profile.jsx";
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
        <Route path="/achievments" element={<Achievments />}></Route>
        <Route path="/workspace" element={<Workspace />}></Route>
        <Route path="/vault" element={<CircuitVault />}></Route>
        <Route path="/login" element={<Userin />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
      <Footer />
      <GoToTop />
    </>
  );
}
export default App
