import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { Link } from 'react-router-dom';

function Header() {
    return (
        <>
            <nav className="navbar navbar-expand-lg fixed-top navbar-light p-4 shadow-sm">
                <div class="container">
                    <Link className='navbar-brand' to='/wattwizards'>
                        <i className='me-2'></i>
                        <strong>WattWizards</strong>
                    </Link>
                    <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDarkNavbar" aria-controls="offcanvasDarkNavbar" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="offcanvas offcanvas-end text-bg-dark" tabindex="-1" id="offcanvasDarkNavbar" aria-labelledby="offcanvasDarkNavbarLabel">
                    <div class="offcanvas-header">
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <div class="offcanvas-body">
                        <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
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