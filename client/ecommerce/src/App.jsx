import './App.css'
import HomePage from './pages/HomePage'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Register from './pages/UserRegister'
import Login from './pages/Login'
import SellerDashboard from './pages/SellerDashboard'
import UserDashboard from './pages/UserDashboard'
import AddProduct from './components/AddProduct'
import CartPage from './pages/CartPage'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sellerdashboard" element={<SellerDashboard />} />
          <Route path='/userdashboard' element={<UserDashboard />} />
          <Route path="/add-product/:sellerId" element={<AddProduct />} />
          <Route path='/cart/:userId' element={<CartPage/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
