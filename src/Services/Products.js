import Axios from '../../src/Axios/Axios';

const getAllProduct = async () => {
    try {
        const response = await Axios.get('/inventory/Products_view/');
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching products:', error);
        return null;
    }
};

const getSingleProduct = async (id) => {
    try {
        const response = await Axios.get(`/inventory/Products_view_single/${id}`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching single product:', error);
        return null;
    }
};

const AddOverViewCategory = async(data)=>{
    try {
        console.log(data,"in controller");
       const response = await Axios.post('/inventory/productattribute_category/',data); 
       console.log(response.data,"in controller response");
        return response.data;
    } catch (error) {
        console.error('Error fetching overview:', error);
        return null; 
    }
}
const viewOverView = async()=>{
    try {
        const response = await Axios.get('/inventory/ProductAttributeCategoryListView');
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching overview:', error);
        return null; 
    }
}
const addoverViewCate = async(data)=>{
    try {
        const response = await Axios.post('/inventory/productattribute/',data);
        console.log(response.data,"in controller response");
        return response.data;
    } catch (error) {
        console.error('Error fetching overview:', error);
        return null;  
    }
}
const updateProduct = async (id, data) => {
   return null
}
const uploadProductPhotos = async (id, data) => {
    try {
        const response = await Axios.post(`/inventory/product/${id}/upload_photos/`, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        console.log(response.data, "in controller response");
        return response.data;
    } catch (error) {
        console.error('Error uploading product photos:', error);
        return null;
    }
}

const addProductVideo = async (id, data) => {
    try {
        const response = await Axios.post(`/inventory/product/${id}/upload_video/`, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        console.log(response.data, "in controller response");
        return response.data;
    } catch (error) {
        console.error('Error uploading product video:', error);
        return null;
    }
}
const addProductVariant = async (id, data) => {
    try {
        const response = await Axios.post(`/inventory/product/${id}/add_variant/`, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        console.log(response.data, "in controller response");
        return response.data;
    } catch (error) {
        console.error('Error uploading product video:', error);
        return null;
    }
}
const addProductOverview =  async (id, data) => {
    try {
        const response = await Axios.post(`/inventory/product/${id}/add_overview/`, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        console.log(response.data, "in controller response");
        return response.data;
    } catch (error) {
        console.error('Error uploading product video:', error);
        return null;
    }
}
// Correct way to export multiple functions
export {addProductOverview,addProductVariant,addProductVideo, uploadProductPhotos,getAllProduct, getSingleProduct,AddOverViewCategory,viewOverView,addoverViewCate,updateProduct };
