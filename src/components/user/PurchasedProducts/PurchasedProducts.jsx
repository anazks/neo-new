import React, { useEffect, useState } from "react";
import { getPurchasedProducts } from "../../../Services/userApi";
import Loader from "../../../Loader/Loader";
import ProductFooter from "../Footer/ProductFooter";
import ModernNavbar from "../NavBar/NavBar";
import './PurchasedProduct.css'
// Inline CSS styles object
const styles = {
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    marginTop: "70px",
    padding: "24px",
    minHeight: "600px",
  },
  pageTitle: {
    fontSize: "2rem",
    fontWeight: "700",
    marginBottom: "32px",
    color: "#1a202c",
    borderBottom: "2px solid #e2e8f0",
    paddingBottom: "12px",
  },
  productsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: "24px",
  },
  productCard: {
    backgroundColor: "white",
    borderRadius: "10px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
    overflow: "hidden",
    position: "relative",
    transition: "all 0.2s ease",
    border: "1px solid #e2e8f0",
  },
  imageContainer: {
    height: "200px",
    backgroundColor: "#f7fafc",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  productImage: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
  },
  noImage: {
    color: "#718096",
    fontSize: "0.875rem",
  },
  infoContainer: {
    padding: "16px",
  },
  infoHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "8px",
  },
  productName: {
    fontSize: "1.25rem",
    fontWeight: "600",
    color: "#1a202c",
    flex: "1",
    marginRight: "8px",
  },
  productCode: {
    backgroundColor: "#10b981",
    color: "white",
    fontSize: "0.75rem",
    padding: "4px 8px",
    borderRadius: "4px",
    whiteSpace: "nowrap",
  },
  brandName: {
    color: "#4a5568",
    fontSize: "0.875rem",
    marginBottom: "8px",
  },
  price: {
    color: "#10b981",
    fontWeight: "700",
    fontSize: "1.125rem",
    marginTop: "8px",
  },
  statusBadge: {
    position: "absolute",
    top: "12px",
    right: "12px",
    backgroundColor: "#10b981",
    color: "white",
    padding: "4px 12px",
    borderRadius: "9999px",
    fontSize: "0.75rem",
    fontWeight: "600",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
  accordionButton: {
    width: "100%",
    padding: "12px 16px",
    backgroundColor: "#f1f5f9",
    borderTop: "1px solid #e2e8f0",
    color: "#334155",
    fontWeight: "600",
    fontSize: "0.875rem",
    cursor: "pointer",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    transition: "background-color 0.2s ease",
  },
  accordionButtonActive: {
    backgroundColor: "#e2e8f0",
  },
  accordionIcon: {
    fontSize: "1rem",
    transition: "transform 0.2s ease",
  },
  accordionIconActive: {
    transform: "rotate(180deg)",
  },
  accordionContent: {
    padding: "16px",
    backgroundColor: "#f8fafc",
    borderTop: "1px solid #e2e8f0",
  },
  detailsContainer: {
    marginBottom: "16px",
  },
  detailItem: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "8px",
    fontSize: "0.875rem",
    padding: "6px 0",
    borderBottom: "1px dashed #e2e8f0",
  },
  detailLabel: {
    fontWeight: "600",
    color: "#475569",
  },
  detailValue: {
    color: "#1e293b",
  },
  buttonsContainer: {
    display: "flex",
    gap: "8px",
    marginTop: "16px",
  },
  viewButton: {
    backgroundColor: "#10b981",
    color: "white",
    padding: "8px 16px",
    borderRadius: "6px",
    fontSize: "0.875rem",
    flex: "1",
    border: "none",
    cursor: "pointer",
    fontWeight: "600",
    transition: "background-color 0.2s ease",
  },
  downloadButton: {
    backgroundColor: "#3b82f6",
    color: "white",
    padding: "8px 16px",
    borderRadius: "6px",
    fontSize: "0.875rem",
    flex: "1",
    border: "none",
    cursor: "pointer",
    fontWeight: "600",
    transition: "background-color 0.2s ease",
  },
  emptyState: {
    textAlign: "center",
    padding: "64px 0",
    backgroundColor: "#f8fafc",
    borderRadius: "10px",
    border: "1px dashed #cbd5e1",
  },
  emptyIcon: {
    fontSize: "3rem",
    color: "#94a3b8",
    marginBottom: "16px",
  },
  emptyTitle: {
    fontSize: "1.5rem",
    fontWeight: "600",
    color: "#334155",
    marginBottom: "8px",
  },
  emptyMessage: {
    color: "#64748b",
    fontSize: "1rem",
  },
  errorContainer: {
    textAlign: "center",
    padding: "64px 0",
    backgroundColor: "#fef2f2",
    borderRadius: "10px",
    border: "1px dashed #fecaca",
  },
  errorIcon: {
    fontSize: "3rem",
    color: "#ef4444",
    marginBottom: "16px",
  },
  errorTitle: {
    fontSize: "1.5rem",
    fontWeight: "600",
    color: "#b91c1c",
    marginBottom: "8px",
  },
  errorMessage: {
    color: "#64748b",
    fontSize: "1rem",
  },
};

