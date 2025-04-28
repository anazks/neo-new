import React, { useState, useEffect } from 'react';
import './addp.css';
import { getBrand, getCategory, getTax, addProduct } from '../../../../Services/Settings';
import Alert from '../../../user/Alert/Alert';

function AddProducts() {
  const [formData, setFormData] = useState({
    product_code: '',
    name: '',
    brand: '',  
    description: '',
    category: '', 
    mrp: '',  
    price: '', 
    discount_price: '',
    stock: '', 
    is_available: true,
    price_before_tax: '',
    tax_amount: '',
    tax_value: '', 
    youtube_url: '',
    broacher: null,
    whats_inside: '',
    more_info: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [taxes, setTaxes] = useState([]);
  const [debugData, setDebugData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [alertData, setAlertData] = useState(null);

  useEffect(() => {
    async function fetchSettings() {
      setIsLoading(true);
      try {
        const brandsRes = await getBrand();
        const categoriesRes = await getCategory();
        const taxRes = await getTax();

        // Ensure we're setting arrays (even if empty)
        setBrands(brandsRes?.data || []);
        setCategories(categoriesRes?.data || []);
        setTaxes(taxRes?.data || []);
      } catch (error) {
        console.error('Failed fetching settings:', error);
        // Initialize with empty arrays on error
        setBrands([]);
        setCategories([]);
        setTaxes([]);
        setAlertData({
          type: 'error',
          message: 'Failed to load form data',
          error: error.message
        });
      } finally {
        setIsLoading(false);
      }
    }

    fetchSettings();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }

    // Special handling for file inputs
    if (type === 'file') {
      if (files && files.length > 0) {
        const file = files[0];
        // Make sure it's a valid file type
        const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
        
        if (validTypes.includes(file.type)) {
          setFormData(prev => ({ ...prev, [name]: file }));
        } else {
          setErrors(prev => ({ ...prev, [name]: 'Only PDF or Word documents allowed' }));
          // Don't update the formData with invalid file
          return;
        }
      } else {
        // User cleared the file input
        setFormData(prev => ({ ...prev, [name]: null }));
      }
    } 
    // Handle select inputs that should be numbers
    else if (name === 'brand' || name === 'category' || name === 'tax_value') {
      const numValue = value === '' ? '' : parseInt(value, 10);
      setFormData(prev => ({
        ...prev,
        [name]: numValue
      }));
    }
    // Handle other inputs normally
    else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }

    if (name === 'mrp' || name === 'discount_price') {
      const mrp = name === 'mrp' ? parseFloat(value) : parseFloat(formData.mrp);
      const discount = name === 'discount_price' ? parseFloat(value) : parseFloat(formData.discount_price);

      if (!isNaN(mrp) && !isNaN(discount) && mrp >= discount) {
        setFormData(prev => ({
          ...prev,
          price: (mrp - discount).toFixed(2)
        }));
      }
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.product_code) newErrors.product_code = 'Product code is required';
    if (!formData.name.trim()) newErrors.name = 'Product name is required';
    if (!formData.brand) newErrors.brand = 'Please select a brand';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.category) newErrors.category = 'Please select a category';
    if (!formData.mrp) newErrors.mrp = 'MRP is required';
    if (!formData.price) newErrors.price = 'Selling price is required';
    if (!formData.stock) newErrors.stock = 'Stock quantity is required';
    if (!formData.tax_value) newErrors.tax_value = 'Tax value is required';
    if (!formData.whats_inside) newErrors.whats_inside = 'What\'s inside is required';

    if (formData.youtube_url && !formData.youtube_url.includes('youtube.com/watch') && !formData.youtube_url.includes('youtu.be')) {
      newErrors.youtube_url = 'Invalid YouTube URL';
    }

    if (formData.broacher && !['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(formData.broacher.type)) {
      newErrors.broacher = 'Only PDF or Word documents allowed';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (validateForm()) {
      setIsSubmitting(true);
  
      try {
        // Create FormData object for proper file handling
        const productFormData = new FormData();
        
        // Add all text fields to FormData with proper type conversion
        productFormData.append("product_code", formData.product_code);
        productFormData.append("name", formData.name);
        
        // Convert IDs to numbers explicitly
        productFormData.append("brand", Number(formData.brand));
        productFormData.append("description", formData.description);
        productFormData.append("category", Number(formData.category));
        
        // Convert numeric fields explicitly
        productFormData.append("mrp", Number(formData.mrp));
        productFormData.append("price", Number(formData.price));
        
        // Handle optional numeric fields
        if (formData.discount_price) {
          productFormData.append("discount_price", Number(formData.discount_price));
        }
        
        productFormData.append("stock", Number(formData.stock));
        productFormData.append("is_available", formData.is_available);
        
        if (formData.price_before_tax) {
          productFormData.append("price_before_tax", Number(formData.price_before_tax));
        }
        
        if (formData.tax_amount) {
          productFormData.append("tax_amount", Number(formData.tax_amount));
        }
        
        if (formData.tax_value) {
          productFormData.append("tax_value", Number(formData.tax_value));
        }
        
        productFormData.append("youtube_url", formData.youtube_url || "");
        productFormData.append("whats_inside", formData.whats_inside);
        productFormData.append("more_info", formData.more_info || "");
        
        // Add file if present
        if (formData.broacher) {
          productFormData.append("broacher", formData.broacher);
        }
  
        // Call the API
        const response = await addProduct(productFormData);
        
        // Handle successful response
        if (response && response.status === 200) {
          // Set success state
          setSubmitSuccess(true);
          
          // Show success data in debug area if needed
          setDebugData(response.data);
          
          // Set alert data for success
          setAlertData({
            type: 'success',
            message: response.data.message || 'Product created successfully!',
            productId: response.data.data?.id,
            error: null
          });
          
          // Reset form after delay
          setTimeout(() => {
            setSubmitSuccess(false);
            // Reset form data
            setFormData({
              product_code: '',
              name: '',
              brand: '',
              description: '',
              category: '',
              mrp: '',
              price: '',
              discount_price: '',
              stock: '',
              is_available: true,
              price_before_tax: '',
              tax_amount: '',
              tax_value: '',
              youtube_url: '',
              broacher: null,
              whats_inside: '',
              more_info: ''
            });
            setIsSubmitting(false);
            setDebugData(null); // Clear debug data
            // We'll keep the alert message visible
          }, 2000);
          
          return response.data; // Return the created product data
        } else {
          throw new Error('Failed to add product');
        }
      } catch (error) {
        console.error('Failed to submit product:', error);
        
        // Set alert data for error
        setAlertData({
          type: 'error',
          message: 'Failed to add product',
          productId: null,
          error: error.response?.data?.message || error.message
        });
        
        if (error.response && error.response.data) {
          console.error('Server error details:', error.response.data);
          setDebugData(error.response.data);
        }
        
        setIsSubmitting(false);
        return null; // Return null on error
      }
    }
    
    return false; // Return false if validation fails
  };

  const discountPercentage = () => {
    if (!formData.mrp || !formData.price) return null;
    const mrp = parseFloat(formData.mrp);
    const price = parseFloat(formData.price);
    if (isNaN(mrp) || isNaN(price) || mrp <= 0) return null;

    const percentage = ((mrp - price) / mrp) * 100;
    return percentage > 0 ? percentage.toFixed(0) + '%' : null;
  };

  // Display loading indicator while data is being fetched
  if (isLoading) {
    return (
      <div className="loading-container">
        <p>Loading form data...</p>
      </div>
    );
  }

  return (
    <div className={`add-product-container ${submitSuccess ? 'form-success' : ''}`}>
      <h2>Add New Product</h2>
      
      {/* Alert component for showing success/error messages */}
      {alertData && (
        <Alert
          type={alertData.type}
          message={alertData.message}
          productId={alertData.productId}
          error={alertData.error}
          onClose={() => setAlertData(null)}
        />
      )}

      <form onSubmit={handleSubmit} encType="multipart/form-data">

        {/* Basic Information */}
        <div className="form-section">
          <div className="form-section-title">Basic Information</div>

          <div className="form-group">
            <label>Product Code</label>
            <input type="text" name="product_code" value={formData.product_code} onChange={handleChange} className={errors.product_code ? 'error' : ''} maxLength="20" />
            {errors.product_code && <div className="error-message">{errors.product_code}</div>}
          </div>

          <div className="form-group">
            <label>Product Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} className={errors.name ? 'error' : ''} maxLength="255" />
            {errors.name && <div className="error-message">{errors.name}</div>}
          </div>

          <div className="form-group">
            <label>Brand</label>
            <select 
              name="brand" 
              value={formData.brand} 
              onChange={handleChange} 
              className={errors.brand ? 'error' : ''}
            >
              <option value="">Select Brand</option>
              {Array.isArray(brands) && brands.map(brand => (
                <option key={brand.id} value={brand.id}>{brand.name}</option>
              ))}
            </select>
            {errors.brand && <div className="error-message">{errors.brand}</div>}
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea name="description" value={formData.description} onChange={handleChange} className={errors.description ? 'error' : ''}></textarea>
            {errors.description && <div className="error-message">{errors.description}</div>}
          </div>

          <div className="form-group">
            <label>Category</label>
            <select 
              name="category" 
              value={formData.category} 
              onChange={handleChange} 
              className={errors.category ? 'error' : ''}
            >
              <option value="">Select Category</option>
              {Array.isArray(categories) && categories.map(category => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}
            </select>
            {errors.category && <div className="error-message">{errors.category}</div>}
          </div>
        </div>

        {/* Pricing */}
        <div className="form-section">
          <div className="form-section-title">Pricing Information</div>

          <div className="form-group">
            <label>MRP</label>
            <input 
              type="number" 
              name="mrp" 
              value={formData.mrp} 
              onChange={handleChange} 
              className={errors.mrp ? 'error' : ''} 
              step="0.01" 
            />
            {errors.mrp && <div className="error-message">{errors.mrp}</div>}
          </div>

          <div className="form-group">
            <label>Discount Amount</label>
            <input 
              type="number" 
              name="discount_price" 
              value={formData.discount_price} 
              onChange={handleChange} 
              step="0.01" 
            />
          </div>

          <div className="form-group">
            <label>Selling Price</label>
            <input 
              type="number" 
              name="price" 
              value={formData.price} 
              onChange={handleChange} 
              className={errors.price ? 'error' : ''} 
              step="0.01" 
            />
            {errors.price && <div className="error-message">{errors.price}</div>}
            {discountPercentage() && <div className="discount-info">{discountPercentage()} OFF</div>}
          </div>

          <div className="form-group">
            <label>Price Before Tax</label>
            <input 
              type="number" 
              name="price_before_tax" 
              value={formData.price_before_tax} 
              onChange={handleChange} 
              step="0.01" 
            />
          </div>

          <div className="form-group">
            <label>Tax Amount</label>
            <input 
              type="number" 
              name="tax_amount" 
              value={formData.tax_amount} 
              onChange={handleChange} 
              step="0.01" 
            />
          </div>

          <div className="form-group">
            <label>Tax Value</label>
            <select 
              name="tax_value" 
              value={formData.tax_value} 
              onChange={handleChange} 
              className={errors.tax_value ? 'error' : ''}
            >
              <option value="">Select Tax</option>
              {Array.isArray(taxes) && taxes.map(tax => (
                <option key={tax.id} value={tax.id}>{tax.name} ({tax.tax_name})</option>
              ))}
            </select>
            {errors.tax_value && <div className="error-message">{errors.tax_value}</div>}
          </div>
        </div>

        {/* Inventory */}
        <div className="form-section">
          <div className="form-section-title">Inventory</div>

          <div className="form-group">
            <label>Stock</label>
            <input 
              type="number" 
              name="stock" 
              value={formData.stock} 
              onChange={handleChange} 
              className={errors.stock ? 'error' : ''} 
              min="0"
              step="1" 
            />
            {errors.stock && <div className="error-message">{errors.stock}</div>}
          </div>

          <div className="form-group">
            <label>
              <input type="checkbox" name="is_available" checked={formData.is_available} onChange={handleChange} />
              Available for Sale
            </label>
          </div>
        </div>

        {/* Additional */}
        <div className="form-section">
          <div className="form-section-title">Additional Info</div>

          <div className="form-group">
            <label>What's Inside</label>
            <textarea name="whats_inside" value={formData.whats_inside} onChange={handleChange} className={errors.whats_inside ? 'error' : ''}></textarea>
            {errors.whats_inside && <div className="error-message">{errors.whats_inside}</div>}
          </div>

          <div className="form-group">
            <label>More Info</label>
            <input type="url" name="more_info" value={formData.more_info} onChange={handleChange} maxLength="200" />
          </div>

          <div className="form-group">
            <label>Youtube URL</label>
            <input type="url" name="youtube_url" value={formData.youtube_url} onChange={handleChange} maxLength="200" />
            {errors.youtube_url && <div className="error-message">{errors.youtube_url}</div>}
          </div>

          <div className="form-group">
            <label>Brochure (PDF/Doc)</label>
            <input 
              type="file" 
              name="broacher" 
              onChange={handleChange}
              accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            />
            <div className="file-name">{formData.broacher ? formData.broacher.name : 'No file chosen'}</div>
            {errors.broacher && <div className="error-message">{errors.broacher}</div>}
          </div>
        </div>

        {/* Submit */}
        <div className="form-actions">
          <button type="submit" className={isSubmitting ? 'btn-loading' : ''} disabled={isSubmitting}>
            {isSubmitting ? 'Adding...' : submitSuccess ? 'Product Added!' : 'Add Product'}
          </button>
        </div>

        {/* Debug Information */}
        {debugData && (
          <div className="debug-section" style={{ margin: '20px 0', padding: '15px', border: '1px solid #ddd', borderRadius: '4px' }}>
            <h3>Debug Data:</h3>
            <pre>{JSON.stringify(debugData, null, 2)}</pre>
          </div>
        )}
      </form>
    </div>
  );
}

export default AddProducts;