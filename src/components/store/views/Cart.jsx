import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/cart.css";

function Cart() {
    const [cartItems, setCartItems] = useState([]);
    const navigate = useNavigate();
    const [userEmail, setUserEmail] = useState('guest');

    useEffect(() => {
        const profile = JSON.parse(localStorage.getItem('profile')) || { email: 'guest' };
        setUserEmail(profile.email);
        
        const cartKey = `cart_${profile.email}`;
        const items = JSON.parse(localStorage.getItem(cartKey)) || [];
        setCartItems(items);
    }, []);

    const removeFromCart = (productId) => {
        const updatedCart = cartItems.filter(item => item.id !== productId);
        setCartItems(updatedCart);
        localStorage.setItem(`cart_${userEmail}`, JSON.stringify(updatedCart));
    };

    const handleContinueShopping = () => {
        navigate('/wattwizards/products');
    };

    const handleCheckout = () => {
        navigate('/wattwizards/checkout');
    };

    if (cartItems.length === 0) {
        return (
            <div className="container-fluid cart-page p-5">
                <div className="empty-cart-message">
                    <div className="empty-cart-icon">🛒</div>
                    <h3 className="empty-cart-text">Your cart is empty</h3>
                    <button
                        className="btn btn-light mt-3"
                        onClick={handleContinueShopping}
                    >
                        Continue Shopping
                    </button>
                </div>
            </div>
        );
    }

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => {
            return total + (item.price * (item.quantity || 1));
        }, 0).toFixed(2);
    };

    return (
        <div className="container-fluid cart-page p-5">
            <h2 className="cart-title">Your Cart</h2>

            <div className="cart-items-container">
                {cartItems.map((item) => (
                    <div className="cart-item" key={item.id}>
                        <div className="cart-item-card">
                            <div className="row g-0">
                                <div className="col-md-5">
                                    <div className="item-image-container">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="item-image"
                                        />
                                    </div>
                                </div>
                                <div className="col-md-7">
                                    <div className="item-details">
                                        <h3 className="item-name">{item.name}</h3>
                                        <p className="item-category">{item.category}</p>
                                        <div className="ratings">
                                            {Array.from({ length: 5 }, (_, index) => (
                                                <span
                                                    key={index}
                                                    className={`star ${index < (item.ratings || 3) ? 'filled' : ''}`}
                                                >
                                                    ★
                                                </span>
                                            ))}
                                        </div>
                                        <p className="item-price">${item.price} × {item.quantity || 1} = ${(item.price * (item.quantity || 1)).toFixed(2)}</p>
                                        <div className="quantity-selector">
                                            <label htmlFor={`quantity-${item.id}`}>
                                                Quantity:
                                            </label>
                                            <input
                                                type="number"
                                                id={`quantity-${item.id}`}
                                                min="1"
                                                value={item.quantity || 1}
                                                readOnly
                                            />
                                        </div>
                                        <div className="item-actions">
                                            <button 
                                                className="btn btn-danger me-2"
                                                onClick={() => removeFromCart(item.id)}
                                            >
                                                Remove Item
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="cart-summary">
                <h4 className="total-amount">Total: ${calculateTotal()}</h4>
                <button 
                    className="btn btn-primary checkout-btn"
                    onClick={handleCheckout}
                >
                    Proceed to Checkout
                </button>
            </div>
        </div>
    );
}

export default Cart;