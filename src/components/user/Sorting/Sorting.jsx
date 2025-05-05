import React, { useEffect, useState } from 'react';
import './sorting.css';
import { getCategory } from '../../../Services/Settings';
import { getAllProduct } from '../../../Services/Products';

function Sorting({ setProducts }) {
  const [activeButton, setActiveButton] = useState(null);
  const [categories, setCategories] = useState([]);

  // Fetch categories once on mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getCategory();
        setCategories(response.data || []);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);

  // Show all products
  const showAllProducts = async () => {
    try {
      const allProducts = await getAllProduct();
      setProducts(allProducts);
      setActiveButton(null);
    } catch (error) {
      console.error('Error fetching all products:', error);
    }
  };

  // Handle category click
  const handleButtonClick = async (category) => {
    try {
      const allProducts = await getAllProduct();
      const filtered = allProducts.filter(prod => prod.category === category.id);
      setProducts(filtered);
      setActiveButton(category.id);
    } catch (error) {
      console.error('Error filtering products:', error);
    }
  };

  return (
    <div className="sorting-containers">
      <div className="sorting-title">Browse Categories</div>
      <div className="sorting-header">
        {categories.length > 0 ? (
          categories.map((category) => (
            <button
              key={category.id}
              className={`category-button ${activeButton === category.id ? 'active' : ''}`}
              onClick={() => handleButtonClick(category)}
            >
              {category.name}
              <span className="button-glow"></span>
            </button>
          ))
        ) : (
          <p>No categories available</p>
        )}
      </div>

      <div className="reset-button-container">
        <button
          className={`reset-button ${activeButton === null ? 'active' : ''}`}
          onClick={showAllProducts}
        >
          Show All Products
        </button>
      </div>
    </div>
  );
}

export default Sorting;
