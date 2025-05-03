import Axios from '../Axios/Axios'

export const addBrand =  async (name)=>{
    try {
        console.log(name,"in brand...added")
        let addBrand = await Axios.post('/inventory/brands/',{name})
        return addBrand
    } catch (error) {
        console.log(error)
        return error
    }
}
export const getBrand = async ()=>{
    try {
        let brands = await Axios.get('/inventory/brands')
        console.log(brands,"brand")
        return brands
    } catch (error) {
        console.log(error)
        return error
    }   
}
export const deleteBrand =  async(id)=>{
    try {
        console.log(id,"in api")
       let deletedBrand = await Axios.delete(`/inventory/brands/${id}/`) 
       console.log(deletedBrand)
       return deletedBrand
    } catch (error) {
        console.log(error)
        return error
    }
}
export const addCategory = async (data)=>{
    try {
        console.log(data,"data category")
        let categoryAdded = await Axios.post('inventory/categories/',data)
        return categoryAdded
    } catch (error) {
        console.log(error)
        return error
    }
}
export const getCategory =  async()=>{
    try {
        let category = await Axios.get('/inventory/categories/')
        return(category)
    } catch (error) {
        console.log(error)
        return error
    }
}
export const deleteCategory =  async(id)=>{
    try {
        console.log(id,"in api")
       let deleteCate = await Axios.delete(`/inventory/categories/${id}/`) 
       console.log(deleteCate)
       return deleteCate
    } catch (error) {
        console.log(error)
        return error
    }
}
export const getTax = async()=>{
    try {
      let taxes = await Axios.get('/inventory/taxes/')  
      console.log(taxes,"taxes")
      return taxes
    } catch (error) {
        console.log(error)
    }
}
export const DeleteTax = async (id)=>{
    try {
       let taxDelete = Axios.delete(`/inventory/taxes/${id}/`) 
       return taxDelete
    } catch (error) {
            console.log(error)
    }
}
export const AddTax = async (data)=>{
    try {
        let taxesAdd =  await Axios.post('/inventory/taxes/',data)
        console.log(taxesAdd,"add tax")
        return taxesAdd
    } catch (error) {
        console.log(error)
        return error
    }
}
// export const AddoverViewCategory = async ()=>{
//     try {
//         let overViewCate = await Axios.post('')
//     } catch (error) {
        
//     }
// } 

// const ViewOverViewCate = async ()=>{
//     try {
        
//     } catch (error) {
        
//     }
// }

// const AddOverViewItem = async ()=>{
//     try {
        
//     } catch (error) {
        
//     }
// }

export const viewAllOverView =  async()=>{
    try {
        
    } catch (error) {
        
    }
}

export const addProduct = async (productDetails) => {
    try {
        console.log("Product Details Input:", productDetails);
        
        const data = new FormData();
        
        // Required fields with proper type conversions
        data.append('product_code', productDetails.get('product_code') || '');
        data.append('name', productDetails.get('name'));
        data.append('brand', Number(productDetails.get('brand'))); // Make sure it's a number
        data.append('description', productDetails.get('description'));
        data.append('category', Number(productDetails.get('category'))); // Make sure it's a number
        data.append('mrp', Number(productDetails.get('mrp'))); // Convert to number
        data.append('price', Number(productDetails.get('price'))); // Convert to number
        data.append('stock', Number(productDetails.get('stock'))); // Convert to integer
        data.append('whats_inside', productDetails.get('whats_inside'));
        
        // Optional fields (only append if available)
        const discount = productDetails.get('discount_price');
        if (discount && discount !== '') {
            data.append('discount_price', Number(discount));
        }
        
        const isAvailable = productDetails.get('is_available');
        if (isAvailable !== null && isAvailable !== undefined) {
            data.append('is_available', isAvailable === 'true' || isAvailable === true ? true : false);
        }
        
        const priceBT = productDetails.get('price_before_tax');
        if (priceBT && priceBT !== '') {
            data.append('price_before_tax', Number(priceBT));
        }
        
        const taxAmount = productDetails.get('tax_amount');
        if (taxAmount && taxAmount !== '') {
            data.append('tax_amount', Number(taxAmount));
        }
        
        const taxValue = productDetails.get('tax_value');
        if (taxValue && taxValue !== '') {
            data.append('tax_value', Number(taxValue)); // Converting to integer
        }
        
        const youtubeUrl = productDetails.get('youtube_url');
        if (youtubeUrl) {
            data.append('youtube_url', youtubeUrl);
        }
        
        const moreInfo = productDetails.get('more_info');
        if (moreInfo) {
            data.append('more_info', moreInfo);
        }
        
        // Handle file upload - use broacher as shown in the component
        const broacher = productDetails.get('broacher');
        if (broacher) {
            data.append('broacher', broacher);
        }
        
        console.log('FormData entries:');
        for (let pair of data.entries()) {
            console.log(pair[0] + ': ' + pair[1]);
        }
        
        let response = await Axios.post('/inventory/product_admin/', data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        console.log('Response:', response);
        return response;
    } catch (error) {
        console.error('Error adding product:', error.response?.data || error.message || error);
        throw error;
    }
}

export const getAnalytics = async () => {
    try {
        const response = await Axios.get('/analytics/customer-analytics/');
        console.log(response.data, "in controller response");
        return response.data;
    } catch (error) {
        console.error('Error fetching analytics:', error);
        return null; 
    }
}