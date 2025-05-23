import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Products from "./Pages/user/Products";
import DetailedView from "./Pages/user/DetailedView";
import CardPage from "./components/user/CardPage/CartPage";
import Login from "./Pages/user/Login";
import LoginComponent from './components/user/Login/Login'
import Recomends from "./components/user/Recomendation/Recomends";
import SupportPage from "./Pages/user/SupportPage";
import Register from "././components//user/Registraion/Register";
// import AboutUs from "./components/user/AboutUs/AboutUs";
// import Login from "./components/user/Login/Login";
import AboutUs from "./Pages/user/AboutUs";
import AuthProvider from "./Context/UserContext";
// import Store from "./Pages/user/Store";
import AdminRoutes from "./Routes/AdminRoutes";
import Myorders from "./Pages/user/Myorders";
import GoogleLoginComponent from "./components/user/Google/GoogleLoginComponent";
import AddProducts from "./components/Admin/Products/AddProducts/AddProducts";
import OrderView from "./components/user/CardPage/OverView"
import Tokyo from "./components/user/Tickets/Tickets";
import TicketsResolved from  "./components/user/Tickets/TicketsResolved"
import Ticket from "./components/user/Tickets/Tickets"
import Solutions from "./components/user/Solutions/Solutions"
import Profile from "./components/user/Profile/Profile";
import ProfilePage from "./Pages/user/ProfilePage";
import Payed from './components/user/RazorPay/Payed';
import Nvidia from "./components/user/Nvidia/Nvidia";
import Failed from './components/user/RazorPay/Failed'
import Store from './components/user/Store/Store'
import PurchasedProducts from "./components/user/PurchasedProducts/PurchasedProducts";

function App() {
  return (
    <>
    <AuthProvider>
      <Routes>
            <Route path="/" element={ <Home/> } />
            <Route path="/Login" element={<LoginComponent/>}/>
            <Route path="/Register" element={<Register/>}/>
            <Route path="/products" element={ <Products/> } />
            <Route path="/details/:id" element={<DetailedView />} />
            <Route path="/cart" element={<CardPage/>} />
            <Route path="/special" element = {<Recomends/>} />
            <Route path="/Support" element = {<SupportPage/>} />
            <Route path="/about" element = {<AboutUs/>} />
            <Route path="/store" element={<Store/>}/>
            <Route path="/myorder" element={<Myorders/>}/>
            <Route path="/GoogleAuth" element={<GoogleLoginComponent/>}/>
            <Route path="/overView" element={<OrderView/>}/>
            <Route path="/tickets" element={<Ticket/>}/>
            <Route path="/ticketsresolved" element={<TicketsResolved/>}/>
            <Route path="/Solutions" element={<Solutions/>}/>
            <Route path="/profile"  element={<ProfilePage/>}/>
            <Route path="/payed" element={<Payed/>} />
            <Route path="/nvidia" element={<Nvidia/>} />
            <Route path="/failed" element={<Failed/>} />
            <Route path="/my-products" element={<PurchasedProducts/>}/>
            

          {/* 
            <Route path="/admin/login" element={<AdminLogin/>}/>
            <Route path="/admin/Home" element={<AdminHome/>}/> */}
        </Routes>
        <AdminRoutes />
      </AuthProvider>
    </>
  );
}

export default App;
