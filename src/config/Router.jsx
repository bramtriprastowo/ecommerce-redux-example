import React, { Fragment } from 'react'
import { Route, Routes } from 'react-router-dom'
import About from '../pages/About'
import Cart from '../pages/Cart'
import Contact from '../pages/Contact'
import Home from '../pages/Home'
import Navbar from '../pages/components/Navbar'
import Product from '../pages/Product'
import Products from '../pages/Products'

const Router = () => {
  return (
    <Fragment>
    <Navbar />
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/products' element={<Products />} />
      <Route path='/products/:id' element={<Product />} />
      <Route path='/about' element={<About />} />
      <Route path='/contact' element={<Contact />} />
      <Route path='/cart' element={<Cart />} />
    </Routes>
    </Fragment>
  )
}

export default Router