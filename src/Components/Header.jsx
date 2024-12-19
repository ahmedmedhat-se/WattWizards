import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { Link } from 'react-router-dom';

function Header() {
    return (
        <>
            <nav className="navbar navbar-expand-lg fixed-top navbar-light p-4 shadow-sm">
                <div className="container">
                    <Link className='navbar-brand' to='/wattwizards'>
                        <strong>WattWizards</strong>
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDarkNavbar" aria-controls="offcanvasDarkNavbar" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="offcanvas offcanvas-end" tabindex="-1" id="offcanvasDarkNavbar" aria-labelledby="offcanvasDarkNavbarLabel">
                        <div className="offcanvas-header">
                            <h5 className="offcanvas-title" id="offcanvasDarkNavbarLabel">WattWizards</h5>
                            <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        </div>
                        <div className="offcanvas-body">
                            <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                                <li className="nav-item">
                                    <Link className="nav-link mx-2 text-light text-uppercase"
                                        to='/programs'>Programs</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link mx-2 text-light text-uppercase"
                                        to='/achievments'>Achievments</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link mx-2 text-light text-uppercase"
                                        to='/workspace'>Workspace</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link mx-2 text-light text-uppercase"
                                        to='/login'>Login</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
}
export default Header