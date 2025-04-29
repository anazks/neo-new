import React, { useEffect, useState } from 'react';
import { FiEye, FiEdit2, FiTrash2, FiSearch, FiFilter } from 'react-icons/fi';
import './ViewProducts.css';
import { getAllProduct } from '../../../../Services/Products';
import BaseURL from '../../../../Static/Static';
import { useNavigate } from 'react-router-dom';
import Loader from '../../../../Loader/Loader';

function ProductInventory() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const navigate = useNavigate();

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
    navigate(`/admin/products/${productId}`);
  };

  const handleEdit = (productId) => {
    console.log(`Edit product ${productId}`);
    navigate(`/admin/Updateproducts/${productId}`); // Updated this line
  };

  const handleDelete = (productId) => {
    console.log(`Delete product ${productId}`);
    // Add your delete logic here
  };

  const addNewProduct = () => {
    try {
      navigate('/admin/AddProduct');
    } catch (error) {
      console.log(error);
    }
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
  if (error) return <div className="inventory-error">Error: {error}</div>;

  return (
    <div className="inventory-wrapper dark-theme">
      <div className="inventory-title-bar">
        <h2>Product Inventory</h2>
        <button className="inventory-create-btn" onClick={addNewProduct}>Add New Product</button>
      </div>
      
      <div className="inventory-control-panel">
        <div className="inventory-search-box">
          <FiSearch className="inventory-icon-search" />
          <input 
            type="text" 
            placeholder="Search products..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="inventory-search-field"
          />
        </div>
        
        <div className="inventory-filter-box">
          <FiFilter className="inventory-icon-filter" />
          <select 
            value={filterCategory} 
            onChange={(e) => setFilterCategory(e.target.value)}
            className="inventory-category-dropdown"
          >
            <option value="">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="inventory-metrics">
        <div className="inventory-metric-card">
          <div className="inventory-metric-icon total">
            <FiEye />
          </div>
          <div className="inventory-metric-data">
            <h3>Total Products</h3>
            <p className="inventory-metric-value">{products.length}</p>
          </div>
        </div>
        
        <div className="inventory-metric-card">
          <div className="inventory-metric-icon empty">
            <FiFilter />
          </div>
          <div className="inventory-metric-data">
            <h3>Out of Stock</h3>
            <p className="inventory-metric-value">{products.filter(p => p.stock <= 0).length}</p>
          </div>
        </div>
        
        <div className="inventory-metric-card">
          <div className="inventory-metric-icon warning">
            <FiFilter />
          </div>
          <div className="inventory-metric-data">
            <h3>Low Stock</h3>
            <p className="inventory-metric-value">{products.filter(p => p.stock > 0 && p.stock < 10).length}</p>
          </div>
        </div>
      </div>
      
      <div className="inventory-data-container">
        <table className="inventory-data-table">
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
                      className="inventory-product-img" 
                    />
                  </td>
                  <td>{product.name}</td>
                  <td className="inventory-description">{product.description}</td>
                  <td>Rs. {product.mrp}</td>
                  <td><span className="inventory-category-tag">{product.product_code}</span></td>
                  <td>
                    <span className={`inventory-stock-level ${
                      product.stock <= 0 ? 'empty' : 
                      product.stock < 10 ? 'warning' : 'available'
                    }`}>
                      {product.stock}
                    </span>
                  </td>
                  <td>
                    <div className="inventory-actions">
                      <button className="inventory-btn view" onClick={() => handleView(product.id || product._id)}>
                        <FiEye />
                      </button>
                      <button className="inventory-btn edit" onClick={() => handleEdit(product.id || product._id)}>
                        <FiEdit2 />
                      </button>
                      <button className="inventory-btn delete" onClick={() => handleDelete(product.id || product._id)}>
                        <FiTrash2 />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="inventory-empty-state">No products found matching your criteria</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProductInventory;