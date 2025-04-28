import React, { useEffect, useState } from 'react';
import './settings.css';
import Tax from '../Tax/Tax';
import { getBrand, deleteBrand, addBrand, getCategory, addCategory, deleteCategory, getTax } from '../../../Services/Settings';

function Settings() {
  const [showBrandPopup, setShowBrandPopup] = useState(false);
  const [showCategoryPopup, setShowCategoryPopup] = useState(false);
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [tax, setTax] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [toast, setToast] = useState({ show: false, message: '', type: '' });
  const [brandName, setBrandName] = useState('');
  const [categoryData, setCategoryData] = useState({ name: '', description: '', parent: '' });

  const fetchBrands = async () => {
    try {
      setIsLoading(true);
      const Totalbrands = await getBrand();
      setBrands(Totalbrands.data || []);
    } catch (error) {
      console.error("Error fetching brands:", error);
      setBrands([]);
      setError("Failed to load brands. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCategory = async () => {
    try {
      setIsLoading(true);
      const category = await getCategory();
      setCategories(category.data || []);
    } catch (error) {
      console.error(error);
      setCategories([]);
      setError("Failed to load categories. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchtax = async () => {
    try {
      const Taxes = await getTax();
      setTax(Taxes.data || []);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      await fetchBrands();
      await fetchCategory();
      await fetchtax();
    };
    loadData();
  }, []);

  const getParentCategoryName = (parentId) => {
    if (!parentId) return 'None';
    const parent = categories.find(cat => cat.id === parentId);
    return parent ? parent.name : 'Unknown';
  };

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast({ show: false, message: '', type: '' });
    }, 3000);
  };

  const handleBrandSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      await addBrand(brandName);
      await fetchBrands();
      setShowBrandPopup(false);
      setBrandName('');
      showToast('Brand added successfully!');
    } catch (error) {
      console.error(error);
      showToast('Failed to add brand. Please try again.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCategorySubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const newCategory = { name: categoryData.name, description: categoryData.description };
      await addCategory(newCategory);
      await fetchCategory();
      setShowCategoryPopup(false);
      setCategoryData({ name: '', description: '', parent: '' });
      showToast('Category added successfully!');
    } catch (error) {
      console.error(error);
      showToast('Failed to add category. Please try again.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCategoryChange = (e) => {
    const { name, value } = e.target;
    setCategoryData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleDeleteBrand = async (brandId) => {
    if (window.confirm('Are you sure you want to delete this brand?')) {
      try {
        setIsLoading(true);
        await deleteBrand(brandId);
        await fetchBrands();
        showToast('Brand deleted successfully!');
      } catch (error) {
        console.error(error);
        showToast('Failed to delete brand. Please try again.', 'error');
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      try {
        setIsLoading(true);
        await deleteCategory(categoryId);
        await fetchCategory();
        showToast('Category deleted successfully!');
      } catch (error) {
        console.error(error);
        showToast('Failed to delete category. Please try again.', 'error');
      } finally {
        setIsLoading(false);
      }
    }
  };

  if (isLoading && (!brands || !brands.length) && (!categories || !categories.length)) {
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
          <button className="btn-add dark" onClick={() => setShowBrandPopup(true)}>
            Add Brand
          </button>
        </div>

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
                {brands && brands.length > 0 ? (
                  brands.map((brand) => (
                    <tr key={brand.id}>
                      <td>{brand.id}</td>
                      <td>{brand.name}</td>
                      <td>
                        <button className="btn-delete dark" onClick={() => handleDeleteBrand(brand.id)} disabled={isLoading}>
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
          <button className="btn-add dark" onClick={() => setShowCategoryPopup(true)}>
            Add Category
          </button>
        </div>

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
                {categories && categories.length > 0 ? (
                  categories.map((category) => (
                    <tr key={category.id}>
                      <td>{category.id}</td>
                      <td>{category.name}</td>
                      <td>{category.description || 'No description'}</td>
                      <td>
                        <button className="btn-delete dark" onClick={() => handleDeleteCategory(category.id)} disabled={isLoading}>
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
              <button className="btn-close dark" onClick={() => setShowBrandPopup(false)} aria-label="Close">&times;</button>
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
                <button type="button" className="btn-cancel dark" onClick={() => setShowBrandPopup(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-next dark" disabled={!brandName.trim() || isLoading}>
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
              <button className="btn-close dark" onClick={() => setShowCategoryPopup(false)} aria-label="Close">&times;</button>
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
                <button type="button" className="btn-cancel dark" onClick={() => setShowCategoryPopup(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-next dark" disabled={!categoryData.name.trim() || isLoading}>
                  {isLoading ? 'Adding...' : 'Add Category'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Tax />
    </div>
  );
}

export default Settings;
