import React from 'react'
import Orders from '../../components/user/MyOrder/Orders'
import NavBar from '../../components/user/NavBar/NavBar'
import Footer from '../../components/user/Footer/Footer'
import ProductFooter from '../../components/user/Footer/ProductFooter'

function Myorders() {
  return (
    <div>
        <NavBar/>
        <Orders/>
        <ProductFooter/>
    </div>
  )
}

export default Myorders
