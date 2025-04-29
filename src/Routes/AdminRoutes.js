// src/routes/AdminRoutes.js
import { Routes, Route } from 'react-router-dom';
import Home from '../Pages/Admin/Home';
import Dashboard from '../components/Admin/Dashboard';
import ViewProducts from '../components/Admin/Products/ViewProducts/ViewProducts';
import Order from '../components/Admin/Order/Order';
import ViewOrders from '../components/Admin/Order/ViewOrders';
import UserView from '../components/Admin/User/UserView';
import DetailedViewAdmin from '../components/Admin/Products/ViewProducts/DetailedView';
import LoginAdmin from '../Pages/Admin/Login'
import AddProducts from '../components/Admin/Products/AddProducts/AddProducts';
import Settings from '../components/Admin/Settings/Settings';
import OverView from '../components/Admin/OverView/OverView';
import UpdateProduct from '../components/Admin/Products/UpdateProducts/UpdateProduct';
function AdminRoutes() {
  return (
    <Routes>
        <Route path="/admin/Login" element={<LoginAdmin/>} />
        <Route path="/admin/dashboard" element={<Home><Dashboard/></Home>} />
        <Route path="/admin/products" element={<Home><ViewProducts/></Home>} />
        <Route path="/admin/orders" element={<Home><Order/></Home>} />
        <Route path="/admin/Vieworders" element={<Home><ViewOrders/></Home>} />
        <Route path="/admin/viewUsers" element={<Home><UserView/></Home>} />
        <Route path="/admin/AddProduct" element={<Home><AddProducts/></Home>} />
        <Route path="/admin/settings" element={<Home><Settings/></Home>} />
        <Route path="/admin/overview" element={<Home><OverView/></Home>} />
        <Route path="/admin/Updateproducts/:id" element={<Home><UpdateProduct/></Home>} />
        <Route path="/admin/products/:id" element={<Home><DetailedViewAdmin/></Home>} />


    </Routes>
  );
}

export default AdminRoutes; 