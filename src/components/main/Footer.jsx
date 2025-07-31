import { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faPhone } from '@fortawesome/free-solid-svg-icons';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faMailForward } from '@fortawesome/free-solid-svg-icons/faMailForward';
import { Link, useLocation } from 'react-router-dom';
import data from '../env/data.json';
import logo from '../assets/logo.png';
import "../styles/footer.css";

function Footer() {
    const location = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);

    return (
        <footer className="footer text-light">
            <div className="container py-5">
                <div className="row gy-4 justify-content-between align-items-start">
                    <div className="col-lg-4 col-md-6 text-md-start text-center">
                        <Link to="/wattwizards">
                            <img
                                src={logo}
                                alt="Logo"
                                className="footer-logo mb-3"
                            />
                        </Link>
                        <p className="footer-description">
                            {data.company.description}
                        </p>
                    </div>

                    <div className="col-lg-3 col-md-6 text-center text-md-start">
                        <h5 className="footer-heading">Services</h5>
                        <ul className="list-unstyled">
                            <li><Link to="/wattwizards/programs">{data.services['available-programs']}</Link></li>
                            <li><Link to="/wattwizards/workspace/online-sheets">{data.services['electrical-circuit-analysis']}</Link></li>
                            <li><Link to="/wattwizards/products/partners-policies">{data.services['partners-policies']}</Link></li>
                            <li><Link to="/wattwizards/achievments">{data.services['achievments']}</Link></li>
                        </ul>
                    </div>

                    <div className="col-lg-4 col-md-12 text-center text-md-start">
                        <h5 className="footer-heading">Contact</h5>
                        <p><FontAwesomeIcon icon={faHome} className="me-2" /> {data.company.contact.address}</p>
                        <p><FontAwesomeIcon icon={faPhone} className="me-2" /> {data.company.contact.phone}</p>
                        <p>
                            <FontAwesomeIcon icon={faMailForward} className="me-2" />
                            <a href="mailto:xoperations.contact@gmail.com" className="footer-email">
                                xoperations.contact@gmail.com
                            </a>
                        </p>
                        <div className="d-flex flex-column flex-md-row gap-2 mt-3">
                            <a href="https://www.linkedin.com/in/ahmed-medhat-ramadan-4061b7263" target="_blank" rel="noopener noreferrer" className="footer-linkedin">
                                <FontAwesomeIcon icon={faLinkedin} className="me-2" />
                                {data.authors['ahmed-medhat']}
                            </a>
                            <a href="https://www.linkedin.com/in/loucas-monir-b0a50b2b6" target="_blank" rel="noopener noreferrer" className="footer-linkedin">
                                <FontAwesomeIcon icon={faLinkedin} className="me-2" />
                                {data.authors['loucas-monir']}
                            </a>
                        </div>
                    </div>
                </div>
                <hr className="footer-divider my-4" />
                <p className="text-center mb-0">
                    © {new Date().getFullYear()} {data.company.name}. All rights reserved.
                </p>
            </div>
        </footer>
    );
}
export default Footer;