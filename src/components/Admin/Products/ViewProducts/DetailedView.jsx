import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './DetailedView.css';
import { getSingleProduct } from '../../../../Services/Products';
import BaseURL from '../../../../Static/Static';
import Loader from '../../../../Loader/Loader';

function ProductView() {
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
    return <div className="product-error">{error}</div>;
  }

  if (!product) {
    return <div className="product-missing">Product not found</div>;
  }

  return (
    <div className="product-view-wrapper">
      <div className="product-title-section">
        <h1>{product.name}</h1>
        <div className="product-id">Product Code: {product.product_code}</div>
      </div>

      <div className="product-layout">
        <div className="product-gallery">
          {product.images?.length > 0 && (
            <>
              <div className="product-hero-image">
                <img 
                  src={BaseURL + product.images[0].image} 
                  alt={product.name} 
                />
              </div>
              
              <div className="product-image-grid">
                {product.images.slice(1).map((img, index) => (
                  <div key={index} className="product-thumbnail">
                    <img src={ BaseURL + img.image} alt={`${product.name} ${index + 2}`} />
                  </div>
                ))}
              </div>
            </>
          )}

         
        </div>

        <div className="product-info">
          <div className="product-pricing">
            <div className="product-sale-price">₹{product.price}</div>
            {product.mrp && parseFloat(product.mrp) > parseFloat(product.price) && (
              <div className="product-regular-price">₹{product.mrp}</div>
            )}
            {product.discount_price && parseFloat(product.discount_price) > 0 && (
              <div className="product-savings">
                Save ₹{(parseFloat(product.mrp) - parseFloat(product.price)).toFixed(2)}
              </div>
            )}
          </div>

          <div className="product-availability">
            {product.stock > 0 ? (
              <span className="product-available">In Stock ({product.stock} available)</span>
            ) : (
              <span className="product-unavailable">Out of Stock</span>
            )}
          </div>

          <div className="product-summary">
            <h3>Description</h3>
            <p>{product.description}</p>
          </div>

          {product.whats_inside && (
            <div className="product-contents">
              <h3>What's Inside</h3>
              <p>{product.whats_inside}</p>
            </div>
          )}

          {product.more_info && (
            <div className="product-additional-info">
              <a href={product.more_info} target="_blank" rel="noopener noreferrer">
                More Information
              </a>
            </div>
          )}

          {product.broacher && (
            <div className="product-document">
              <a href={ BaseURL + product.broacher} download target="_blank" rel="noopener noreferrer">
                Download Brochure
              </a>
            </div>
          )}

          {product.attributes?.length > 0 && (
            <div className="product-specs">
              <h3>Specifications</h3>
              <table className="product-spec-table">
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

export default ProductView;