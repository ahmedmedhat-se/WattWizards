import Header from "../main/Header.jsx";
import SparkTalk from "../main/SparkTalk.jsx";
import GoToTop from "../main/GoToTop.jsx";
import Footer from "../main/Footer.jsx";
import { Outlet } from "react-router-dom";
import "../styles/layout.css";

function MainLayout() {
  return (
    <div className="main-layout">
      <Header />
      <div className="main-content">
        <SparkTalk />
        <div className="content-wrapper">
          <Outlet />
        </div>
        <div className="layout-footer">
          <Footer />
        </div>
        <GoToTop />
      </div>
    </div>
  );
}

export default MainLayout;