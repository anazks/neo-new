import React, { useEffect, useState } from 'react';
import { FiEye, FiEdit2, FiTrash2, FiSearch, FiFilter } from 'react-icons/fi';
import './ViewProducts.css';
import { getAllProduct } from '../../../../Services/Products';
import BaseURL from '../../../../Static/Static';
import { useNavigate } from 'react-router-dom';
import Loader from '../../../../Loader/Loader';

function ViewProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const productData = await getAllProduct();
        console.log(productData, "products in admin");
        setProducts(productData);
      } catch (error) {
        console.log(error, "error while fetching data");
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleView = (productId) => {
    console.log(`View product ${productId}`);
    navigate(`/admin/products/${productId}`); // Navigate to detailed view
  };

  const handleEdit = (productId) => {
    console.log(`Edit product ${productId}`);
    // Add your edit logic here
  };

  const handleDelete = (productId) => {
    console.log(`Delete product ${productId}`);
    // Add your delete logic here
  };

  // Filter products based on search term and category
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === '' || product.product_code === filterCategory;
    return matchesSearch && matchesCategory;
  });

  // Get unique categories for filter dropdown
  const categories = [...new Set(products.map(product => product.product_code))];

  if (loading) return <Loader />;
  if (error) return <div className="error-container">Error: {error}</div>;

  return (
    <div className="products-container dark-mode">
      <div className="products-header">
        <h2>Product Inventory</h2>
        <button className="add-product-btn">Add New Product</button>
      </div>
      
      <div className="products-filters">
        <div className="search-container">
          <FiSearch className="search-icon" />
          <input 
            type="text" 
            placeholder="Search products..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        
        <div className="filter-container">
          <FiFilter className="filter-icon" />
          <select 
            value={filterCategory} 
            onChange={(e) => setFilterCategory(e.target.value)}
            className="filter-select"
          >
            <option value="">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="products-stats">
        <div className="stat-card">
          <div className="stat-icon products">
            <FiEye />
          </div>
          <div className="stat-details">
            <h3>Total Products</h3>
            <p className="stat-number">{products.length}</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon out-of-stock">
            <FiFilter />
          </div>
          <div className="stat-details">
            <h3>Out of Stock</h3>
            <p className="stat-number">{products.filter(p => p.stock <= 0).length}</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon low-stock">
            <FiFilter />
          </div>
          <div className="stat-details">
            <h3>Low Stock</h3>
            <p className="stat-number">{products.filter(p => p.stock > 0 && p.stock < 10).length}</p>
          </div>
        </div>
      </div>
      
      <div className="products-table-container">
        <table className="products-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Category</th>
              <th>Stock</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <tr key={product._id || product.id}>
                  <td>
                    <img 
                      src={product.images?.[0]?.image ? BaseURL + product.images[0].image : "/api/placeholder/50/50"} 
                      alt={product.name} 
                      className="product-image" 
                    />
                  </td>
                  <td>{product.name}</td>
                  <td className="description-cell">{product.description}</td>
                  <td>Rs. {product.mrp}</td>
                  <td><span className="category-badge">{product.product_code}</span></td>
                  <td>
                    <span className={`stock-indicator ${
                      product.stock <= 0 ? 'no-stock' : 
                      product.stock < 10 ? 'low-stock' : 'in-stock'
                    }`}>
                      {product.stock}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button className="action-btn view" onClick={() => handleView(product.id || product._id)}>
                        <FiEye />
                      </button>
                      <button className="action-btn edit" onClick={() => handleEdit(product.id || product._id)}>
                        <FiEdit2 />
                      </button>
                      <button className="action-btn delete" onClick={() => handleDelete(product.id || product._id)}>
                        <FiTrash2 />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="no-products">No products found matching your criteria</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ViewProducts;