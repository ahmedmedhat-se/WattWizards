import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Cart = () => {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState('');

    const getSecurityProducts = async () => {
        try {
            const res = await axios.get("/Store/productsData.json");
            setProducts(res.data);
        } catch (error) {
            console.error("Error Fetching Data : ", error)
        }
    }

    useEffect(() => {
        getSecurityProducts();
    }, []);

    const handleProductChange = (e) => {
        setSelectedProduct(e.target.value);
    };

    return (
        <div className="container h-100" id="workspace">
            <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                    <div className="card" style={{ borderRadius: '15px' }}>
                        <div className="card-body p-5">
                            <h2 className="text-uppercase text-center text-dark mb-4">Product Selection</h2>

                            <form className='mb-4'>
                                {products.length > 0 ? (
                                    <div className="form-outline mb-4">
                                        <label htmlFor="productSelect" className="form-label">
                                            Choose a Product:
                                        </label>
                                        <select
                                            id="productSelect"
                                            className="form-control form-control-lg"
                                            value={selectedProduct}
                                            onChange={handleProductChange}
                                        >
                                            <option value="" disabled>
                                                Select a product
                                            </option>
                                            {products.map((product) => (
                                                <option key={product.id} className='text-dark' value={product.id}>
                                                    {product.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                ) : (
                                    <p>Loading products...</p>
                                )}

                                {selectedProduct && (
                                    <button type="button" className="btn btn-primary btn-block w-100 d-block mt-4">
                                        Add to Cart
                                    </button>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;