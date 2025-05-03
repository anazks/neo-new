import Axios from '../../src/Axios/Axios';

const getAllProduct = async () => {
    try {
        const response = await Axios.get('/inventory/Products_view/');
        console.log(response.data,"------------");
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
const getOverViewCategory = async()=>{
    try {
        const response = await Axios.get('/inventory/productattribute_category/');
        console.log(response.data);
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
   try {
    const formData = new FormData();
    for (const [key, value] of Object.entries(data)) {
        formData.append(key, value);
    }
        const response = await Axios.patch(`/inventory/product_admin/${id}/`, 
            
            formData,  {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        console.log(response.data, "in controller response");
        return response.data;
   } catch (error) {
        console.error('Error updating product:', error);
        return null;
    }
   
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
const relationShip = async () => {
    try {
        let relationShip = await Axios.get('/inventory/variant_relationship/')
        console.log(relationShip.data, "in controller response");
        return relationShip.data;
    } catch (error) {
        console.error('Error uploading product video:', error);
        return null;
    }
}

const addRelationShip = async (data) => {
    try {
        let relationShip = await Axios.post('/inventory/variant_relationship/', data)
        console.log(relationShip.data, "in controller response");
        return relationShip.data;
    } catch (error) {
        console.error('Error uploading product video:', error);
        return null;
    }
}

const AddVarient = async (data) => {
    try {
        console.log(data, "in controller");
        let product_id = parseInt(data.product_iddd)
        let variant_product_id = parseInt(data.variant_product_id)
        let relationship_id = parseInt(data.relationship)
        let relationship_value = data.name
        let newData = {
            product_id: product_id,
            variant_product_id: variant_product_id,
            relationship_id: relationship_id,
            relationship_value: relationship_value
        }
        let relationShip = await Axios.post('/inventory/product_variant/', newData)
        console.log(relationShip, "in controller response");
        return relationShip.data;
    } catch (error) {
        console.error('Error uploading product video:', error);
        return null;
    }
}
 const UpdateProductOverview = async (id,data) => {
    try {
        console.log(id,data, "in controller");
       
    } catch (error) {
        console.error('Error uploading product video:', error);
        return null;
    }
}
const updateVideo = async(data)=>{
    try {
        
    } catch (error) {
        console.error('Error uploading product video:', error);
        return null; 
    }
}
// Correct way to export multiple functions
export {updateVideo,getOverViewCategory,UpdateProductOverview,AddVarient,addRelationShip,relationShip,addProductOverview,addProductVariant,addProductVideo, uploadProductPhotos,getAllProduct, getSingleProduct,AddOverViewCategory,viewOverView,addoverViewCate,updateProduct };
