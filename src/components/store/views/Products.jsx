import { useContext, useState, useEffect } from "react";
import { ProductContext } from "../context/ProductContext.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faSearch, faStar, faFilter } from "@fortawesome/free-solid-svg-icons";
import "../styles/products.css";
import { Link } from "react-router-dom";

function Products() {
    const { products } = useContext(ProductContext);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [isLoading, setIsLoading] = useState(true);
    const productsPerPage = 8;

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 800);
        return () => clearTimeout(timer);
    }, []);

    const filteredProducts = products.filter(product =>
        (selectedCategory === "All" || product.category === selectedCategory) &&
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
    const currentProducts = filteredProducts.slice(
        (currentPage - 1) * productsPerPage,
        currentPage * productsPerPage
    );
    const categories = ["All", ...new Set(products.map(product => product.category))];

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        setCurrentPage(1);
    }, [searchTerm, selectedCategory]);

    const handlePageChange = (page) => setCurrentPage(page);

    const addToCart = (product) => {
        const profile = JSON.parse(localStorage.getItem('profile')) || { email: 'guest' };
        const cartKey = `cart_${profile.email}`;
        
        const cart = JSON.parse(localStorage.getItem(cartKey)) || [];
        const exists = cart.find(p => p.id === product.id);
        
        if (!exists) {
            const updatedCart = [...cart, { ...product, quantity: 1 }];
            localStorage.setItem(cartKey, JSON.stringify(updatedCart));

            const notification = document.createElement('div');
            notification.className = 'cart-notification';
            notification.textContent = `${product.name} added to cart!`;
            document.body.appendChild(notification);

            setTimeout(() => {
                notification.classList.add('show');
            }, 10);

            setTimeout(() => {
                notification.classList.remove('show');
                setTimeout(() => {
                    document.body.removeChild(notification);
                }, 300);
            }, 2000);
        } else {
            const updatedCart = cart.map(p =>
                p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
            );
            localStorage.setItem(cartKey, JSON.stringify(updatedCart));
        }
    };

    if (isLoading) {
        return (
            <div className="container py-5 products-store">
                <div className="skeleton-loader">
                    <div className="skeleton-header"></div>
                    <div className="skeleton-filters">
                        <div className="skeleton-filter"></div>
                        <div className="skeleton-filter"></div>
                    </div>
                    <div className="skeleton-grid">
                        {[...Array(8)].map((_, i) => (
                            <div key={i} className="skeleton-card">
                                <div className="skeleton-image"></div>
                                <div className="skeleton-text"></div>
                                <div className="skeleton-text"></div>
                                <div className="skeleton-button"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="container py-5 products-store">
            <h2 className="text-center mb-5 section-title">
                <span>Explore Our Premium Collection</span>
            </h2>

            <div className="search-filter-container">
                <div className="search-box">
                    <FontAwesomeIcon icon={faSearch} className="search-icon" />
                    <input
                        type="text"
                        className="search-input"
                        placeholder="Search products..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="filter-box">
                    <FontAwesomeIcon icon={faFilter} className="filter-icon" />
                    <select
                        className="filter-select"
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                        {categories.map((cat) => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                </div>
            </div>

            {currentProducts.length > 0 ? (
                <div className="products-grid">
                    {currentProducts.map((product) => (
                        <div className="product-card-wrapper" key={product.id}>
                            <div className="product-card">
                                <div className="product-badge">
                                    {product.isNew && <span className="new-badge">New</span>}
                                    {product.isFeatured && <span className="featured-badge">Featured</span>}
                                </div>

                                <div className="product-image-container">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="product-image"
                                    />
                                    <Link className="quick-view" to={`/wattwizards/products/${product.id}`}>
                                        Quick View
                                    </Link>
                                </div>

                                <div className="product-info">
                                    <div className="product-category">{product.category}</div>
                                    <h3 className="product-title">{product.name}</h3>

                                    <div className="product-rating">
                                        {[...Array(5)].map((_, i) => (
                                            <FontAwesomeIcon
                                                key={i}
                                                icon={faStar}
                                                className={`star ${i < (product.rating || 4) ? 'filled' : ''}`}
                                            />
                                        ))}
                                        <span className="rating-count">({product.reviewCount || 12})</span>
                                    </div>

                                    <div className="product-price">
                                        ${product.price}
                                        {product.originalPrice && (
                                            <span className="original-price">${product.originalPrice}</span>
                                        )}
                                    </div>
                                </div>

                                <button
                                    onClick={() => addToCart(product)}
                                    className="add-to-cart-btn"
                                >
                                    <FontAwesomeIcon icon={faCartShopping} className="cart-icon" />
                                    <span>Add to Cart</span>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="no-products">
                    <div className="no-products-icon">🔍</div>
                    <h3>No products found</h3>
                    <p>Try adjusting your search or filter criteria</p>
                    <button
                        className="reset-filters-btn"
                        onClick={() => {
                            setSearchTerm("");
                            setSelectedCategory("All");
                        }}
                    >
                        Reset Filters
                    </button>
                </div>
            )}

            {totalPages > 1 && (
                <div className="pagination">
                    <button
                        className={`pagination-btn ${currentPage === 1 ? 'disabled' : ''}`}
                        onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
                        disabled={currentPage === 1}
                    >
                        Previous
                    </button>

                    <div className="page-numbers">
                        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                            let pageNum;
                            if (totalPages <= 5) {
                                pageNum = i + 1;
                            } else if (currentPage <= 3) {
                                pageNum = i + 1;
                            } else if (currentPage >= totalPages - 2) {
                                pageNum = totalPages - 4 + i;
                            } else {
                                pageNum = currentPage - 2 + i;
                            }

                            return (
                                <button
                                    key={pageNum}
                                    className={`page-btn ${currentPage === pageNum ? 'active' : ''}`}
                                    onClick={() => handlePageChange(pageNum)}
                                >
                                    {pageNum}
                                </button>
                            );
                        })}

                        {totalPages > 5 && currentPage < totalPages - 2 && (
                            <span className="page-dots">...</span>
                        )}

                        {totalPages > 5 && currentPage < totalPages - 2 && (
                            <button
                                className={`page-btn ${currentPage === totalPages ? 'active' : ''}`}
                                onClick={() => handlePageChange(totalPages)}
                            >
                                {totalPages}
                            </button>
                        )}
                    </div>

                    <button
                        className={`pagination-btn ${currentPage === totalPages ? 'disabled' : ''}`}
                        onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
                        disabled={currentPage === totalPages}
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
}

export default Products;