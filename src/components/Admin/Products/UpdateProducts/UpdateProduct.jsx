import React, { useEffect, useState } from 'react';
import {AddVarient, getSingleProduct, updateProduct, uploadProductPhotos, addProductVideo, addProductVariant, addProductOverview,getAllProduct,relationShip,getOverViewCategory,UpdateProductOverview,updateVideo } from '../../../../Services/Products';
import { useParams, useNavigate } from 'react-router-dom';
import Loader from '../../../../Loader/Loader';
import {getCategory, getBrand, getTax} from '../../../../Services/Settings'
import BaseURL from '../../../../Static/Static';
import Alert from '../../../user/Alert/Alert';

function UpdateProduct() {
    const [videoFile, setVideoFile] = useState(null);

    const [products, setProducts] = useState([]);
    const [relationShips, setRelationShip] = useState([]);
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [taxes, setTaxes] = useState([]);
    const [overViewContents,setOverviewContents] = useState([])
    const [ALertStatus,setALertStatus] = useState(false)
    const [alertMessage, setAlertMessage] = useState('');

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
        const fetchCategory = async () => {
            try {
                let categoryData = await getCategory();
                console.log(categoryData, "category data in update product");
                setCategories(categoryData.data);
            } catch (error) {
                setError(error.message);
            }
        }
        const fetchBrand = async () => {
            try {
                let brandData = await getBrand();
                console.log(brandData, "brand data in update product");
                setBrands(brandData.data);
            } catch (error) {
                setError(error.message);
            }
        }
        const fetchTax = async () => {
            try {
                let taxData = await getTax();
                console.log(taxData, "tax data in update product");
                setTaxes(taxData.data);
            } catch (error) {
                setError(error.message);
            }
        }
        const getAllProductFromDB = async () => {
            try {
                const response = await getAllProduct();
                console.log(response, "all-----------");
                setProducts(response);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        }
        const GetrelationShip = async () => {
            try {
                const response = await relationShip();
                console.log(response, "-------- ship data in update product");
                setRelationShip(response);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        }
        const getOverViewCategoryFn = async () => {
            try {
                const response = await getOverViewCategory();
                console.log(response, "-------- over data in update product");
                setOverviewContents(response)
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        }
        getOverViewCategoryFn()
        GetrelationShip()
        getAllProductFromDB()
        fetchProduct();
        fetchCategory()
        fetchBrand()
        fetchTax()
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
        // Log all form data to console before submitting
        console.log("Submitting form data:", {
            ...formData,
            category: Number(formData.category),
            brand: Number(formData.brand),
            tax: formData.tax ? Number(formData.tax) : '',
            tax_value: formData.tax_value ? Number(formData.tax_value) : ''
        });
        
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
        
        if (!videoFile) return;
        
        setLoading(true);
        
        try {
          // Create a FormData object to send the file
          const formData = new FormData();
          formData.append('video', videoFile);
          formData.append('product_Id', id); // Assuming you have productId available
          
          // Replace with your actual API endpoint for video upload
          const response = await updateVideo(formData)
          console.log(response, "response in video upload")
        //   const response = await fetch('/api/products/upload-video', {
        //     method: 'POST',
        //     body: formData,
        //     // Note: Don't set Content-Type header when using FormData
        //     // The browser will set it automatically with the correct boundary
        //   });
          
          if (!response) {
            throw new Error('Failed to upload video');
          }
          
          // Handle successful upload
          const result = await response.json();
          
          // Close modal and maybe refresh data
          setShowVideoModal(false);
          // Refresh product data if needed
          
          // Show success message
          setALertStatus(true)
            setAlertMessage('Video uploaded successfully');
         
        } catch (error) {
          console.error('Error uploading video:', error);
          setALertStatus(true)
          setAlertMessage('Video uploading failed');
        } finally {
          setLoading(false);
          setVideoFile(null); // Reset the file state
        }
      };

    const handleVariantSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            console.log("Variant data:", variantData);
            // await addProductVariant(id, variantData);
            variantData.product_iddd = id;
            console.log(variantData, "variant data in add variant")
            let response = await AddVarient(variantData)
            console.log(response, "response in add variant")
            if (response) {
                setAlertMessage(response.message)
                setALertStatus(true)
            }
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
            console.log("Overview content:", overviewContent);
            // overviewContent.product_id = id;
            await UpdateProductOverview(id, overviewContent);
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
            {
                ALertStatus && (
                    <Alert
                        message={alertMessage}
                        
                        type="success"
                    />
                )
            }
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
                        <label htmlFor="category" className="block mb-2">Category</label>
                        <select
                            id="category"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:border-blue-500 focus:outline-none"
                            required
                        >
                            <option value="">Select Category</option>
                            {categories.map(category => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label htmlFor="brand" className="block mb-2">Brand</label>
                        <select
                            id="brand"
                            name="brand"
                            value={formData.brand}
                            onChange={handleChange}
                            className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:border-blue-500 focus:outline-none"
                            required
                        >
                            <option value="">Select Brand</option>
                            {brands.map(brand => (
                                <option key={brand.id} value={brand.id}>
                                    {brand.name}
                                </option>
                            ))}
                        </select>
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
                        <select
                            id="tax"
                            name="tax"
                            value={formData.tax}
                            onChange={handleChange}
                            className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:border-blue-500 focus:outline-none"
                        >
                            <option value="">Select Tax Type</option>
                            {taxes.map(tax => (
                                <option key={tax.id} value={tax.id}>
                                    {tax.tax_name}
                                </option>
                            ))}
                        </select>
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
                                    <label className="block mb-2">Upload Video</label>
                                    <div className="flex flex-col">
                                        <input 
                                            type="file" 
                                            accept="video/*"
                                            onChange={(e) => setVideoFile(e.target.files[0])}
                                            className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:border-blue-500 focus:outline-none"
                                        />
                                        {videoFile && (
                                            <div className="mt-2 text-sm text-gray-300">
                                                Selected: {videoFile.name} ({(videoFile.size / (1024 * 1024)).toFixed(2)} MB)
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="flex gap-3">
                                    <button 
                                        type="submit" 
                                        disabled={loading || !videoFile}
                                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded disabled:opacity-50"
                                    >
                                        {loading ? 'Uploading...' : 'Upload Video'}
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


    <div className="grid grid-cols-2 gap-4 mb-4">
        {/* <div>
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
        </div> */}
        {/* <div>
            <label className="block mb-2">Stock</label>
            <input 
                type="number" 
                value={variantData.stock}
                onChange={(e) => setVariantData({...variantData, stock: e.target.value})}
                className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:border-blue-500 focus:outline-none"
                min="0"
                required
            />
        </div> */}
    </div>

    <div className="mb-4">
        <label className="block mb-2">Variant Product</label>
        <select
            value={variantData.variant_product_id || ''}
            onChange={(e) => setVariantData({...variantData, variant_product_id: e.target.value})}
            className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:border-blue-500 focus:outline-none"
        >
            <option value="">Select Variant Product</option>
            {products.filter(p => p.id !== variantData.product_id).map(product => (
                <option key={product.id} value={product.id}>
                    {product.name} (ID: {product.id})
                </option>
            ))}
        </select>
    </div>

    {/* Relationship Dropdown */}
    <div className="mb-4">
        <label className="block mb-2">Relationship</label>
        <select
            value={variantData.relationship || ''}
            onChange={(e) => setVariantData({...variantData, relationship: e.target.value})}
            className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:border-blue-500 focus:outline-none"
            required
        >
           <option value="">Select Variant Product</option>
            {relationShips.filter(p => p.id !== variantData.product_id).map(relationShips => (
                <option key={relationShips.id} value={relationShips.id}>
                    {relationShips.name} (ID: {relationShips.name})
                </option>
            ))}
        </select>
    </div>
    <div className="mb-4">
        <label className="block mb-2">Relation Ship</label>
        <input 
            type="text" 
            value={variantData.name}
            onChange={(e) => setVariantData({...variantData, name: e.target.value})}
            className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:border-blue-500 focus:outline-none"
            required
        />
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
    {/* Replaced textarea with select dropdown */}
    <select
      value={overviewContent}
      onChange={(e) => setOverviewContent(e.target.value)}
      className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:border-blue-500 focus:outline-none"
      required
    >
      <option value="">Select Overview Content</option>
      {/* Assuming overViewContent is your array with name and id */}
      {overViewContents.map(content => (
        <option key={content.id} value={content.id}>
          {content.name}
        </option>
      ))}
    </select>
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