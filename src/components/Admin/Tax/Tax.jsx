import React, { useEffect, useState } from 'react';
import './tax.css';
import { getTax, DeleteTax, AddTax } from '../../../Services/Settings';

function Tax() {
  const [taxes, setTaxes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showTaxPopup, setShowTaxPopup] = useState(false);
  
  // State for form data
  const [taxData, setTaxData] = useState({
    name: '',
    rate: ''
  });

  // Fetch tax data only on component mount and when needed
  useEffect(() => {
    fetchTax();
  }, []); // Empty dependency array ensures this runs only once on mount

  const fetchTax = async () => {
    try {
      setIsLoading(true);
      const response = await getTax();
      setTaxes(response.data);
      setError(null);
    } catch (error) {
      console.error("Error fetching taxes:", error);
      setError("Failed to load tax data");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle input changes
  const handleTaxChange = (e) => {
    const { name, value } = e.target;
    setTaxData({
      ...taxData,
      [name]: value
    });
  };

  // Handle form submission
  const handleTaxSubmit = async (e) => {
    e.preventDefault();
    
    // Validate rate is a number
    const rateValue = parseFloat(taxData.rate);
    if (isNaN(rateValue)) {
      alert('Tax rate must be a valid number');
      return;
    }
    
    // Create new tax object
    const newTax = {
      tax_name: taxData.name,
      tax_percentage: rateValue
    };
    
    try {
        
        AddTax(newTax)
      setShowTaxPopup(false);
      fetchTax(); // Refresh tax list
    } catch (error) {
      console.error("Error creating tax:", error);
      alert("Failed to create tax");
    }
  };

  // Handle tax deletion
  const handleDeleteTax = async (taxId) => {
    if (window.confirm('Are you sure you want to delete this tax?')) {
      try {
        await DeleteTax(taxId);
        fetchTax(); // Refresh tax list after deletion
      } catch (error) {
        console.error("Error deleting tax:", error);
        alert("Failed to delete tax");
      }
    }
  };

  return (
    <div className="tax-container">
      <h2>Tax Management</h2>
      
      <div className="tax-section">
        <div className="section-header">
          <h3>Taxes</h3>
          <button 
            className="btn-add" 
            onClick={() => setShowTaxPopup(true)}
          >
            Add Tax
          </button>
        </div>
        
        {/* Tax Table */}
        <div className="table-responsive">
          {isLoading ? (
            <p>Loading taxes...</p>
          ) : error ? (
            <p className="error-message">{error}</p>
          ) : (
            <table className="data-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Tax Name</th>
                  <th>Tax Rate (%)</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {taxes.length > 0 ? (
                  taxes.map((tax) => (
                    <tr key={tax.id}>
                      <td>{tax.id}</td>
                      <td>{tax.tax_name}</td>
                      <td>{tax.tax_percentage}%</td>
                      <td>
                        <button 
                          className="btn-delete"
                          onClick={() => handleDeleteTax(tax.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="no-data">No taxes found</td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Tax Popup */}
      {showTaxPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <div className="popup-header">
              <h3>Add New Tax</h3>
              <button 
                className="btn-close" 
                onClick={() => setShowTaxPopup(false)}
              >
                &times;
              </button>
            </div>
            
            <form onSubmit={handleTaxSubmit}>
              <div className="form-group">
                <label htmlFor="taxName">Tax Name (VAT, GST etc.) *</label>
                <input
                  type="text"
                  id="taxName"
                  name="name"
                  value={taxData.name}
                  onChange={handleTaxChange}
                  required
                  placeholder="Enter tax name"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="taxRate">Tax Rate (in percentage %) *</label>
                <input
                  type="number"
                  id="taxRate"
                  name="rate"
                  value={taxData.rate}
                  onChange={handleTaxChange}
                  min="0"
                  step="0.01"
                  required
                  placeholder="Enter tax rate"
                />
              </div>
              
              <div className="popup-actions">
                <button 
                  type="button" 
                  className="btn-cancel"
                  onClick={() => setShowTaxPopup(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn-save">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Tax;