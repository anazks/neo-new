import React, { useState } from 'react'
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

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : type === 'file' ? files[0] : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted with data:', formData);
    // Add your API call here to submit the product data
  };

  // Sample options for select boxes
  const brands = ['Apple', 'Samsung', 'Sony', 'Dell', 'HP', 'Other'];
  const categories = ['Electronics', 'Clothing', 'Food', 'Home & Kitchen', 'Books', 'Toys'];
  const taxValues = ['5%', '12%', '18%', '28%'];

  return (
    <div className="add-product-container">
      <h2>Add New Product</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="brand">Brand *</label>
          <select
            id="brand"
            name="brand"
            value={formData.brand}
            onChange={handleChange}
            required
          >
            <option value="">Select Brand</option>
            {brands.map((brand, index) => (
              <option key={index} value={brand}>{brand}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="description">Description *</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            required
          ></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="category">Category *</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">Select Category</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>{category}</option>
            ))}
          </select>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="mrp">MRP (₹) *</label>
            <input
              type="number"
              id="mrp"
              name="mrp"
              value={formData.mrp}
              onChange={handleChange}
              min="0"
              step="0.01"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="price">Selling Price (₹) *</label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              min="0"
              step="0.01"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="discountPrice">Discount Price (₹)</label>
            <input
              type="number"
              id="discountPrice"
              name="discountPrice"
              value={formData.discountPrice}
              onChange={handleChange}
              min="0"
              step="0.01"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="stock">Stock Quantity *</label>
            <input
              type="number"
              id="stock"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              min="0"
              required
            />
          </div>

          <div className="form-group checkbox-group">
            <label>
              <input
                type="checkbox"
                name="isAvailable"
                checked={formData.isAvailable}
                onChange={handleChange}
              />
              Is Available
            </label>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="youtubeUrl">YouTube URL</label>
          <input
            type="url"
            id="youtubeUrl"
            name="youtubeUrl"
            value={formData.youtubeUrl}
            onChange={handleChange}
            placeholder="https://www.youtube.com/watch?v=..."
          />
        </div>

        <div className="form-group">
          <label htmlFor="broacher">Brochure Upload</label>
          <input
            type="file"
            id="broacher"
            name="broacher"
            onChange={handleChange}
            accept=".pdf,.doc,.docx"
          />
        </div>

        <div className="form-group">
          <label htmlFor="whatsInside">What's Inside</label>
          <textarea
            id="whatsInside"
            name="whatsInside"
            value={formData.whatsInside}
            onChange={handleChange}
            rows="3"
          ></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="moreInfo">More Info</label>
          <textarea
            id="moreInfo"
            name="moreInfo"
            value={formData.moreInfo}
            onChange={handleChange}
            rows="3"
          ></textarea>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="taxType">Tax Type *</label>
            <select
              id="taxType"
              name="taxType"
              value={formData.taxType}
              onChange={handleChange}
              required
            >
              <option value="inclusive">Inclusive</option>
              <option value="exclusive">Exclusive</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="taxValue">Tax Value *</label>
            <select
              id="taxValue"
              name="taxValue"
              value={formData.taxValue}
              onChange={handleChange}
              required
            >
              <option value="">Select Tax Value</option>
              {taxValues.map((value, index) => (
                <option key={index} value={value}>{value}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn-add-product">Add Product</button>
        </div>
      </form>
    </div>
  );
}

export default AddProducts