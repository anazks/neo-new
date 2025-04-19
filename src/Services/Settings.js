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
export const AddoverViewCategory = async ()=>{
    try {
        let overViewCate = await Axios.post('')
    } catch (error) {
        
    }
} 

const ViewOverViewCate = async ()=>{
    try {
        
    } catch (error) {
        
    }
}

const AddOverViewItem = async ()=>{
    try {
        
    } catch (error) {
        
    }
}

export const viewAllOverView =  async()=>{
    try {
        
    } catch (error) {
        
    }
}