import { Link } from 'react-router-dom';
import Carousel from './Carousel';
import FeaturedProduct from './FeaturedProduct';
import Testimonial from './testimonial/Testimonial';
import ProductCategories from './ProductCategories';
import { useState,useEffect } from 'react';
import { fetchData } from './fetchData';

const Home = () => {
  const [products, setProducts] = useState([]);
  
    useEffect(() => {
      const getProducts = async () => {
        try {
            fetchData(4).then(data => setProducts(data));

        } catch (err) {
          console.log(err.message || "Failed to fetch products");
        }
      };
  
      getProducts();
    }, []);
  
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Carousel/>

      {/* Featured Products Section */}
      <FeaturedProduct/>
      

      {/* Categories Section */}
      {/* <div className=" py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Shop by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {['Electronics', 'Fashion', 'Home & Living', 'Books'].map((category) => (
              <div 
                key={category} 
                className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow duration-300"
              >
                <h3 className="text-xl font-semibold mb-2">{category}</h3>
                <Link 
                  to={`/products?category=${category.toLowerCase()}`} 
                  className="text-indigo-600 hover:text-indigo-700"
                >
                  Explore →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div> */}

      <ProductCategories
        productsByCategory={{
          Food: products,
          // Recipes: recipeProducts,
          // Electronics: electronicProducts,
          // Others: otherProducts,
        }}
      />

      {/* Testimonials Section */}
      <Testimonial/>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-xl font-bold mb-4">E-Shop</h4>
              <p className="text-gray-400">
                Your one-stop destination for all shopping needs.
              </p>
            </div>
            <div>
              <h5 className="text-lg font-semibold mb-4">Quick Links</h5>
              <ul className="space-y-2">
                <li><Link to="/" className="text-gray-400 hover:text-white">Home</Link></li>
                <li><Link to="/products" className="text-gray-400 hover:text-white">Products</Link></li>
                <li><Link to="/cart" className="text-gray-400 hover:text-white">Cart</Link></li>
              </ul>
            </div>
            <div>
              <h5 className="text-lg font-semibold mb-4">Support</h5>
              <ul className="space-y-2">
                <li><Link to="/contact" className="text-gray-400 hover:text-white">Contact Us</Link></li>
                <li><Link to="/faq" className="text-gray-400 hover:text-white">FAQ</Link></li>
                <li><Link to="/returns" className="text-gray-400 hover:text-white">Returns</Link></li>
              </ul>
            </div>
            <div>
              <h5 className="text-lg font-semibold mb-4">Follow Us</h5>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white">Facebook</a>
                <a href="#" className="text-gray-400 hover:text-white">Twitter</a>
                <a href="#" className="text-gray-400 hover:text-white">Instagram</a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 E-Shop. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;