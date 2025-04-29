import React, { useEffect, useState } from 'react';
import './update.css';
import { getSingleProduct, updateProduct, uploadProductPhotos, addProductVideo, addProductVariant, addProductOverview } from '../../../../Services/Products';
import { useParams, useNavigate } from 'react-router-dom';
import Loader from '../../../../Loader/Loader';

function UpdateProduct() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        mrp: '',
        product_code: '',
        stock: 0,
        whats_inside: '',
        category: '',
        brand: '',
        is_available: false,
        broacher: '',
        youtube_url: '',
        tax: '',
        tax_value: '',
        discount_price: '',
        more_info: ''
    });
    
    // Modal states
    const [showPhotosModal, setShowPhotosModal] = useState(false);
    const [showVideoModal, setShowVideoModal] = useState(false);
    const [showVariantModal, setShowVariantModal] = useState(false);
    const [showOverviewModal, setShowOverviewModal] = useState(false);
    
    // Form states for modals
    const [photos, setPhotos] = useState([]);
    const [videoUrl, setVideoUrl] = useState('');
    const [variantData, setVariantData] = useState({
        name: '',
        price: '',
        stock: 0
    });
    const [overviewContent, setOverviewContent] = useState('');

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                const productData = await getSingleProduct(id);
                console.log(productData, "product data in update product");
                setProduct(productData);
                setFormData({
                    name: productData.name,
                    description: productData.description,
                    price: productData.price,
                    mrp: productData.mrp,
                    product_code: productData.product_code,
                    stock: productData.stock,
                    whats_inside: productData.whats_inside,
                    category: productData.category,
                    brand: productData.brand,
                    is_available: productData.is_available,
                    broacher: productData.broacher || '',
                    youtube_url: productData.youtube_url || '',
                    tax: productData.tax || '',
                    tax_value: productData.tax_value || '',
                    discount_price: productData.discount_price || '',
                    more_info: productData.more_info || ''
                });
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const updatedProduct = await updateProduct(id, formData);
            console.log("Product updated:", updatedProduct);
            navigate('/admin/products');
        } catch (error) {
            console.error("Error updating product:", error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    // Modal handlers
    const handlePhotosSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            await uploadProductPhotos(id, photos);
            setShowPhotosModal(false);
            // Refresh product data
            const updatedProduct = await getSingleProduct(id);
            setProduct(updatedProduct);
        } catch (error) {
            console.error("Error uploading photos:", error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleVideoSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            await addProductVideo(id, videoUrl);
            setShowVideoModal(false);
            // Refresh product data
            const updatedProduct = await getSingleProduct(id);
            setProduct(updatedProduct);
        } catch (error) {
            console.error("Error adding video:", error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleVariantSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            await addProductVariant(id, variantData);
            setShowVariantModal(false);
            setVariantData({ name: '', price: '', stock: 0 });
            // Refresh product data
            const updatedProduct = await getSingleProduct(id);
            setProduct(updatedProduct);
        } catch (error) {
            console.error("Error adding variant:", error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleOverviewSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            await addProductOverview(id, overviewContent);
            setShowOverviewModal(false);
            setOverviewContent('');
            // Refresh product data
            const updatedProduct = await getSingleProduct(id);
            setProduct(updatedProduct);
        } catch (error) {
            console.error("Error adding overview:", error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <Loader />;
    if (error) return <div className="update-error">Error: {error}</div>;
    if (!product) return <div className="update-not-found">Product not found</div>;

    return (
        <div className="update-container">
            <h1 className="update-title">Update Product</h1>
            
            <form onSubmit={handleSubmit} className="update-form">
                <div className="form-group">
                    <label htmlFor="name">Product Name</label>
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
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="price">Price</label>
                        <input
                            type="number"
                            id="price"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            required
                            min="0"
                            step="0.01"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="mrp">MRP</label>
                        <input
                            type="number"
                            id="mrp"
                            name="mrp"
                            value={formData.mrp}
                            onChange={handleChange}
                            required
                            min="0"
                            step="0.01"
                        />
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="product_code">Product Code</label>
                        <input
                            type="text"
                            id="product_code"
                            name="product_code"
                            value={formData.product_code}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="stock">Stock Quantity</label>
                        <input
                            type="number"
                            id="stock"
                            name="stock"
                            value={formData.stock}
                            onChange={handleChange}
                            required
                            min="0"
                        />
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="whats_inside">What's Inside</label>
                    <textarea
                        id="whats_inside"
                        name="whats_inside"
                        value={formData.whats_inside}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="category">Category ID</label>
                        <input
                            type="number"
                            id="category"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            required
                            min="1"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="brand">Brand ID</label>
                        <input
                            type="number"
                            id="brand"
                            name="brand"
                            value={formData.brand}
                            onChange={handleChange}
                            required
                            min="1"
                        />
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="youtube_url">YouTube URL</label>
                    <input
                        type="url"
                        id="youtube_url"
                        name="youtube_url"
                        value={formData.youtube_url}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="broacher">Broacher URL</label>
                    <input
                        type="text"
                        id="broacher"
                        name="broacher"
                        value={formData.broacher}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="tax">Tax Type</label>
                        <input
                            type="text"
                            id="tax"
                            name="tax"
                            value={formData.tax}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="tax_value">Tax Value</label>
                        <input
                            type="number"
                            id="tax_value"
                            name="tax_value"
                            value={formData.tax_value}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="discount_price">Discount Price</label>
                    <input
                        type="number"
                        id="discount_price"
                        name="discount_price"
                        value={formData.discount_price}
                        onChange={handleChange}
                        min="0"
                        step="0.01"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="more_info">More Info</label>
                    <textarea
                        id="more_info"
                        name="more_info"
                        value={formData.more_info}
                        onChange={handleChange}
                    />
                </div>

                <div className="extra-actions">
                    <button 
                        type="button" 
                        className="action-btn"
                        onClick={() => setShowPhotosModal(true)}
                    >
                        Add Photos
                    </button>
                    <button 
                        type="button" 
                        className="action-btn"
                        onClick={() => setShowVideoModal(true)}
                    >
                        Add Video
                    </button>
                    <button 
                        type="button" 
                        className="action-btn"
                        onClick={() => setShowVariantModal(true)}
                    >
                        Add Variant
                    </button>
                    <button 
                        type="button" 
                        className="action-btn"
                        onClick={() => setShowOverviewModal(true)}
                    >
                        Add Overview
                    </button>
                </div>

                <div className="form-group checkbox-group">
                    <input
                        type="checkbox"
                        id="is_available"
                        name="is_available"
                        checked={formData.is_available}
                        onChange={handleChange}
                    />
                    <label htmlFor="is_available">Available for sale</label>
                </div>

                <div className="form-actions">
                    <button type="submit" className="update-btn">
                        Update Product
                    </button>
                    <button 
                        type="button" 
                        className="cancel-btn"
                        onClick={() => navigate('/admin/products')}
                    >
                        Cancel
                    </button>
                </div>
            </form>

            {/* Photos Modal */}
            {showPhotosModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3 className="modal-title">Add Photos</h3>
                            <button 
                                className="modal-close-btn"
                                onClick={() => setShowPhotosModal(false)}
                            >
                                ×
                            </button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handlePhotosSubmit}>
                                <div className="form-group">
                                    <label>Select Photos</label>
                                    <input 
                                        type="file" 
                                        multiple 
                                        onChange={(e) => setPhotos([...e.target.files])}
                                        accept="image/*"
                                    />
                                </div>
                                <div className="form-actions">
                                    <button type="submit" disabled={loading || photos.length === 0}>
                                        {loading ? 'Uploading...' : 'Upload Photos'}
                                    </button>
                                    <button 
                                        type="button" 
                                        className="cancel-btn"
                                        onClick={() => setShowPhotosModal(false)}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {/* Video Modal */}
            {showVideoModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3 className="modal-title">Add Video</h3>
                            <button 
                                className="modal-close-btn"
                                onClick={() => setShowVideoModal(false)}
                            >
                                ×
                            </button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleVideoSubmit}>
                                <div className="form-group">
                                    <label>Video URL</label>
                                    <input 
                                        type="url" 
                                        value={videoUrl}
                                        onChange={(e) => setVideoUrl(e.target.value)}
                                        placeholder="Enter YouTube or video URL"
                                    />
                                </div>
                                <div className="form-actions">
                                    <button type="submit" disabled={loading || !videoUrl}>
                                        {loading ? 'Adding...' : 'Add Video'}
                                    </button>
                                    <button 
                                        type="button" 
                                        className="cancel-btn"
                                        onClick={() => setShowVideoModal(false)}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {/* Variant Modal */}
            {showVariantModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3 className="modal-title">Add Variant</h3>
                            <button 
                                className="modal-close-btn"
                                onClick={() => setShowVariantModal(false)}
                            >
                                ×
                            </button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleVariantSubmit}>
                                <div className="form-group">
                                    <label>Variant Name</label>
                                    <input 
                                        type="text" 
                                        value={variantData.name}
                                        onChange={(e) => setVariantData({...variantData, name: e.target.value})}
                                        required
                                    />
                                </div>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Price</label>
                                        <input 
                                            type="number" 
                                            value={variantData.price}
                                            onChange={(e) => setVariantData({...variantData, price: e.target.value})}
                                            min="0"
                                            step="0.01"
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Stock</label>
                                        <input 
                                            type="number" 
                                            value={variantData.stock}
                                            onChange={(e) => setVariantData({...variantData, stock: e.target.value})}
                                            min="0"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="form-actions">
                                    <button type="submit" disabled={loading}>
                                        {loading ? 'Adding...' : 'Add Variant'}
                                    </button>
                                    <button 
                                        type="button" 
                                        className="cancel-btn"
                                        onClick={() => setShowVariantModal(false)}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {/* Overview Modal */}
            {showOverviewModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3 className="modal-title">Add Overview</h3>
                            <button 
                                className="modal-close-btn"
                                onClick={() => setShowOverviewModal(false)}
                            >
                                ×
                            </button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleOverviewSubmit}>
                                <div className="form-group">
                                    <label>Overview Content</label>
                                    <textarea 
                                        value={overviewContent}
                                        onChange={(e) => setOverviewContent(e.target.value)}
                                        rows="8"
                                        required
                                    />
                                </div>
                                <div className="form-actions">
                                    <button type="submit" disabled={loading || !overviewContent}>
                                        {loading ? 'Adding...' : 'Add Overview'}
                                    </button>
                                    <button 
                                        type="button" 
                                        className="cancel-btn"
                                        onClick={() => setShowOverviewModal(false)}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default UpdateProduct;