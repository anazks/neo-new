import React, { useEffect, useState } from 'react';
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
    if (error) return <div className="p-4 text-red-500">Error: {error}</div>;
    if (!product) return <div className="p-4 text-gray-400">Product not found</div>;

    return (
        <div className="min-h-screen bg-gray-900 text-gray-100 p-6">
            <h1 className="text-2xl font-bold mb-6">Update Product</h1>
            
            <form onSubmit={handleSubmit} className="bg-gray-800 rounded-lg p-6 shadow-lg">
                <div className="mb-4">
                    <label htmlFor="name" className="block mb-2">Product Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:border-blue-500 focus:outline-none"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="description" className="block mb-2">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:border-blue-500 focus:outline-none"
                        rows="4"
                        required
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                        <label htmlFor="price" className="block mb-2">Price</label>
                        <input
                            type="number"
                            id="price"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:border-blue-500 focus:outline-none"
                            required
                            min="0"
                            step="0.01"
                        />
                    </div>

                    <div>
                        <label htmlFor="mrp" className="block mb-2">MRP</label>
                        <input
                            type="number"
                            id="mrp"
                            name="mrp"
                            value={formData.mrp}
                            onChange={handleChange}
                            className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:border-blue-500 focus:outline-none"
                            required
                            min="0"
                            step="0.01"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                        <label htmlFor="product_code" className="block mb-2">Product Code</label>
                        <input
                            type="text"
                            id="product_code"
                            name="product_code"
                            value={formData.product_code}
                            onChange={handleChange}
                            className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:border-blue-500 focus:outline-none"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="stock" className="block mb-2">Stock Quantity</label>
                        <input
                            type="number"
                            id="stock"
                            name="stock"
                            value={formData.stock}
                            onChange={handleChange}
                            className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:border-blue-500 focus:outline-none"
                            required
                            min="0"
                        />
                    </div>
                </div>

                <div className="mb-4">
                    <label htmlFor="whats_inside" className="block mb-2">What's Inside</label>
                    <textarea
                        id="whats_inside"
                        name="whats_inside"
                        value={formData.whats_inside}
                        onChange={handleChange}
                        className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:border-blue-500 focus:outline-none"
                        rows="3"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                        <label htmlFor="category" className="block mb-2">Category ID</label>
                        <input
                            type="number"
                            id="category"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:border-blue-500 focus:outline-none"
                            required
                            min="1"
                        />
                    </div>

                    <div>
                        <label htmlFor="brand" className="block mb-2">Brand ID</label>
                        <input
                            type="number"
                            id="brand"
                            name="brand"
                            value={formData.brand}
                            onChange={handleChange}
                            className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:border-blue-500 focus:outline-none"
                            required
                            min="1"
                        />
                    </div>
                </div>

                <div className="mb-4">
                    <label htmlFor="youtube_url" className="block mb-2">YouTube URL</label>
                    <input
                        type="url"
                        id="youtube_url"
                        name="youtube_url"
                        value={formData.youtube_url}
                        onChange={handleChange}
                        className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:border-blue-500 focus:outline-none"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="broacher" className="block mb-2">Broacher URL</label>
                    <input
                        type="text"
                        id="broacher"
                        name="broacher"
                        value={formData.broacher}
                        onChange={handleChange}
                        className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:border-blue-500 focus:outline-none"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                        <label htmlFor="tax" className="block mb-2">Tax Type</label>
                        <input
                            type="text"
                            id="tax"
                            name="tax"
                            value={formData.tax}
                            onChange={handleChange}
                            className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:border-blue-500 focus:outline-none"
                        />
                    </div>

                    <div>
                        <label htmlFor="tax_value" className="block mb-2">Tax Value</label>
                        <input
                            type="number"
                            id="tax_value"
                            name="tax_value"
                            value={formData.tax_value}
                            onChange={handleChange}
                            className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:border-blue-500 focus:outline-none"
                        />
                    </div>
                </div>

                <div className="mb-4">
                    <label htmlFor="discount_price" className="block mb-2">Discount Price</label>
                    <input
                        type="number"
                        id="discount_price"
                        name="discount_price"
                        value={formData.discount_price}
                        onChange={handleChange}
                        className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:border-blue-500 focus:outline-none"
                        min="0"
                        step="0.01"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="more_info" className="block mb-2">More Info</label>
                    <textarea
                        id="more_info"
                        name="more_info"
                        value={formData.more_info}
                        onChange={handleChange}
                        className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:border-blue-500 focus:outline-none"
                        rows="3"
                    />
                </div>

                <div className="flex flex-wrap gap-3 mb-6">
                    <button 
                        type="button" 
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded"
                        onClick={() => setShowPhotosModal(true)}
                    >
                        Add Photos
                    </button>
                    <button 
                        type="button" 
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded"
                        onClick={() => setShowVideoModal(true)}
                    >
                        Add Video
                    </button>
                    <button 
                        type="button" 
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded"
                        onClick={() => setShowVariantModal(true)}
                    >
                        Add Variant
                    </button>
                    <button 
                        type="button" 
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded"
                        onClick={() => setShowOverviewModal(true)}
                    >
                        Add Overview
                    </button>
                </div>

                <div className="flex items-center mb-6">
                    <input
                        type="checkbox"
                        id="is_available"
                        name="is_available"
                        checked={formData.is_available}
                        onChange={handleChange}
                        className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
                    />
                    <label htmlFor="is_available" className="ml-2">Available for sale</label>
                </div>

                <div className="flex gap-3">
                    <button type="submit" className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded">
                        Update Product
                    </button>
                    <button 
                        type="button" 
                        className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded"
                        onClick={() => navigate('/admin/products')}
                    >
                        Cancel
                    </button>
                </div>
            </form>

            {/* Photos Modal */}
            {showPhotosModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-bold">Add Photos</h3>
                            <button 
                                className="text-gray-400 hover:text-white"
                                onClick={() => setShowPhotosModal(false)}
                            >
                                ×
                            </button>
                        </div>
                        <div className="mb-4">
                            <form onSubmit={handlePhotosSubmit}>
                                <div className="mb-4">
                                    <label className="block mb-2">Select Photos</label>
                                    <input 
                                        type="file" 
                                        multiple 
                                        onChange={(e) => setPhotos([...e.target.files])}
                                        accept="image/*"
                                        className="block w-full text-sm text-gray-400
                                        file:mr-4 file:py-2 file:px-4
                                        file:rounded file:border-0
                                        file:text-sm file:font-semibold
                                        file:bg-blue-500 file:text-white
                                        hover:file:bg-blue-600"
                                    />
                                </div>
                                <div className="flex gap-3">
                                    <button 
                                        type="submit" 
                                        disabled={loading || photos.length === 0}
                                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded disabled:opacity-50"
                                    >
                                        {loading ? 'Uploading...' : 'Upload Photos'}
                                    </button>
                                    <button 
                                        type="button" 
                                        className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded"
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
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-bold">Add Video</h3>
                            <button 
                                className="text-gray-400 hover:text-white"
                                onClick={() => setShowVideoModal(false)}
                            >
                                ×
                            </button>
                        </div>
                        <div className="mb-4">
                            <form onSubmit={handleVideoSubmit}>
                                <div className="mb-4">
                                    <label className="block mb-2">Video URL</label>
                                    <input 
                                        type="url" 
                                        value={videoUrl}
                                        onChange={(e) => setVideoUrl(e.target.value)}
                                        placeholder="Enter YouTube or video URL"
                                        className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:border-blue-500 focus:outline-none"
                                    />
                                </div>
                                <div className="flex gap-3">
                                    <button 
                                        type="submit" 
                                        disabled={loading || !videoUrl}
                                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded disabled:opacity-50"
                                    >
                                        {loading ? 'Adding...' : 'Add Video'}
                                    </button>
                                    <button 
                                        type="button" 
                                        className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded"
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
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-bold">Add Variant</h3>
                            <button 
                                className="text-gray-400 hover:text-white"
                                onClick={() => setShowVariantModal(false)}
                            >
                                ×
                            </button>
                        </div>
                        <div className="mb-4">
                            <form onSubmit={handleVariantSubmit}>
                                <div className="mb-4">
                                    <label className="block mb-2">Variant Name</label>
                                    <input 
                                        type="text" 
                                        value={variantData.name}
                                        onChange={(e) => setVariantData({...variantData, name: e.target.value})}
                                        className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:border-blue-500 focus:outline-none"
                                        required
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4 mb-4">
                                    <div>
                                        <label className="block mb-2">Price</label>
                                        <input 
                                            type="number" 
                                            value={variantData.price}
                                            onChange={(e) => setVariantData({...variantData, price: e.target.value})}
                                            className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:border-blue-500 focus:outline-none"
                                            min="0"
                                            step="0.01"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block mb-2">Stock</label>
                                        <input 
                                            type="number" 
                                            value={variantData.stock}
                                            onChange={(e) => setVariantData({...variantData, stock: e.target.value})}
                                            className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:border-blue-500 focus:outline-none"
                                            min="0"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="flex gap-3">
                                    <button 
                                        type="submit" 
                                        disabled={loading}
                                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded disabled:opacity-50"
                                    >
                                        {loading ? 'Adding...' : 'Add Variant'}
                                    </button>
                                    <button 
                                        type="button" 
                                        className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded"
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
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-bold">Add Overview</h3>
                            <button 
                                className="text-gray-400 hover:text-white"
                                onClick={() => setShowOverviewModal(false)}
                            >
                                ×
                            </button>
                        </div>
                        <div className="mb-4">
                            <form onSubmit={handleOverviewSubmit}>
                                <div className="mb-4">
                                    <label className="block mb-2">Overview Content</label>
                                    <textarea 
                                        value={overviewContent}
                                        onChange={(e) => setOverviewContent(e.target.value)}
                                        className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:border-blue-500 focus:outline-none"
                                        rows="8"
                                        required
                                    />
                                </div>
                                <div className="flex gap-3">
                                    <button 
                                        type="submit" 
                                        disabled={loading || !overviewContent}
                                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded disabled:opacity-50"
                                    >
                                        {loading ? 'Adding...' : 'Add Overview'}
                                    </button>
                                    <button 
                                        type="button" 
                                        className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded"
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