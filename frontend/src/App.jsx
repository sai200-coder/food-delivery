import React, { useState, Suspense, lazy } from 'react'
import Navbar from './components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Footer from './components/Footer/Footer'
import LoginPopup from './components/LoginPopup/LoginPopup'

// Lazy load components
const Cart = lazy(() => import('./pages/Cart/Cart'))
const Home = lazy(() => import('./pages/Home/Home'))
const Placeorder = lazy(() => import('./pages/Placeorder/Placeorder'))
const ChatBot = lazy(() => import('./components/ChatBot/ChatBot'))

// Loading fallback component
const LoadingSpinner = () => (
  <div className="loading-spinner">
    Loading...
  </div>
)

const App = () => {
  const [showLogin, setShowLogin] = useState(false)

  return (
    <>
      {showLogin ? <LoginPopup setShowLogin={setShowLogin} /> : <></>}
      <div className='app'>
        <Navbar setShowLogin={setShowLogin} />
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path='/order' element={<Placeorder />} />
          </Routes>
        </Suspense>
      </div>
      <Footer />
      <Suspense fallback={<LoadingSpinner />}>
        <ChatBot />
      </Suspense>
    </>
  )
}

export default App
