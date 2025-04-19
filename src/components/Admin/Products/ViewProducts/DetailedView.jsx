import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './DetailedView.css';
import { getSingleProduct } from '../../../../Services/Products';
import BaseURL from '../../../../Static/Static';
import Loader from '../../../../Loader/Loader';

function DetailedView() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const productData = await getSingleProduct(id);
        console.log(productData,"--product data")
        setProduct(productData);
        setError(null);
      } catch (err) {
        console.error("Error fetching product:", err);
        setError("Failed to load product details");
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]); // Add id as dependency to refetch when it changes

  if (loading) {
    return <Loader/>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!product) {
    return <div className="product-not-found">Product not found</div>;
  }

  return (
    <div className="detailed-view-container">
      <div className="product-header">
        <h1>{product.name}</h1>
        <div className="product-code">Product Code: {product.product_code}</div>
      </div>

      <div className="product-content">
        <div className="product-media">
          {product.images?.length > 0 && (
            <>
              <div className="main-image">
                <img 
                  src={BaseURL + product.images[0].image} 
                  alt={product.name} 
                />
              </div>
              
              <div className="thumbnail-gallery">
                {product.images.slice(1).map((img, index) => (
                  <div key={index} className="thumbnail">
                    <img src={ BaseURL + img.image} alt={`${product.name} ${index + 2}`} />
                  </div>
                ))}
              </div>
            </>
          )}

         
        </div>

        <div className="product-details">
          <div className="price-section">
            <div className="current-price">₹{product.price}</div>
            {product.mrp && parseFloat(product.mrp) > parseFloat(product.price) && (
              <div className="original-price">₹{product.mrp}</div>
            )}
            {product.discount_price && parseFloat(product.discount_price) > 0 && (
              <div className="discount-badge">
                Save ₹{(parseFloat(product.mrp) - parseFloat(product.price)).toFixed(2)}
              </div>
            )}
          </div>

          <div className="stock-status">
            {product.stock > 0 ? (
              <span className="in-stock">In Stock ({product.stock} available)</span>
            ) : (
              <span className="out-of-stock">Out of Stock</span>
            )}
          </div>

          <div className="product-description">
            <h3>Description</h3>
            <p>{product.description}</p>
          </div>

          {product.whats_inside && (
            <div className="whats-inside">
              <h3>What's Inside</h3>
              <p>{product.whats_inside}</p>
            </div>
          )}

          {product.more_info && (
            <div className="more-info">
              <a href={product.more_info} target="_blank" rel="noopener noreferrer">
                More Information
              </a>
            </div>
          )}

          {product.broacher && (
            <div className="brochure-download">
              <a href={ BaseURL + product.broacher} download target="_blank" rel="noopener noreferrer">
                Download Brochure
              </a>
            </div>
          )}

          {product.attributes?.length > 0 && (
            <div className="specifications">
              <h3>Specifications</h3>
              <table className="specs-table">
                <tbody>
                  {product.attributes.map((attr) => (
                    <tr key={attr.id}>
                      <th>{attr.attribute.name}</th>
                      <td>
                        {attr.details.map((detail, idx) => (
                          <span key={idx}>
                            {detail.value}
                            {idx < attr.details.length - 1 ? ', ' : ''}
                          </span>
                        ))}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DetailedView;