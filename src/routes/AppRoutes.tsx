import { useEffect } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import AboutPage from '../pages/AboutPage'
import NotFoundPage from '../pages/NotFoundPage'
import ProductDetailsPage from '../pages/ProductDetailsPage'
import ProductsPage from '../pages/ProductsPage'

function RouteView() {
  const location = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [location.pathname])
  return <Routes location={location} key={location.pathname}><Route path="/" element={<Navigate to="/products" replace />} /><Route path="/products" element={<ProductsPage />} /><Route path="/products/:id" element={<ProductDetailsPage />} /><Route path="/about" element={<AboutPage />} /><Route path="*" element={<NotFoundPage />} /></Routes>
}

function AppRoutes() {
  return <><RouteView /><footer className="site-footer">A little good food for thought · Product data from DummyJSON</footer></>
}

export default AppRoutes