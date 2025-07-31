import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import "../styles/header.css";

function Header() {
    const location = useLocation();
    const navigate = useNavigate();
    const [scrolled, setScrolled] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredResults, setFilteredResults] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const routes = [
        { path: 'programs', name: 'Programs' },
        { path: 'achievments', name: 'Achievments' },
        {
            name: 'Workspace',
            dropdown: true,
            children: [
                { path: 'workspace/offline-sheets', name: 'Offline Workspace' },
                { path: 'workspace/online-sheets', name: 'Online Workspace' },
                { path: 'workspace/archive', name: 'Archive' },
            ]
        }
    ];

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        const cookies = document.cookie.split('; ');
        const userCookie = cookies.find(row => row.startsWith('token='));
        setIsLoggedIn(!!userCookie);
    }, [location]);

    const handleLogout = () => {
        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        setIsLoggedIn(false);
        navigate('/wattwizards');
    };

    useEffect(() => window.scrollTo(0, 0), [location]);

    useEffect(() => {
        if (searchTerm === '') {
            setFilteredResults([]);
            setSelectedIndex(-1);
        } else {
            const flatRoutes = routes.flatMap(route =>
                route.dropdown ? route.children : [route]
            );
            const filtered = flatRoutes.filter(route =>
                route.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredResults(filtered);
            setSelectedIndex(-1);
        }
    }, [searchTerm]);

    const handleSearchSelect = (path) => {
        setSearchTerm('');
        setFilteredResults([]);
        setSelectedIndex(-1);
        const foundRoute = path ? routes.flatMap(r => r.dropdown ? r.children : [r]).find(route => route.path === path) : null;
        navigate(foundRoute ? foundRoute.path : '/not-found');
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && selectedIndex >= 0 && selectedIndex < filteredResults.length) {
            handleSearchSelect(filteredResults[selectedIndex].path);
        } else if (e.key === 'ArrowDown' && selectedIndex < filteredResults.length - 1) {
            setSelectedIndex(prev => prev + 1);
        } else if (e.key === 'ArrowUp' && selectedIndex > 0) {
            setSelectedIndex(prev => prev - 1);
        }
    };

    const handleMouseEnter = (index) => setSelectedIndex(index);

    return (
        <>
            {/* Sidebar for large screens */}
            <aside className="d-none d-lg-flex header-sidebar flex-column">
                <Link className="brand" to="/wattwizards">
                    <strong>Watt<span>Wizards</span></strong>
                </Link>

                <nav className="nav flex-column mt-4">
                    {routes.map((route, index) => (
                        route.dropdown ? (
                            <div className="dropdown nav-item" key={index}>
                                <a
                                    className="nav-link dropdown-toggle"
                                    href="#"
                                    role="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    {route.name}
                                </a>
                                <ul className="dropdown-menu">
                                    {route.children.map((child, idx) => (
                                        <li key={idx}>
                                            <Link className="dropdown-item" to={child.path}>{child.name}</Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ) : (
                            <Link key={index} className="nav-link" to={route.path}>
                                {route.name}
                            </Link>
                        )
                    ))}
                </nav>

                <div className="search-container mt-4 px-3 position-relative">
                    <input
                        className="form-control"
                        type="search"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                    {searchTerm && (
                        <ul className="list-group position-absolute bg-white shadow w-100 rounded mt-1">
                            {filteredResults.length > 0 ? (
                                filteredResults.map((result, index) => (
                                    <li
                                        key={index}
                                        className={`list-group-item ${selectedIndex === index ? 'bg-primary text-light' : ''}`}
                                        onClick={() => handleSearchSelect(result.path)}
                                        onMouseEnter={() => handleMouseEnter(index)}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        {result.name}
                                    </li>
                                ))
                            ) : (
                                <li className="list-group-item text-muted" onClick={() => handleSearchSelect('/not-found')}>
                                    No results found
                                </li>
                            )}
                        </ul>
                    )}
                </div>

                <div className="mt-auto p-3">
                    <Link to="/wattwizards/profile" className="nav-link">
                        <i className="fas fa-user"></i> Profile
                    </Link>
                    {isLoggedIn ? (
                        <span className="nav-link text-danger" style={{ cursor: 'pointer' }} onClick={handleLogout}>
                            <i className="fas fa-door-closed"></i> Logout
                        </span>
                    ) : (
                        <Link to="/wattwizards/login" className="nav-link">
                            <i className="fas fa-door-open"></i> Login
                        </Link>
                    )}
                    <Link to="/wattwizards/products" className="nav-link">
                        <i className="fas fa-store"></i> Store
                    </Link>
                    <Link to="/wattwizards/products/cart" className="nav-link">
                        <i class="fas fa-cart-plus"></i> Cart
                    </Link>
                </div>
            </aside>

            {/* Top navbar for small screens */}
            <nav className={`navbar navbar-expand-lg p-4 shadow-sm fixed-top header-nav d-lg-none ${scrolled ? "scrolled" : ""}`}>
                <div className="container">
                    <Link className='navbar-brand text-light' to='/wattwizards'>
                        <strong>Watt<span>Wizards</span></strong>
                    </Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="offcanvas"
                        data-bs-target="#offcanvasNavbar"
                        aria-controls="offcanvasNavbar"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="offcanvas offcanvas-end text-light" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                        <div className="offcanvas-header">
                            <h5 className="offcanvas-title" id="offcanvasNavbarLabel">WattWizards</h5>
                            <button
                                type="button"
                                className="btn-close btn-close-white"
                                data-bs-dismiss="offcanvas"
                                aria-label="Close"
                            ></button>
                        </div>

                        <div className="offcanvas-body">
                            <ul className="navbar-nav justify-content-center flex-grow-1 pe-3">
                                {routes.map((route, index) => (
                                    route.dropdown ? (
                                        <li className="nav-item dropdown" key={index}>
                                            <span className="nav-link dropdown-toggle text-light text-uppercase" role="button" data-bs-toggle="dropdown">
                                                {route.name}
                                            </span>
                                            <ul className="dropdown-menu">
                                                {route.children.map((child, idx) => (
                                                    <li key={idx}>
                                                        <Link className="dropdown-item" to={child.path}>{child.name}</Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        </li>
                                    ) : (
                                        <li className="nav-item" key={index}>
                                            <Link className="nav-link text-light text-uppercase" to={route.path}>
                                                {route.name}
                                            </Link>
                                        </li>
                                    )
                                ))}
                            </ul>

                            <div className="position-relative w-100">
                                <input
                                    className="form-control bg-light text-dark"
                                    type="search"
                                    placeholder="Search..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                />
                                {searchTerm && (
                                    <ul className="list-group position-absolute bg-white shadow w-100 rounded mt-1" style={{ zIndex: 1050 }}>
                                        {filteredResults.length > 0 ? (
                                            filteredResults.map((result, index) => (
                                                <li
                                                    className={`list-group-item list-group-item-action ${selectedIndex === index ? 'bg-primary text-light' : ''}`}
                                                    key={index}
                                                    onClick={() => handleSearchSelect(result.path)}
                                                    onMouseEnter={() => handleMouseEnter(index)}
                                                    style={{ cursor: 'pointer' }}
                                                >
                                                    {result.name}
                                                </li>
                                            ))
                                        ) : (
                                            <li
                                                className="list-group-item list-group-item-action text-muted"
                                                onClick={() => handleSearchSelect('/not-found')}
                                                style={{ cursor: 'pointer' }}
                                            >
                                                No results found
                                            </li>
                                        )}
                                    </ul>
                                )}
                            </div>

                            <div className="d-flex align-items-center gap-3 mt-3">
                                <Link to="/wattwizards/profile" className="text-light fs-5" title="Profile">
                                    <i className="fas fa-user"></i>
                                </Link>
                                {isLoggedIn ? (
                                    <span className="text-danger fs-5" style={{ cursor: 'pointer' }} onClick={handleLogout} title="Logout">
                                        <i className="fas fa-door-closed"></i>
                                    </span>
                                ) : (
                                    <Link to="/wattwizards/login" className="text-light fs-5" title="Login">
                                        <i className="fas fa-door-open"></i>
                                    </Link>
                                )}
                                <Link to="/wattwizards/products" className="text-light fs-5" title="Store">
                                    <i className="fas fa-store"></i>
                                </Link>
                                <Link to="/wattwizards/products/cart" className="text-light fs-5" title="Store">
                                    <i className="fas fa-cart-plus"></i>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Header;