function PurchasedProducts() {
  const [loader, setLoader] = useState(true);
  const [purchasedProducts, setPurchasedProducts] = useState([]);
  const [expandedProductId, setExpandedProductId] = useState(null);
  const [error, setError] = useState(null);

  const fetchPurchasedProducts = async () => {
    try {
      setLoader(true);
      let response = await getPurchasedProducts();

      if (response && response.data) {
        setPurchasedProducts(response.data);
      } else {
        throw new Error("Invalid response format");
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      setError(
        error.message || "Failed to load products. Please try again later."
      );
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    fetchPurchasedProducts();
  }, []);

  // Function to get specific attribute value
  const getAttributeValue = (product, attributeName) => {
    if (!product.attributes) return "N/A";

    const attribute = product.attributes.find(
      (attr) => attr.attribute && attr.attribute.name === attributeName
    );

    if (!attribute || !attribute.details || attribute.details.length === 0) {
      return "N/A";
    }

    return attribute.details[0].value;
  };

  // Function to toggle accordion
  const toggleAccordion = (id) => {
    setExpandedProductId(expandedProductId === id ? null : id);
  };

  return (
    <div>
      <ModernNavbar />
      <div style={styles.container}>
        <div className="titleContainer " style={{ marginBottom: "40px" }}>
          <h1 className="text-center md:text-left text-3xl md:text-4xl font-bold font-[Rajdhani] tracking-wider bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent relative pb-2">
            Your Purchases
            <span className="absolute bottom-0 left-0 md:left-0 w-20 h-1 bg-gradient-to-r from-red-600 to-red-500 rounded-full transform translate-y-1"></span>
          </h1>
        </div>

        {loader ? (
          <Loader />
        ) : error ? (
          <div style={styles.errorContainer}>
            <div style={styles.errorIcon}>⚠️</div>
            <h3 style={styles.errorTitle}>Error loading products</h3>
            <p style={styles.errorMessage}>{error}</p>
          </div>
        ) : purchasedProducts && purchasedProducts.length > 0 ? (
          <div style={styles.productsGrid}>
            {purchasedProducts.map((product) => (
              <div key={product.id} style={styles.productCard}>
                {/* Product Image */}
                <div style={styles.imageContainer}>
                  {product.primary_image ? (
                    <img
                      src={product.primary_image.image_url}
                      alt={product.name}
                      style={styles.productImage}
                    />
                  ) : (
                    <div style={styles.noImage}>No image available</div>
                  )}
                </div>

                {/* Basic Info */}
                <div style={styles.infoContainer}>
                  <div style={styles.infoHeader}>
                    <h3 style={styles.productName}>{product.name}</h3>
                    <span style={styles.productCode}>
                      {product.product_code}
                    </span>
                  </div>
                  <p style={styles.brandName}>{product.brand_name}</p>
                  <div>
                    <button className="text-white px-3 py-1 rounded text-sm bg-dark transition-colors" style={{border: "1px solid",background:"black"}}>
                      View Product
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={styles.emptyState}>
            <div style={styles.emptyIcon}>📦</div>
            <h3 style={styles.emptyTitle}>No purchased products yet</h3>
            <p style={styles.emptyMessage}>
              Products you purchase will appear here
            </p>
          </div>
        )}
      </div>
      <ProductFooter />
    </div>
  );
}

export default PurchasedProducts;
