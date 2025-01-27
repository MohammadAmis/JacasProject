import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/header/Navbar';
import Home from './components/pages/home/Home';
import Products from './components/pages/product/ProductList';
import ProductDetail from './components/pages/home/ProductDetail';
import About from './components/pages/about/About';
import Help from './components/pages/help/Help';
import Notifications from './components/pages/Notification';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import Cart from './components/pages/cart/Cart';
import CheckoutPage from './components/pages/cart/CheckOut';
import Profile from './components/pages/Profile';
import Dashboard from './components/pages/dashboard/Dashboard';
import Footer from './components/pages/footer/Footer';


const App = () => {

  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product-detail/:id" element={<ProductDetail />} />
        <Route path="/about" element={<About />} />
        <Route path="/help" element={<Help />} />
        <Route path='/cart' element={<Cart/>} />
        <Route path='/checkout' element={<CheckoutPage/>} />
        <Route path='/profile' element={<Profile/>} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/login" element={<Login />} />
        <Route path='/register' element={<Register/>} />
        <Route path='/dashboard' element={<Dashboard/>} />
      </Routes>
      <Footer/>
    </Router>
    

  );
};

export default App;