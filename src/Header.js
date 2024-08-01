import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faUserCircle } from '@fortawesome/free-regular-svg-icons';
import { faHeadset } from '@fortawesome/free-solid-svg-icons';

function Header() {
    const IStyle = {
        fontSize: "22px",
        color: "#6312aa",
        marginRight: "15px",
    }

    const BrandStyle = {
        color: "#6312aa",
    }

    const ItemStyle = {
        color: "#6312aa",
    }

    const BotStyle = {
        color: "#fff",
        fontSize: "18px"
    }
    return (
        <>
            <nav className='navbar navbar-expand-lg bg-white sticky-top navbar-light p-3 shadow-sm'>
                <div className='container'>
                    <a className='navbar-brand' style={BrandStyle} href="#">
                        <i className='me-2'></i>
                        <strong>WattWizards</strong>
                    </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#NavController" aria-controls="navbarNav" aria-expanded="false"
                        aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="NavController">
                        <ul className="navbar-nav ms-auto ">
                            <li className="nav-item">
                                <a className="nav-link mx-2 text-uppercase"
                                    href="#Programs" style={ItemStyle}>Programs</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link mx-2 text-uppercase"
                                    href="#Achievments" style={ItemStyle}>Achievments</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link mx-2 text-uppercase"
                                    href="#About" style={ItemStyle}>About</a>
                            </li>
                        </ul>
                        <ul className="navbar-nav ms-auto ">
                            <li className="nav-item">
                                <a href="https://www.instagram.com/sizzlinmedhat?igsh=MXJnOGZtZm1qYWhrdw==" target='_blank'>
                                    <i style={IStyle}>
                                        <FontAwesomeIcon icon={faInstagram} />
                                    </i>
                                </a>
                                <a href="https://github.com/ahmedmedhat-se/WattWizards" target='_blank'>
                                    <i style={IStyle}>
                                        <FontAwesomeIcon icon={faGithub} />
                                    </i>
                                </a>
                                <a href="https://www.linkedin.com/in/ahmed-medhat-ramadan-4061b7263?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target='_blank'>
                                    <i style={IStyle}>
                                        <FontAwesomeIcon icon={faLinkedin} />
                                    </i>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            {/* <!-- Navbar Section Ends --> */}
            {/* <!-- Main Container Starts --> */}
            <div className='home-landing'>
                <section className='home' id='home'>
                    <div className='CodeCrafters'>
                        <div className='CodeCrafters-desc'>
                            <h2>CodeCrafters Team</h2>
                            <p style={{fontWeight: "bold", fontSize: "1.2rem", wordSpacing: "2px"}}>CodeCrafters developed an innovative web/mobile application that serves as a versatile software tool, addressing numerous challenges in the electricity sector. Our groundbreaking work has earned us numerous national competition victories, qualification for international competitions, and recognition as one of the top 1,000 projects worldwide.</p>
                            <form className='search-bar'>
                                <input type="text" readOnly placeholder='Electrobot Can Help You!' />
                                <button>
                                    <a href="/ElectroBot Ai ChatBot/ElectroBotBrief.html" target="_blank">
                                        <i style={BotStyle}>
                                            <FontAwesomeIcon icon={faHeadset} />
                                        </i>
                                    </a>
                                </button>
                            </form>
                        </div>
                        <div className="CodeCrafters-img">
                            <div className="CodeCrafters-img-container">
                                <img
                                    src="https://images.credly.com/images/d30e23c4-60cb-4a5d-b826-b0cd4a9cb0bc/profile_img.jpg" />
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
        </>
    );
}
export default Header