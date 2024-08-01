import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faApple, faGithub, faGooglePay, faGooglePlay, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';


function Footer(){
    const AnchorStyle = {
        color: "#fff",
        textDecoration: "none",
        fontSize: "15px"
    }

    const IStyle = {
        fontSize: "15px"
    }

    const LoginBtnStyle = {
        width: "100%"
    }

    const AppItemStyle = {
        display: "inline",
        marginLeft: "5px"
    }

    return(
        <section className="footer" id="About">
            <div className="footer-contents">
                <div className="footer-col footer-col-1">
                    <div className="col-title">
                        <img
                            src="https://images.credly.com/images/d30e23c4-60cb-4a5d-b826-b0cd4a9cb0bc/profile_img.jpg"/>
                    </div>
                    <div className="col-contents">
                        <form className="newsletter">
                            <p className="text-light">
                                Download our mobile apps and enjoy our modern programs!.
                            </p>
                            <button className="newsletter-btn btn btn-round" type="button">
                                <a href="https://www.webintoapp.com/store/347970" className='diabled' target="_blank"
                                    style={AnchorStyle}>Download The App 
                                    <i style={AppItemStyle}>
                                        <FontAwesomeIcon icon={faGooglePlay}/>
                                    </i>
                                </a>
                            </button>
                            <button className="newsletter-btn btn btn-round" type="button">
                                <a href="#" className="diabled"
                                    style={AnchorStyle}>Download The App 
                                    <i style={AppItemStyle}>
                                        <FontAwesomeIcon icon={faApple}/>
                                    </i>
                                </a>
                            </button>
                        </form>
                    </div>
                </div>
                <div className="footer-col footer-col-2">
                    <div className="col-title">
                        <h3>Contact</h3>
                    </div>
                    <div className="col-contents">
                        <div className="contact-row">
                            <span>Address</span>
                            <span>Alexandria/Egypt</span>
                        </div>
                        <div className="contact-row">
                            <span>Phone</span>
                            <span>+0000000000</span>
                        </div>
                        <div className="contact-row">
                            <span>Email</span>
                            <span>some@gmail.com</span>
                        </div>
                    </div>
                </div>
                <div className="footer-col footer-col-3">
                    <div className="col-title">
                        <h3>Quick Links</h3>
                    </div>
                    <div className="col-contents">
                        <a href="https://www.linkedin.com/in/ahmed-medhat-ramadan-4061b7263?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank">Ahmed Medhat</a>
                        <a href="https://www.linkedin.com/in/loucas-monir-b0a50b2b6?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank">Loucas Monir</a>
                        <a href="https://www.linkedin.com/in/steven--gerges?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank">Steven Gerges</a>
                        <a href="https://www.linkedin.com/in/ahmed-sleem-a6ba0a263?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank">Ahmed Sleem</a>
                    </div>
                </div>
                <div className="footer-col footer-col-4">
                    <div className="col-title">
                        <h3>WattWizards Community</h3>
                    </div>
                    <div className="col-contents">
                        <form className="newsletter">
                            <p className="text-light">
                                We are composed of experts in the field of software team systems and electrical systems.
                                We present to you a summary of our clear scientific experiments in a simplified form.
                            </p>
                            <button className="newsletter-btn btn btn-round" type="submit" data-bs-toggle="modal"
                                data-bs-target="#loginModal">Log-in
                            </button>
                            <button className="newsletter-btn btn btn-round" type="submit" data-bs-toggle="modal"
                                data-bs-target="#SignUpModal">Sign-up
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            {/* Log-in Modal Section Starts */}
            <div className="modal fade" id="loginModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className='modal-content'>
                        <div className='modal-body'>
                            <div className="buttonModal">
                                <button type="button" className="btn" data-bs-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <div className="form-title text-center">
                                <h4>Login Form</h4>
                            </div>
                            <div className='d-flex flex-column text-center'>
                                <form>
                                    <div className="form-group">
                                        <input type="email" className="form-control" id="email1"
                                            placeholder="Enter your email address"/>
                                    </div><br />
                                    <div className="form-group">
                                        <input type="password" className="form-control" id="password1"
                                            placeholder="Enter your password"/>
                                    </div><br />
                                    <div className="form-group">
                                        <input type="password" className="form-control" id="password2"
                                            placeholder="Coniform your password"/>
                                    </div><br/>
                                    <input type="submit" style={LoginBtnStyle} value="Login" className="btn btn-success"/>
                                </form>
                                <div className="text-center text-muted delimiter">
                                    Use our social network and ask us if there's a problem.
                                </div>
                                <div className="d-flex justify-content-center social-buttons">
                                    <button type="button" className="btn btn-secondary btn-round" data-bs-toggle="tooltip"
                                        data-bs-placement="top" title="Instagram">
                                        <FontAwesomeIcon icon={faInstagram}/>
                                    </button>
                                    <button type="button" className="btn btn-secondary btn-round" data-bs-toggle="tooltip"
                                        data-bs-placement="top" title="GitHub">
                                        <FontAwesomeIcon icon={faGithub}/>
                                    </button>
                                    <button type="button" className="btn btn-secondary btn-round" data-bs-toggle="tooltip"
                                        data-bs-placement="top" title="Linkedin">
                                        <FontAwesomeIcon icon={faLinkedin}/>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer d-flex justify-content-center">
                            <div className="signup-section">Not a member yet? 
                                <a className="text-info"> Check Out the Sign-up Button!</a>.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Log-in Modal Section Ends */}
            {/* Sign-up Modal Section Starts */}
            <div className="modal fade" id="SignUpModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className='modal-content'>
                        <div className='modal-body'>
                            <div className="buttonModal">
                                <button type="button" className="btn" data-bs-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <div className="form-title text-center">
                                <h4>Sign-up Form</h4>
                            </div>
                            <div className='d-flex flex-column text-center'>
                                <form>
                                    <div className="form-group">
                                        <input type="text" className="form-control" id="name" placeholder="Enter your name"/>
                                    </div><br />
                                    <div className="form-group">
                                        <input type="email" className="form-control" id="email1"
                                            placeholder="Enter your email address"/>
                                    </div><br />
                                    <div className="form-group">
                                        <input type="password" className="form-control" id="password1"
                                            placeholder="Enter your password"/>
                                    </div><br />
                                    <div className="form-group">
                                        <input type="password" className="form-control" id="password2"
                                            placeholder="Coniform your password"/>
                                    </div><br/>
                                    <input type="submit" style={LoginBtnStyle} value="Sign-up" className="btn btn-success"/>
                                </form>
                                <div className="text-center text-muted delimiter">
                                Use our social network and ask us if there's a problem.
                                </div>
                                <div className="d-flex justify-content-center social-buttons">
                                    <button type="button" className="btn btn-secondary btn-round" data-bs-toggle="tooltip"
                                        data-bs-placement="top" title="Instagram">
                                        <FontAwesomeIcon icon={faInstagram}/>
                                    </button>
                                    <button type="button" className="btn btn-secondary btn-round" data-bs-toggle="tooltip"
                                        data-bs-placement="top" title="GitHub">
                                        <FontAwesomeIcon icon={faGithub}/>
                                    </button>
                                    <button type="button" className="btn btn-secondary btn-round" data-bs-toggle="tooltip"
                                        data-bs-placement="top" title="Linkedin">
                                        <FontAwesomeIcon icon={faLinkedin}/>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Sign-up Modal Section Ends */}
        </section>
    );
}

export default Footer