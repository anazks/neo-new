import React, { useEffect, useState } from 'react';
import { FiEye, FiEdit2, FiTrash2, FiSearch, FiFilter, FiPlus, FiAlertTriangle } from 'react-icons/fi';
import { getAllProduct } from '../../../../Services/Products';
import BaseURL from '../../../../Static/Static';
import { useNavigate } from 'react-router-dom';
import Loader from '../../../../Loader/Loader';
import { productDelete } from '../../../../Services/Products';

function ProductInventory() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [deleteConfirmation, setDeleteConfirmation] = useState({
    isOpen: false,
    productId: null,
    productName: ''
  });
  const [deleteLoading, setDeleteLoading] = useState(false);
  
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const productData = await getAllProduct();
      setProducts(productData);
    } catch (error) {
      console.log(error, "error while fetching data");
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleView = (productId) => {
    navigate(`/admin/products/${productId}`);
  };

  const handleEdit = (productId) => {
    navigate(`/admin/Updateproducts/${productId}`);
  };

  const openDeleteConfirmation = (productId, productName) => {
    setDeleteConfirmation({
      isOpen: true,
      productId,
      productName
    });
  };

  const closeDeleteConfirmation = () => {
    setDeleteConfirmation({
      isOpen: false,
      productId: null,
      productName: ''
    });
  };

  const confirmDelete = async () => {
    if (!deleteConfirmation.productId) return;
    
    try {
      setDeleteLoading(true);
      await productDelete(deleteConfirmation.productId);
      // Refresh product list after deletion
      await fetchProducts();
      closeDeleteConfirmation();
    } catch (error) {
      console.error("Error deleting product:", error);
      setError("Failed to delete product. Please try again.");
    } finally {
      setDeleteLoading(false);
    }
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

  // Delete Confirmation Dialog Component
  const DeleteConfirmationDialog = () => {
    if (!deleteConfirmation.isOpen) return null;
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4">
        <div className="bg-gray-800 rounded-lg shadow-xl max-w-md w-full mx-auto">
          <div className="px-6 py-4 border-b border-gray-700 flex items-center">
            <FiAlertTriangle className="text-red-500 text-xl mr-3" />
            <h3 className="text-lg font-medium text-white">Confirm Deletion</h3>
          </div>
          <div className="p-6">
            <p className="text-gray-300 mb-4">
              Are you sure you want to delete this product?
              <span className="block mt-2 font-medium text-white">{deleteConfirmation.productName}</span>
            </p>
            <p className="text-red-400 text-sm mb-6">This action cannot be undone.</p>
            
            <div className="flex justify-end space-x-3">
              <button
                onClick={closeDeleteConfirmation}
                disabled={deleteLoading}
                className="px-4 py-2 text-sm font-medium text-gray-300 bg-gray-700 hover:bg-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                disabled={deleteLoading}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 disabled:bg-red-800 disabled:opacity-70"
              >
                {deleteLoading ? 'Deleting...' : 'Yes, Delete'}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (loading) return <Loader />;
  if (error) return <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4 font-medium">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-6 font-rajdhani">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Product Inventory</h2>
        <button 
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-medium flex items-center"
          onClick={addNewProduct}
        >
          <FiPlus className="mr-2" />
          Add New Product
        </button>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiSearch className="text-gray-400" />
          </div>
          <input 
            type="text" 
            placeholder="Search products..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiFilter className="text-gray-400" />
          </div>
          <select 
            value={filterCategory} 
            onChange={(e) => setFilterCategory(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
          >
            <option value="">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-gray-800 rounded-lg p-4 flex items-start">
          <div className="bg-blue-600 bg-opacity-20 p-3 rounded-full mr-4">
            <FiEye className="text-blue-400 text-xl" />
          </div>
          <div>
            <h3 className="text-gray-400 text-sm font-medium">Total Products</h3>
            <p className="text-2xl font-bold my-1">{products.length}</p>
          </div>
        </div>
        
        <div className="bg-gray-800 rounded-lg p-4 flex items-start">
          <div className="bg-red-600 bg-opacity-20 p-3 rounded-full mr-4">
            <FiFilter className="text-red-400 text-xl" />
          </div>
          <div>
            <h3 className="text-gray-400 text-sm font-medium">Out of Stock</h3>
            <p className="text-2xl font-bold my-1 text-red-400">
              {products.filter(p => p.stock <= 0).length}
            </p>
          </div>
        </div>
        
        <div className="bg-gray-800 rounded-lg p-4 flex items-start">
          <div className="bg-yellow-600 bg-opacity-20 p-3 rounded-full mr-4">
            <FiFilter className="text-yellow-400 text-xl" />
          </div>
          <div>
            <h3 className="text-gray-400 text-sm font-medium">Low Stock</h3>
            <p className="text-2xl font-bold my-1 text-yellow-400">
              {products.filter(p => p.stock > 0 && p.stock < 10).length}
            </p>
          </div>
        </div>
      </div>
      
      <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
        <div className="overflow-x-auto">
          <table className="min-w-full bg-gray-800">
            <thead className="bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Image</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Available</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Product Code</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Stock</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <tr key={product._id || product.id} className="hover:bg-gray-750">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <img 
                        src={product.images?.[0]?.image ? BaseURL + product.images[0].image : "/api/placeholder/50/50"} 
                        alt={product.name} 
                        className="w-12 h-12 rounded-md object-cover bg-gray-700" 
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap font-medium">{product.name}</td>
                    <td className="px-6 py-4 max-w-xs truncate">{product.is_available ? (<><span style={{color:"green"}}>Yes</span></>): (<><span style={{color:"red"}}>No</span></>)}</td>
                    <td className="px-6 py-4 whitespace-nowrap">Rs. {product.mrp}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="bg-gray-700 text-purple-400 px-2 py-1 rounded text-xs font-medium">
                        {product.product_code}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        product.stock <= 0 ? 'bg-red-900 bg-opacity-20 text-red-400' : 
                        product.stock < 10 ? 'bg-yellow-900 bg-opacity-20 text-yellow-400' : 
                        'bg-green-900 bg-opacity-20 text-green-400'
                      }`}>
                        {product.stock}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex space-x-2">
                        <button 
                          className="text-blue-400 hover:text-blue-300 p-1 rounded hover:bg-gray-700"
                          onClick={() => handleView(product.id || product._id)}
                        >
                          <FiEye className="text-lg" />
                        </button>
                        <button 
                          className="text-yellow-400 hover:text-yellow-300 p-1 rounded hover:bg-gray-700"
                          onClick={() => handleEdit(product.id || product._id)}
                        >
                          <FiEdit2 className="text-lg" />
                        </button>
                        <button 
                          className="text-red-400 hover:text-red-300 p-1 rounded hover:bg-gray-700"
                          onClick={() => openDeleteConfirmation(product.id || product._id, product.name)}
                        >
                          <FiTrash2 className="text-lg" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="px-6 py-4 text-center">
                    <div className="text-center py-8">
                      <h4 className="text-lg font-medium mb-2">No products found</h4>
                      <p className="text-gray-400">No products match your search criteria</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Delete Confirmation Dialog */}
      <DeleteConfirmationDialog />
    </div>
  );
}

export default ProductInventory;