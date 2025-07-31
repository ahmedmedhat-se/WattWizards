import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "../styles/user-profile.css";
import logo from "../assets/logo.png";

function Profile() {
    const navigate = useNavigate();
    const [profile, setProfile] = useState({
        name: 'Username',
        email: 'userhandle@domain.com',
        image: logo,
        bio: 'Example Bio...'
    });
    const [files, setFiles] = useState([]);
    const [editing, setEditing] = useState(false);
    const [cartItems, setCartItems] = useState([]);

    // 1. BULLETPROOF CART LOADING
    const loadCartItems = (forceEmail = null) => {
        const userEmail = forceEmail || profile.email || 'guest';
        const sanitizedEmail = userEmail.replace(/[@.]/g, '_');
        const cartKey = `user_cart_${sanitizedEmail}`;
        
        try {
            const cart = JSON.parse(localStorage.getItem(cartKey)) || [];
            console.log(`🛒 Loading cart for ${userEmail} (key: ${cartKey})`, cart);
            setCartItems(cart);
            return cartKey;
        } catch (error) {
            console.error('Failed to load cart:', error);
            localStorage.removeItem(cartKey);
            setCartItems([]);
            return cartKey;
        }
    };

    // 2. AUTHENTICATION HANDLER
    useEffect(() => {
        const handleAuth = async () => {
            try {
                const xhr = new XMLHttpRequest();
                xhr.onload = () => {
                    if (xhr.status === 200) {
                        const userData = JSON.parse(xhr.response);
                        
                        // Set auth token
                        if (userData.token) {
                            document.cookie = `token=${userData.token}; path=/; SameSite=Strict; Secure`;
                        }

                        // Update profile
                        const updatedProfile = {
                            name: userData.email.split('@')[0],
                            email: userData.email,
                            image: userData.image || 'https://via.placeholder.com/150',
                            bio: profile.bio
                        };
                        setProfile(updatedProfile);
                        setFiles(userData.files || []);

                        // Handle cart transition
                        const newCartKey = loadCartItems(userData.email);
                        console.log('🔑 New cart key:', newCartKey);

                        // Migrate guest cart if exists
                        const guestCart = localStorage.getItem('user_cart_guest');
                        if (guestCart && userData.email) {
                            console.log('🔄 Migrating guest cart to user cart');
                            localStorage.setItem(newCartKey, guestCart);
                            localStorage.removeItem('user_cart_guest');
                            loadCartItems(userData.email);
                        }
                    }
                };
                xhr.onerror = () => console.error('Auth request failed');
                xhr.open('GET', 'http://localhost:8086/profile', true);
                xhr.withCredentials = true;
                xhr.send();
            } catch (error) {
                console.error('Auth error:', error);
                loadCartItems('guest');
            }
        };

        // Initial load
        if (document.cookie.includes('token=')) {
            console.log('🔐 Authenticated user detected');
            handleAuth();
        } else {
            console.log('👤 No auth token - loading guest session');
            loadCartItems('guest');
        }
    }, []);

    // 3. CART SYNC SYSTEM
    useEffect(() => {
        const handleCartSync = () => {
            if (profile.email && profile.email !== 'userhandle@domain.com') {
                console.log('🔄 Syncing cart for:', profile.email);
                loadCartItems();
            }
        };
        handleCartSync();
    }, [profile.email]);

    // 4. CART OPERATIONS
    const removeFromCart = (productId) => {
        const userEmail = profile.email || 'guest';
        const cartKey = `user_cart_${userEmail.replace(/[@.]/g, '_')}`;
        
        const updatedCart = cartItems.filter(item => item.id !== productId);
        console.log('🗑️ Removing item from cart:', productId);
        
        localStorage.setItem(cartKey, JSON.stringify(updatedCart));
        setCartItems(updatedCart);
    };

    const calculateCartTotal = () => {
        return cartItems.reduce((total, item) => 
            total + (item.price * (item.quantity || 1)), 
        0).toFixed(2);
    };

    // 5. PROFILE MANAGEMENT
    const saveProfile = () => {
        localStorage.setItem('profile', JSON.stringify(profile));
        setEditing(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile(prev => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfile(prev => ({ ...prev, image: reader.result }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDeleteFile = (filename) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = () => window.location.reload();
        xhr.onerror = () => console.error('Delete failed');
        xhr.open('DELETE', `http://localhost:8086/files/${filename}`, true);
        xhr.withCredentials = true;
        xhr.send();
    };

    return (
        <div className="user-profile container-fluid p-3">
            <div className="card">
                <div className="card-body">
                    <div className="row">
                        <div className="col-lg-4 col-md-6 text-center mb-4 profile-info">
                            <img
                                src={profile.image}
                                alt="Profile"
                                className="rounded-circle img-thumbnail"
                                style={{ width: '150px', height: '150px' }}
                            />
                            <h5 className="mt-3">
                                {editing ? (
                                    <input
                                        type="text"
                                        name="name"
                                        value={profile.name}
                                        onChange={handleChange}
                                        className="form-control"
                                    />
                                ) : (
                                    profile.name
                                )}
                            </h5>
                            <p className="text-muted">
                                {editing ? (
                                    <input
                                        type="email"
                                        name="email"
                                        value={profile.email}
                                        onChange={handleChange}
                                        className="form-control"
                                        disabled={!editing}
                                    />
                                ) : (
                                    profile.email || 'guest@session'
                                )}
                            </p>

                            <div className="container-fluid mb-2">
                                <a href="/Documents/WattWizards-User-Manual.pdf" download>
                                    <button className="btn btn-dark w-100">User Manual</button>
                                </a>
                            </div>

                            <Link to="/wattwizards/project" className="btn btn-primary w-100">
                                Project Manager
                            </Link>

                            {editing && (
                                <div className="mt-3">
                                    <input 
                                        type="file" 
                                        className="form-control" 
                                        onChange={handleImageChange}
                                        accept="image/*"
                                    />
                                </div>
                            )}
                        </div>

                        <div className="col-lg-8 col-md-6 profile-details">
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <h4>About Me</h4>
                            </div>

                            {editing ? (
                                <textarea
                                    name="bio"
                                    value={profile.bio}
                                    onChange={handleChange}
                                    className="form-control"
                                    rows="5"
                                />
                            ) : (
                                <p>{profile.bio}</p>
                            )}

                            <hr />

                            <h5>Recent Files</h5>
                            <ul className="list-group mb-3">
                                {files.length > 0 ? (
                                    files.map((file, index) => (
                                        <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                                            <strong>{file.name}</strong>
                                            <div>
                                                <Link
                                                    to={`http://localhost:8086/files/${file.name}`}
                                                    download
                                                    className="btn btn-sm btn-primary me-2"
                                                >
                                                    Download
                                                </Link>
                                                <button
                                                    onClick={() => handleDeleteFile(file.name)}
                                                    className="btn btn-sm btn-danger"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </li>
                                    ))
                                ) : (
                                    <li className="list-group-item text-muted">No files uploaded</li>
                                )}
                            </ul>

                            <hr />

                            <h4>🛒 Your Cart</h4>
                            {cartItems.length > 0 ? (
                                <>
                                    <ul className="list-group mb-3">
                                        {cartItems.map((item) => (
                                            <li key={item.id} className="list-group-item">
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <div>
                                                        <strong>{item.name}</strong>
                                                        <div className="text-muted small">{item.category}</div>
                                                        <div className="small">Qty: {item.quantity || 1}</div>
                                                    </div>
                                                    <div className="d-flex align-items-center">
                                                        <span className="badge bg-success me-2">
                                                            ${(item.price * (item.quantity || 1)).toFixed(2)}
                                                        </span>
                                                        <button
                                                            onClick={() => removeFromCart(item.id)}
                                                            className="btn btn-sm btn-outline-danger"
                                                        >
                                                            ×
                                                        </button>
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                    <div className="d-flex justify-content-between align-items-center mb-3">
                                        <h5>Total: ${calculateCartTotal()}</h5>
                                        <button
                                            onClick={() => navigate('/wattwizards/products/cart')}
                                            className="btn btn-primary"
                                        >
                                            View Full Cart
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <div className="text-center py-3">
                                    <p className="text-muted">Your cart is empty</p>
                                    <button
                                        onClick={() => navigate('/wattwizards/products')}
                                        className="btn btn-outline-primary"
                                    >
                                        Browse Products
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="text-center mt-4">
                        {editing ? (
                            <button onClick={saveProfile} className="btn btn-success me-2">
                                Save Changes
                            </button>
                        ) : (
                            <button onClick={() => setEditing(true)} className="btn btn-warning">
                                Edit Profile
                            </button>
                        )}
                        {editing && (
                            <button onClick={() => setEditing(false)} className="btn btn-secondary">
                                Cancel
                            </button>
                        )}
                    </div>

                    <div className="debug-panel mt-4 p-3 bg-dark text-white rounded">
                        <h5>System Debug</h5>
                        <div className="row">
                            <div className="col-md-4">
                                <p><strong>User:</strong> {profile.email || 'guest'}</p>
                                <p><strong>Cart Key:</strong> user_cart_{profile.email ? profile.email.replace(/[@.]/g, '_') : 'guest'}</p>
                            </div>
                            <div className="col-md-4">
                                <p><strong>Items:</strong> {cartItems.length}</p>
                                <p><strong>Auth:</strong> {document.cookie.includes('token=') ? 'Logged In' : 'Guest'}</p>
                            </div>
                            <div className="col-md-4">
                                <button
                                    onClick={() => {
                                        console.log('Current Cart:', cartItems);
                                        console.log('Storage:', localStorage);
                                    }}
                                    className="btn btn-sm btn-info"
                                >
                                    Debug Data
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Profile;