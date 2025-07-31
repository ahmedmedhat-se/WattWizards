import axios from "axios";
import { createContext, useState, useEffect } from "react";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]);

    const getProductsFromStore = async () => {
        try {
            const request = await axios.get("http://localhost:8086/products");
            setProducts(request.data);
        } catch (error) {
            console.error(`Error Fetching Data: ${error}`);
        }
    };

    useEffect(() => {
        getProductsFromStore();
    }, []);

    return (
        <ProductContext.Provider value={{ products }}>
            {children}
        </ProductContext.Provider>
    )
};