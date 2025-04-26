import React, { useState, useEffect } from 'react'
// Assuming you'll use the CSS file we just created
import './addp.css'

function AddProducts() {
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    description: '',
    category: '',
    mrp: '',
    price: '',
    discountPrice: '',
    stock: '',
    isAvailable: true,
    youtubeUrl: '',
    broacher: null,
    whatsInside: '',
    moreInfo: '',
    taxType: 'inclusive',
    taxValue: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [currentSection, setCurrentSection] = useState(1);

  // Sample options for select boxes
  const brands = ['Apple', 'Samsung', 'Sony', 'Dell', 'HP', 'Other'];
  const categories = ['Electronics', 'Clothing', 'Food', 'Home & Kitchen', 'Books', 'Toys'];
  const taxValues = ['5%', '12%', '18%', '28%'];

  // Set animation order for form groups
  useEffect(() => {
    const formGroups = document.querySelectorAll('.form-group');
    formGroups.forEach((group, index) => {
      group.style.setProperty('--order', index);
    });
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({...prev, [name]: ''}));
    }
    
    // Handle different input types
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : type === 'file' ? files[0] : value
    }));
    
    // Update price automatically based on MRP and discount
    if (name === 'mrp' || name === 'discountPrice') {
      const mrp = name === 'mrp' ? parseFloat(value) : parseFloat(formData.mrp);
      const discount = name === 'discountPrice' ? parseFloat(value) : parseFloat(formData.discountPrice);
      
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
    
    // Required field validation
    if (!formData.name.trim()) newErrors.name = 'Product name is required';
    if (!formData.brand) newErrors.brand = 'Please select a brand';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.category) newErrors.category = 'Please select a category';
    if (!formData.mrp) newErrors.mrp = 'MRP is required';
    if (!formData.price) newErrors.price = 'Selling price is required';
    if (!formData.stock) newErrors.stock = 'Stock quantity is required';
    if (!formData.taxValue) newErrors.taxValue = 'Tax value is required';
    
    // Value validations
    if (formData.mrp && parseFloat(formData.mrp) <= 0) {
      newErrors.mrp = 'MRP must be greater than 0';
    }
    
    if (formData.price && parseFloat(formData.price) <= 0) {
      newErrors.price = 'Selling price must be greater than 0';
    }
    
    if (formData.discountPrice && parseFloat(formData.discountPrice) < 0) {
      newErrors.discountPrice = 'Discount cannot be negative';
    }
    
    if (formData.stock && parseInt(formData.stock) < 0) {
      newErrors.stock = 'Stock cannot be negative';
    }
    
    // YouTube URL validation if provided
    if (formData.youtubeUrl && !formData.youtubeUrl.includes('youtube.com/watch') && !formData.youtubeUrl.includes('youtu.be')) {
      newErrors.youtubeUrl = 'Please enter a valid YouTube URL';
    }
    
    // Brochure file validation if provided
    if (formData.broacher && !['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
      .includes(formData.broacher.type)) {
      newErrors.broacher = 'Please upload a PDF or Word document';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      try {
        // Here you would add your API call to submit the product data
        console.log('Form submitted with data:', formData);
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Show success state
        setSubmitSuccess(true);
        
        // Reset form after delay
        setTimeout(() => {
          setIsSubmitting(false);
          setSubmitSuccess(false);
          setFormData({
            name: '',
            brand: '',
            description: '',
            category: '',
            mrp: '',
            price: '',
            discountPrice: '',
            stock: '',
            isAvailable: true,
            youtubeUrl: '',
            broacher: null,
            whatsInside: '',
            moreInfo: '',
            taxType: 'inclusive',
            taxValue: ''
          });
        }, 2000);
      } catch (error) {
        console.error('Error submitting form:', error);
        setIsSubmitting(false);
      }
    } else {
      // Scroll to first error
      const firstError = document.querySelector('.error');
      if (firstError) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  };

  // Handle file name display
  const getFileName = () => {
    if (!formData.broacher) return 'No file chosen';
    return formData.broacher.name;
  };

  // Calculate discount percentage for display
  const calculateDiscountPercentage = () => {
    if (!formData.mrp || !formData.price) return null;
    const mrp = parseFloat(formData.mrp);
    const price = parseFloat(formData.price);
    if (isNaN(mrp) || isNaN(price) || mrp <= 0) return null;
    
    const percentage = ((mrp - price) / mrp) * 100;
    return percentage > 0 ? percentage.toFixed(0) + '%' : null;
  };

  const discountPercentage = calculateDiscountPercentage();

  return (
    <div className={`add-product-container ${submitSuccess ? 'form-success' : ''}`}>
      <h2>Add New Product</h2>
      
      <form onSubmit={handleSubmit}>
        {/* Basic Information Section */}
        <div className="form-section">
          <div className="form-section-title">Basic Information</div>
          
          <div className="form-group">
            <label htmlFor="name" className="required-field">Product Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={errors.name ? 'error' : ''}
              placeholder="Enter product name"
            />
            {errors.name && <div className="error-message">{errors.name}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="brand" className="required-field">Brand</label>
            <select
              id="brand"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              className={errors.brand ? 'error' : ''}
            >
              <option value="">Select Brand</option>
              {brands.map((brand, index) => (
                <option key={index} value={brand}>{brand}</option>
              ))}
            </select>
            {errors.brand && <div className="error-message">{errors.brand}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="description" className="required-field">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              className={errors.description ? 'error' : ''}
              placeholder="Provide a detailed description of the product"
            ></textarea>
            {errors.description && <div className="error-message">{errors.description}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="category" className="required-field">Category</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className={errors.category ? 'error' : ''}
            >
              <option value="">Select Category</option>
              {categories.map((category, index) => (
                <option key={index} value={category}>{category}</option>
              ))}
            </select>
            {errors.category && <div className="error-message">{errors.category}</div>}
          </div>
        </div>

        {/* Pricing Section */}
        <div className="form-section">
          <div className="form-section-title">Pricing Information</div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="mrp" className="required-field">MRP (₹)</label>
              <input
                type="number"
                id="mrp"
                name="mrp"
                value={formData.mrp}
                onChange={handleChange}
                min="0"
                step="0.01"
                className={errors.mrp ? 'error' : ''}
                placeholder="0.00"
              />
              {errors.mrp && <div className="error-message">{errors.mrp}</div>}
            </div>

            <div className="form-group">
              <label htmlFor="discountPrice" className="optional-field">Discount Amount (₹)</label>
              <input
                type="number"
                id="discountPrice"
                name="discountPrice"
                value={formData.discountPrice}
                onChange={handleChange}
                min="0"
                step="0.01"
                className={errors.discountPrice ? 'error' : ''}
                placeholder="0.00"
              />
              {errors.discountPrice && <div className="error-message">{errors.discountPrice}</div>}
            </div>

            <div className="form-group">
              <label htmlFor="price" className="required-field">Selling Price (₹)</label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                min="0"
                step="0.01"
                className={errors.price ? 'error' : ''}
                placeholder="0.00"
              />
              {errors.price && <div className="error-message">{errors.price}</div>}
              {discountPercentage && <div style={{ color: '#4CAF50', fontSize: '14px', marginTop: '5px' }}>
                {discountPercentage} off from MRP
              </div>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="taxType" className="required-field">Tax Type</label>
              <select
                id="taxType"
                name="taxType"
                value={formData.taxType}
                onChange={handleChange}
              >
                <option value="inclusive">Inclusive</option>
                <option value="exclusive">Exclusive</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="taxValue" className="required-field">Tax Value</label>
              <select
                id="taxValue"
                name="taxValue"
                value={formData.taxValue}
                onChange={handleChange}
                className={errors.taxValue ? 'error' : ''}
              >
                <option value="">Select Tax Value</option>
                {taxValues.map((value, index) => (
                  <option key={index} value={value}>{value}</option>
                ))}
              </select>
              {errors.taxValue && <div className="error-message">{errors.taxValue}</div>}
            </div>
          </div>
        </div>

        {/* Inventory Section */}
        <div className="form-section">
          <div className="form-section-title">Inventory</div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="stock" className="required-field">Stock Quantity</label>
              <input
                type="number"
                id="stock"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                min="0"
                className={errors.stock ? 'error' : ''}
                placeholder="Enter quantity"
              />
              {errors.stock && <div className="error-message">{errors.stock}</div>}
            </div>

            <div className="form-group checkbox-group">
              <label>
                <input
                  type="checkbox"
                  name="isAvailable"
                  checked={formData.isAvailable}
                  onChange={handleChange}
                />
                Available for Sale
              </label>
            </div>
          </div>
        </div>

        {/* Additional Information Section */}
        <div className="form-section">
          <div className="form-section-title">Additional Information</div>
          
          <div className="form-group">
            <label htmlFor="youtubeUrl" className="optional-field">YouTube URL</label>
            <input
              type="url"
              id="youtubeUrl"
              name="youtubeUrl"
              value={formData.youtubeUrl}
              onChange={handleChange}
              className={errors.youtubeUrl ? 'error' : ''}
              placeholder="https://www.youtube.com/watch?v=..."
            />
            {errors.youtubeUrl && <div className="error-message">{errors.youtubeUrl}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="broacher" className="optional-field">Brochure Upload</label>
            <div style={{ position: 'relative' }}>
              <input
                type="file"
                id="broacher"
                name="broacher"
                onChange={handleChange}
                accept=".pdf,.doc,.docx"
                className={errors.broacher ? 'error' : ''}
                style={{ paddingRight: '120px' }}
              />
              <span style={{ 
                position: 'absolute', 
                right: '10px', 
                top: '50%', 
                transform: 'translateY(-50%)',
                fontSize: '14px',
                color: '#757575',
                textOverflow: 'ellipsis',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                maxWidth: '150px'
              }}>
                {getFileName()}
              </span>
            </div>
            {errors.broacher && <div className="error-message">{errors.broacher}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="whatsInside" className="optional-field">What's Inside</label>
            <textarea
              id="whatsInside"
              name="whatsInside"
              value={formData.whatsInside}
              onChange={handleChange}
              rows="3"
              placeholder="List the contents or parts included with this product"
            ></textarea>
          </div>

          <div className="form-group">
            <label htmlFor="moreInfo" className="optional-field">More Info</label>
            <textarea
              id="moreInfo"
              name="moreInfo"
              value={formData.moreInfo}
              onChange={handleChange}
              rows="3"
              placeholder="Additional details about warranty, usage, etc."
            ></textarea>
          </div>
        </div>

        <div className="form-actions">
          <button 
            type="submit" 
            className={`btn-add-product ${isSubmitting ? 'btn-loading' : ''}`}
            disabled={isSubmitting}
          >
            {submitSuccess ? 'Product Added!' : 'Add Product'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddProducts;