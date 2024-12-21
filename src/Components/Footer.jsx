import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faPhone } from '@fortawesome/free-solid-svg-icons';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import data from '../Env/data.json';
import { Link, useLocation } from 'react-router-dom';

function Footer() {
    const location = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]); 

    return (
        <footer className="text-center text-lg-start bg-body-tertiary text-muted">
            <section>
                <div className="container text-center text-md-start p-5">
                    <div className="row">
                        <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4 text-light">
                            <h6 className="mb-4 d-flex justify-content-center">
                                <img src={`${process.env.PUBLIC_URL}/logo.png`} alt=""
                                    width={100} height={100} />
                            </h6>
                            <p>{data.company.description}</p>
                        </div>
                        <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4 text-light">
                            <h6 className="text-uppercase fw-bold mb-4">Services</h6>
                            <p>
                                <Link to="/workspace">
                                    {data.services['electrical-circuit-analysis']}
                                </Link>
                            </p>
                            <p>
                                <Link to="/vault">
                                    {data.services['energy-consumption-monitoring']}
                                </Link>
                            </p>
                            <p>
                                <Link to="/programs">
                                    {data.services['power-factor-correction']}
                                </Link>
                            </p>
                            <p>
                                <Link to="/achievments">
                                    {data.services['achievments']}
                                </Link>
                            </p>
                        </div>

                        <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4 text-light">
                            <h6 className="text-uppercase fw-bold mb-5">Contact</h6>
                            <p><FontAwesomeIcon icon={faHome} className="me-3" />{data.company.contact.address}</p>
                            <p><FontAwesomeIcon icon={faPhone} className="me-3" />{data.company.contact['phone']}</p>
                        </div>

                    </div>
                </div>
            </section>

            <section className="d-flex justify-content-center justify-content-lg-between p-5 border-bottom text-light">
                <div className="me-5 d-none d-lg-block">
                    <span>Get connected with us on social networks:</span>
                </div>

                <div className='links'>
                    <a href="https://www.linkedin.com/in/ahmed-medhat-ramadan-4061b7263?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                        className="me-4 text-light" target='_blank'>
                        <FontAwesomeIcon icon={faLinkedin} /> {data.authors['ahmed-medhat']}
                    </a>
                    <a href="https://www.linkedin.com/in/loucas-monir-b0a50b2b6?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                        className="me-4 text-light" target='_blank'>
                        <FontAwesomeIcon icon={faLinkedin} /> {data.authors['loucas-monir']}
                    </a>
                    <a href="https://github.com/ahmedmedhat-se/WattWizards" className="me-4 text-light"
                    target='_blank'>
                        <FontAwesomeIcon icon={faGithub} />
                    </a>
                </div>
                © {new Date().getFullYear()} Copyright: {data.company.name}
            </section>
        </footer>
    );
}

export default Footer;