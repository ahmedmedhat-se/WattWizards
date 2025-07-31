import { Link } from "react-router-dom";
import Features from "../services/Features.jsx";
import Programs from "../services/Programs.jsx";
import SparkTalk from "./SparkTalk.jsx";
import "../styles/hompage.css";
import logo from "../assets/logo.png";

function Homepage() {
    return (
        <>
            <div className='home-landing p-3'>
                <section className='home' id='home'>
                    <div className='XOperations'>
                        <div className='XOperations-desc'>
                            <h2>XOperations</h2>
                            <p className="fw-bold fs-5">
                                “WattWizards—Egypt’s first all-in-one circuit analysis platform—turns complex engineering into click-and-go simplicity. 
                                Built by XOperations - Software Department, it’s award-winning, globally ranked, and built to power precision, 
                                anywhere—online or off.”
                            </p>
                            <Link className="cta-button"
                            to={"/wattwizards/achievments"}>Explore Our Achievments!</Link>
                        </div>
                        <div className="XOperations-img mb-0">
                            <div className="XOperations-img-container">
                                <img src={logo} alt="Logo" />
                            </div>
                        </div>
                        <div className="box">
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                    </div>
                </section>
            </div>
            <SparkTalk />
            <Features />
            <Programs />
        </>
    )
};

export default Homepage;