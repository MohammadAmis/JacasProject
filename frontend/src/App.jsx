// app.jsx
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/header/Navbar';
import Home from './components/pages/home/Home';
import Products from './components/pages/product/ProductList';
import ProductDetail from './components/pages/home/ProductDetail';
import About from './components/pages/about/About';
import Help from './components/pages/help/Help';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import Cart from './components/pages/cart/Cart';
import CheckoutPage from './components/pages/cart/CheckOut';
import Profile from './components/pages/Profile';
import Dashboard from './components/pages/dashboard/Dashboard';
import Footer from './components/pages/footer/Footer';
import ProtectedRoute from './context/ProtectedRoute';

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product-detail/:id" element={<ProductDetail />} />
        <Route path="/about" element={<About />} />
        <Route path="/help" element={<Help />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/checkout"
          element={
            <ProtectedRoute allowedRoles={['user']}>
              <CheckoutPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute allowedRoles={['user', 'admin']}>
              <Profile />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
