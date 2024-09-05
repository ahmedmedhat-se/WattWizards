import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Footer = () => {
    return (
        <footer className="text-center text-lg-start bg-body-tertiary">
            <section>
                <div className="container text-center">
                    <div className="row">
                        <div className='mt-4 mb-4' id='social-icons'>
                            <a
                                className="btn btn-primary btn-floating m-1"
                                style={{ backgroundColor: '#0082ca', border: 'none' }}
                                href="https://www.linkedin.com/in/ahmed-medhat-ramadan-4061b7263?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target='_blank'
                                role="button"
                            >
                                <i className="fab fa-linkedin-in"></i>
                            </a>
                            <a
                                className="btn btn-primary btn-floating m-1"
                                style={{ backgroundColor: '#333333', border: 'none' }}
                                href="https://github.com/ahmedmedhat-se" target='_blank'
                                role="button"
                            >
                                <i className="fab fa-github"></i>
                            </a>
                        </div>
                        <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4" id='company'>
                            <h4 className="text-uppercase fw-bold mb-2">
                                <i className="fa-solid fa-globe me-3"></i>CodeCrafters
                            </h4>
                            <p>
                                We are composed of experts in the field of software team systems and electrical systems.
                                We present to you a summary of our clear scientific experiments in a simplified form.
                            </p>
                        </div>
                        <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4" id='team-members'>
                            <h4 className="text-uppercase fw-bold mb-2">
                                <i className="fa-brands fa-teamspeak me-3"></i>Team Members
                            </h4>
                            <p>
                                <a href="#!">Ahmed Medhat</a>
                                <a href="#!">Loucas Monir</a>               
                            </p>
                        </div>
                    </div>
                </div>
                <div className="text-center p-4" id='div-footer'>
                    © 2024 Copyright: CodeCrafters
                </div>
            </section>
        </footer>
    );
};

export default Footer;
