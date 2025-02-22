import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

function Header() {
    const location = useLocation();
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredResults, setFilteredResults] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(-1); // Track the selected result index

    const routes = [
        { path: '/programs', name: 'Programs' },
        { path: '/workspace', name: 'Workspace' },
        { path: '/products', name: 'Products' },
        { path: '/login', name: 'Login' },
        { path: '/profile', name: 'Profile' }
    ];

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);

    useEffect(() => {
        if (searchTerm === '') {
            setFilteredResults([]);
            setSelectedIndex(-1);
        } else {
            const filtered = routes.filter(route => route.name.toLowerCase().includes(searchTerm.toLowerCase()));
            setFilteredResults(filtered);
            setSelectedIndex(-1); // Reset selected index when search term changes
        }
    }, [searchTerm]);

    const handleSearchSelect = (path) => {
        setSearchTerm('');
        setFilteredResults([]);
        setSelectedIndex(-1); // Reset selected index

        const foundRoute = routes.find(route => route.path === path);
        if (foundRoute) {
            navigate(foundRoute.path);
        } else {
            navigate('/not-found');
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && selectedIndex >= 0 && selectedIndex < filteredResults.length) {
            // Trigger navigation for the selected result
            handleSearchSelect(filteredResults[selectedIndex].path);
        } else if (e.key === 'ArrowDown' && selectedIndex < filteredResults.length - 1) {
            // Move selection down
            setSelectedIndex(prevIndex => prevIndex + 1);
        } else if (e.key === 'ArrowUp' && selectedIndex > 0) {
            // Move selection up
            setSelectedIndex(prevIndex => prevIndex - 1);
        }
    };

    const handleMouseEnter = (index) => {
        // Highlight item when mouse hovers over it
        setSelectedIndex(index);
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark p-4 fixed-top shadow-sm">
            <div className="container">
                <Link className='navbar-brand text-light' to='/'>
                    <strong>WattWizards</strong>
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
                                <li className="nav-item" key={index}>
                                    <Link className="nav-link text-light text-uppercase" to={route.path}>
                                        {route.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>

                        {/* Search Bar */}
                        <div className="position-relative">
                            <input
                                className="form-control bg-light text-dark"
                                type="search"
                                placeholder="Search..."
                                aria-label="Search"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                onKeyDown={handleKeyDown} // Handle key press for navigation and selection
                            />
                            {searchTerm && (
                                <ul className="list-group position-absolute bg-white shadow w-100 rounded" style={{ top: '100%', left: 0, zIndex: 1050 }}>
                                    {filteredResults.length > 0 ? (
                                        filteredResults.map((result, index) => (
                                            <li 
                                                className={`list-group-item list-group-item-action ${selectedIndex === index ? 'bg-primary text-light' : ''}`} 
                                                key={index} 
                                                onClick={() => handleSearchSelect(result.path)}
                                                onMouseEnter={() => handleMouseEnter(index)} // Highlight on hover
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
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Header;
