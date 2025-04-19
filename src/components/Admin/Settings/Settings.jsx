import React, { useEffect, useState } from 'react'
import './settings.css' // Import your main CSS file
import Tax from '../Tax/Tax';
import { getBrand, deleteBrand, addBrand, getCategory, addCategory, deleteCategory, getTax } from '../../../Services/Settings'
// Icons can be imported from a library like react-icons
// import { FaPlus, FaTrash, FaTimes, FaSpinner } from 'react-icons/fa'

function Settings() {
  // State for popup visibility
  const [showBrandPopup, setShowBrandPopup] = useState(false);
  const [showCategoryPopup, setShowCategoryPopup] = useState(false);
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [tax, setTax] = useState([]);

  // Loading and error states
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [toast, setToast] = useState({ show: false, message: '', type: '' });

  // State for form data
  const [brandName, setBrandName] = useState('');
  const [categoryData, setCategoryData] = useState({
    name: '',
    description: '',
    parent: ''
  });

  const fetchBrands = async () => {
    try {
      setIsLoading(true);
      const Totalbrands = await getBrand();
      setBrands(Totalbrands.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching brands:", error);
      setError("Failed to load brands. Please try again.");
      setIsLoading(false);
    }
  };

  const fetchCategory = async () => {
    try {
      setIsLoading(true);
      let category = await getCategory()
      setCategories(category.data)
      setIsLoading(false);
    } catch (error) {
      console.log(error)
      setError("Failed to load categories. Please try again.");
      setIsLoading(false);
    }
  }

  const fetchtax = async () => {
    try {
      let Taxes = await getTax()
      setTax(Taxes.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    // Created wrapper function since useEffect callback shouldn't be async directly
    const loadData = () => {
      fetchBrands();
      fetchCategory();
      fetchtax();
    };
    loadData();
  }, []);
  
  // Function to find parent category name by id
  const getParentCategoryName = (parentId) => {
    if (!parentId) return 'None';
    const parent = categories.find(cat => cat.id === parentId);
    return parent ? parent.name : 'Unknown';
  };

  // Show toast notification
  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast({ show: false, message: '', type: '' });
    }, 3000);
  };

  // Handler functions for form submission
  const handleBrandSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const newBrand = {
        name: brandName
      };
      let addedBrand = await addBrand(newBrand.name);
      fetchBrands();
      setShowBrandPopup(false);
      setBrandName('');
      showToast('Brand added successfully!');
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      showToast('Failed to add brand. Please try again.', 'error');
    }
  };

  const handleCategorySubmit = async(e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const newCategory = {
        name: categoryData.name,
        description: categoryData.description,
      };
      let addedCate = await addCategory(newCategory);
      fetchCategory();
      setShowCategoryPopup(false);
      setCategoryData({ name: '', description: '', parent: '' });
      showToast('Category added successfully!');
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      showToast('Failed to add category. Please try again.', 'error');
    }
  };

  // Handler for input changes
  const handleCategoryChange = (e) => {
    const { name, value } = e.target;
    setCategoryData({
      ...categoryData,
      [name]: value
    });
  };

  // Handler for deleting a brand
  const handleDeleteBrand = async (brandId) => {
    if (window.confirm('Are you sure you want to delete this brand?')) {
      try {
        setIsLoading(true);
        let deleteD = await deleteBrand(brandId);
        fetchBrands();
        showToast('Brand deleted successfully!');
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
        showToast('Failed to delete brand. Please try again.', 'error');
      }
    }
  };

  // Handler for deleting a category
  const handleDeleteCategory = async (categoryId) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      try {
        setIsLoading(true);
        let catedelete = await deleteCategory(categoryId);
        fetchCategory();
        showToast('Category deleted successfully!');
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        showToast('Failed to delete category. Please try again.', 'error');
      }
    }
  };

  // Render loading spinner
  if (isLoading && !brands.length && !categories.length) {
    return (
      <div className="settings-container dark-mode">
        <div className="loading-spinner">
          <div className="spinner"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="settings-container dark-mode">
      <h2>Settings</h2>
      
      {/* Toast Notification */}
      {toast.show && (
        <div className="toast-container">
          <div className={`toast ${toast.type}`}>
            {toast.message}
          </div>
        </div>
      )}
      
      {/* Brands Section */}
      <div className="settings-section">
        <div className="section-header">
          <h3>Brands</h3>
          <button 
            className="btn-add dark" 
            onClick={() => setShowBrandPopup(true)}
          >
            Add Brand
          </button>
        </div>
        
        {/* Brands Table */}
        <div className="table-responsive">
          {error ? (
            <div className="error-message">{error}</div>
          ) : (
            <table className="data-table dark">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Brand Name</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {brands.length > 0 ? (
                  brands.map((brand) => (
                    <tr key={brand.id}>
                      <td>{brand.id}</td>
                      <td>{brand.name}</td>
                      <td>
                        <button 
                          className="btn-delete dark"
                          onClick={() => handleDeleteBrand(brand.id)}
                          disabled={isLoading}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="no-data">
                      <div className="empty-state">
                        <h4>No Brands Found</h4>
                        <p>You haven't added any brands yet. Click "Add Brand" to create your first brand.</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
      
      {/* Categories Section */}
      <div className="settings-section">
        <div className="section-header">
          <h3>Categories</h3>
          <button 
            className="btn-add dark" 
            onClick={() => setShowCategoryPopup(true)}
          >
            Add Category
          </button>
        </div>
        
        {/* Categories Table */}
        <div className="table-responsive">
          {error ? (
            <div className="error-message">{error}</div>
          ) : (
            <table className="data-table dark">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {categories.length > 0 ? (
                  categories.map((category) => (
                    <tr key={category.id}>
                      <td>{category.id}</td>
                      <td>{category.name}</td>
                      <td>{category.description || 'No description'}</td>
                      <td>
                        <button 
                          className="btn-delete dark"
                          onClick={() => handleDeleteCategory(category.id)}
                          disabled={isLoading}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="no-data">
                      <div className="empty-state">
                        <h4>No Categories Found</h4>
                        <p>You haven't added any categories yet. Click "Add Category" to create your first category.</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Brand Popup */}
      {showBrandPopup && (
        <div className="popup-overlay dark">
          <div className="popup-content dark">
            <div className="popup-header">
              <h3>Add New Brand</h3>
              <button 
                className="btn-close dark" 
                onClick={() => setShowBrandPopup(false)}
                aria-label="Close"
              >
                &times;
              </button>
            </div>
            
            <form onSubmit={handleBrandSubmit}>
              <div className="form-group">
                <label htmlFor="brandName">Brand Name</label>
                <input
                  type="text"
                  id="brandName"
                  value={brandName}
                  onChange={(e) => setBrandName(e.target.value)}
                  className="dark-input"
                  required
                  placeholder="Enter brand name"
                  autoFocus
                />
              </div>
              
              <div className="popup-actions">
                <button 
                  type="button" 
                  className="btn-cancel dark"
                  onClick={() => setShowBrandPopup(false)}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="btn-next dark"
                  disabled={!brandName.trim() || isLoading}
                >
                  {isLoading ? 'Adding...' : 'Add Brand'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Category Popup */}
      {showCategoryPopup && (
        <div className="popup-overlay dark">
          <div className="popup-content dark">
            <div className="popup-header">
              <h3>Add New Category</h3>
              <button 
                className="btn-close dark" 
                onClick={() => setShowCategoryPopup(false)}
                aria-label="Close"
              >
                &times;
              </button>
            </div>
            
            <form onSubmit={handleCategorySubmit}>
              <div className="form-group">
                <label htmlFor="categoryName">Name</label>
                <input
                  type="text"
                  id="categoryName"
                  name="name"
                  value={categoryData.name}
                  onChange={handleCategoryChange}
                  className="dark-input"
                  required
                  placeholder="Enter category name"
                  autoFocus
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="categoryDescription">Description</label>
                <textarea
                  id="categoryDescription"
                  name="description"
                  value={categoryData.description}
                  onChange={handleCategoryChange}
                  rows="3"
                  className="dark-input"
                  placeholder="Enter category description (optional)"
                ></textarea>
              </div>
              
              <div className="popup-actions">
                <button 
                  type="button" 
                  className="btn-cancel dark"
                  onClick={() => setShowCategoryPopup(false)}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="btn-next dark"
                  disabled={!categoryData.name.trim() || isLoading}
                >
                  {isLoading ? 'Adding...' : 'Add Category'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Tax/>
    </div>
  );
}

export default Settings;