import React from 'react'
import Navbar from '../../components/LandingPageComponent/Navbar'
import Home from '../../components/LandingPageComponent/Home'
import Services from '../../components/LandingPageComponent/Services'
import About from '../../components/LandingPageComponent/About'
import Product from '../../components/LandingPageComponent/Product'
import Newsletter from '../../components/LandingPageComponent/Newsletter'
import MyFooter from '../../components/LandingPageComponent/MyFooter'
const LandingPage = () => {
  return (
    <div>
        <Navbar/>
        <Home/>
        <Services/>
        <About/>
        <Product/>
        <Newsletter/>
        <MyFooter/>
    </div>
  )
}

export default LandingPage
