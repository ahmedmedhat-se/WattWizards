import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { Link } from 'react-router-dom';

function Header() {
    return (
        <>
            <nav className='navbar navbar-expand-lg fixed-top navbar-light p-4 shadow-sm'>
                <div className='container'>
                    <Link className='navbar-brand' to='/wattwizards'>
                        <i className='me-2'></i>
                        <strong>WattWizards</strong>
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#nav-conatiner" aria-controls="navbarNav" aria-expanded="false"
                        aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="nav-conatiner">
                        <ul className="navbar-nav ms-auto ">
                            <li className="nav-item">
                                <Link className="nav-link mx-2 text-uppercase"
                                    to='/programs'>Programs</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link mx-2 text-uppercase"
                                    to='/achievments'>Achievments</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link mx-2 text-uppercase"
                                    to='/community'>Community</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link mx-2 text-uppercase"
                                    to='/workspace'>Workspace</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link mx-2 text-uppercase"
                                    to='/login'>Login</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
}
export default Header