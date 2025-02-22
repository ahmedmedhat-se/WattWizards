import { useContext, useState, useEffect } from "react";
import { ProductContext } from "./ProductContext";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons/faCartShopping";

function Products() {
  const { products } = useContext(ProductContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const productsPerPage = 8;
  const filteredProducts = products.filter(product =>
    (selectedCategory === "All" || product.category === selectedCategory) &&
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const categories = ["All", ...new Set(products.map(product => product.category))];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="container text-light products-container" id="workspace">
      <h3 className="mt-4">Products</h3>
      
      {/* Filter Bar */}
      <div className="d-flex justify-content-between mb-3">
        <input
          type="text"
          placeholder="Search products..."
          className="form-control w-50"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="form-select w-25"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>
      
      {/* Products Grid */}
      <div className="row">
        {currentProducts.map((product) => (
          <div className="col-md-3 p-3" key={product.id}>
            <div className="card p-3 h-100">
              <div className="card-header">
                <img src={product.image} alt={product.name} className="card-img-top" />
              </div>
              <div className="card-body">
                <h5 className="card-name">{product.name}</h5>
                <p className="text-center">{product.category}</p>
                <p>Price: {product.price}<span className="dollar">$</span></p>
              </div>
              <div className="card-footer">
                <Link to="/cart" className="btn w-100 d-block">
                  <FontAwesomeIcon icon={faCartShopping} /> Cart
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Pagination Controls */}
      <div className="d-flex justify-content-center mt-4">
        <button
          className="btn btn-primary mx-2"
          onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="align-self-center">Page {currentPage} of {totalPages}</span>
        <button
          className="btn btn-primary mx-2"
          onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Products;