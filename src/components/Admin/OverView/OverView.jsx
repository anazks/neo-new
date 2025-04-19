import React, { useState } from 'react';
import './over.css';

function OverView() {
  const [categories, setCategories] = useState([]);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showItemModal, setShowItemModal] = useState(false);
  const [showAddItemsModal, setShowAddItemsModal] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState('');
  const [newItemName, setNewItemName] = useState('');

  // Add a new category
  const handleAddCategory = () => {
    if (newCategoryName.trim()) {
      const newCategory = {
        id: Date.now(),
        name: newCategoryName,
        items: []
      };
      setCategories([...categories, newCategory]);
      setNewCategoryName('');
      setShowCategoryModal(false);
      // Show the item modal for the newly added category
      setSelectedCategory(newCategory);
      setShowItemModal(true);
    }
  };

  // Add a new item to a category
  const handleAddItem = () => {
    if (newItemName.trim() && selectedCategory) {
      const updatedCategories = categories.map(category => {
        if (category.id === selectedCategory.id) {
          return {
            ...category,
            items: [...category.items, {
              id: Date.now(),
              name: newItemName
            }]
          };
        }
        return category;
      });
      setCategories(updatedCategories);
      setNewItemName('');
      setShowItemModal(false);
    }
  };

  // Add an item through the Add Overview Items modal
  const handleAddItemFromSelect = () => {
    if (newItemName.trim() && selectedCategoryId) {
      const updatedCategories = categories.map(category => {
        if (category.id === parseInt(selectedCategoryId)) {
          return {
            ...category,
            items: [...category.items, {
              id: Date.now(),
              name: newItemName
            }]
          };
        }
        return category;
      });
      setCategories(updatedCategories);
      setNewItemName('');
      setSelectedCategoryId('');
      setShowAddItemsModal(false);
    }
  };

  // Open the item modal for a specific category
  const openItemModal = (category) => {
    setSelectedCategory(category);
    setShowItemModal(true);
  };

  // Open the add items modal
  const openAddItemsModal = () => {
    setNewItemName('');
    setSelectedCategoryId(categories.length > 0 ? categories[0].id.toString() : '');
    setShowAddItemsModal(true);
  };

  // Close any modal when clicking outside
  const closeModal = (e) => {
    if (e.target.className === 'modal-overlay') {
      setShowCategoryModal(false);
      setShowItemModal(false);
      setShowAddItemsModal(false);
    }
  };

  // Handle key press in input fields
  const handleKeyPress = (e, actionFunction) => {
    if (e.key === 'Enter') {
      actionFunction();
    }
  };

  return (
    <div className="overview-container">
      <h2 className="overview-title">Overview</h2>
      
      {/* Table of categories and items */}
      {categories.length > 0 ? (
        <div className="table-container">
          <table className="overview-table">
            <thead>
              <tr>
                <th>Category</th>
                <th>Attributes/Items</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map(category => (
                <tr key={category.id}>
                  <td>{category.name}</td>
                  <td>
                    <div className="items-container">
                      {category.items.map(item => (
                        <span key={item.id} className="item-badge">
                          {item.name}
                        </span>
                      ))}
                      {category.items.length === 0 && (
                        <span className="no-items">No items added</span>
                      )}
                    </div>
                  </td>
                  <td>
                    <button 
                      className="btn-action" 
                      onClick={() => openItemModal(category)}
                      aria-label={`Add item to ${category.name}`}
                    >
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 3V13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                        <path d="M3 8H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                      <span>Add Item</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="empty-state">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 8V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M8 12H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <p>No categories added yet</p>
          <button 
            className="btn-primary" 
            onClick={() => setShowCategoryModal(true)}
          >
            Add Your First Category
          </button>
        </div>
      )}
      
      {/* Action Buttons */}
      {categories.length > 0 && (
        <div className="action-buttons">
          <button 
            className="btn-primary" 
            onClick={() => setShowCategoryModal(true)}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="btn-icon">
              <path d="M8 3V13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <path d="M3 8H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            Add Category
          </button>
          
          <button 
            className="btn-secondary" 
            onClick={openAddItemsModal}
            disabled={categories.length === 0}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="btn-icon">
              <path d="M8 3V13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <path d="M3 8H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            Add Items
          </button>
        </div>
      )}
      
      {/* Add Category Modal */}
      {showCategoryModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content">
            <div className="modal-header">
              <h3>Add New Category</h3>
              <button 
                className="close-button"
                onClick={() => setShowCategoryModal(false)}
                aria-label="Close modal"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 4L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M4 4L12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
            <div className="form-group">
              <label htmlFor="categoryName">Category Name</label>
              <input 
                id="categoryName"
                type="text" 
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                onKeyPress={(e) => handleKeyPress(e, handleAddCategory)}
                placeholder="Enter category name"
                autoFocus
              />
            </div>
            <div className="modal-actions">
              <button 
                className="btn-cancel" 
                onClick={() => setShowCategoryModal(false)}
              >
                Cancel
              </button>
              <button 
                className="btn-confirm" 
                onClick={handleAddCategory}
                disabled={!newCategoryName.trim()}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Add Item Modal (from category) */}
      {showItemModal && selectedCategory && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content">
            <div className="modal-header">
              <h3>Add New Item</h3>
              <button 
                className="close-button"
                onClick={() => setShowItemModal(false)}
                aria-label="Close modal"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 4L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M4 4L12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
            <div className="form-group">
              <label>Category</label>
              <div className="input-readonly">{selectedCategory.name}</div>
            </div>
            <div className="form-group">
              <label htmlFor="itemName">Attribute Name</label>
              <input 
                id="itemName"
                type="text" 
                value={newItemName}
                onChange={(e) => setNewItemName(e.target.value)}
                onKeyPress={(e) => handleKeyPress(e, handleAddItem)}
                placeholder="Enter attribute name"
                autoFocus
              />
            </div>
            <div className="modal-actions">
              <button 
                className="btn-cancel" 
                onClick={() => setShowItemModal(false)}
              >
                Cancel
              </button>
              <button 
                className="btn-confirm" 
                onClick={handleAddItem}
                disabled={!newItemName.trim()}
              >
                Add Item
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Add Overview Items Modal (from button) */}
      {showAddItemsModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content">
            <div className="modal-header">
              <h3>Add Overview Item</h3>
              <button 
                className="close-button"
                onClick={() => setShowAddItemsModal(false)}
                aria-label="Close modal"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 4L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M4 4L12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
            <div className="form-group">
              <label htmlFor="categorySelect">Select Category</label>
              <select 
                id="categorySelect"
                value={selectedCategoryId} 
                onChange={(e) => setSelectedCategoryId(e.target.value)}
                className="select-dropdown"
              >
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="attributeName">Attribute Name</label>
              <input 
                id="attributeName"
                type="text" 
                value={newItemName}
                onChange={(e) => setNewItemName(e.target.value)}
                onKeyPress={(e) => handleKeyPress(e, handleAddItemFromSelect)}
                placeholder="Enter attribute name"
                autoFocus
              />
            </div>
            <div className="modal-actions">
              <button 
                className="btn-cancel" 
                onClick={() => setShowAddItemsModal(false)}
              >
                Cancel
              </button>
              <button 
                className="btn-confirm" 
                onClick={handleAddItemFromSelect}
                disabled={!newItemName.trim() || !selectedCategoryId}
              >
                Add Item
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default OverView;