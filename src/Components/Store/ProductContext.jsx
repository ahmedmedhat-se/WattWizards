import axios from "axios";
const { createContext, useState, useEffect } = require("react");

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]);

    const getProductsFromStore = async () => {
        try {
            const request = await axios.get("/Store/productsData.json");
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