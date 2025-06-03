import { FaFacebook, FaTwitter, FaInstagram, FaGithub, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from 'react-icons/fa';
import logo from '../../../../src/assets/company-logo-3.png';

function Footer() {
  return (
    <footer className="bg-[#1a2d3a] text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Brand Column */}
          <div className="space-y-6">
            <div className="flex justify-center md:justify-start">
              <img 
                src={logo} 
                alt="Company Logo" 
                className="h-40 w-auto object-contain" // Increased from h-24 to h-40
              />
            </div>
            <p className="text-gray-400 text-center md:text-left text-lg"> {/* Increased text size */}
              Premium products for discerning customers. Quality you can trust.
            </p>
            <div className="flex justify-center md:justify-start space-x-4 pt-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FaFacebook className="h-6 w-6" /> {/* Increased icon size */}
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FaTwitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FaInstagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FaGithub className="h-6 w-6" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-white font-bold text-lg tracking-wider uppercase">Quick Links</h3>
            <nav className="space-y-3">
              <a href="/about" className=" text-gray-400 hover:text-white transition-colors flex items-start">
                <span className="bg-indigo-600 w-1 h-1 rounded-full mt-2 mr-2"></span>
                About Us
              </a>
              <a href="/products" className=" text-gray-400 hover:text-white transition-colors flex items-start">
                <span className="bg-indigo-600 w-1 h-1 rounded-full mt-2 mr-2"></span>
                Our Products
              </a>
              <a href="/cart" className=" text-gray-400 hover:text-white transition-colors flex items-start">
                <span className="bg-indigo-600 w-1 h-1 rounded-full mt-2 mr-2"></span>
                Your Cart
              </a>
              <a href="#" className=" text-gray-400 hover:text-white transition-colors flex items-start">
                <span className="bg-indigo-600 w-1 h-1 rounded-full mt-2 mr-2"></span>
                Track Order
              </a>
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-white font-bold text-lg tracking-wider uppercase">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-start">
                <FaMapMarkerAlt className="text-indigo-400 mt-1 mr-3 flex-shrink-0" />
                <span className="text-gray-400">123 Business Ave, Suite 500, San Francisco, CA 94107</span>
              </div>
              <div className="flex items-start">
                <FaEnvelope className="text-indigo-400 mt-1 mr-3 flex-shrink-0" />
                <span className="text-gray-400">info@company.com</span>
              </div>
              <div className="flex items-start">
                <FaPhoneAlt className="text-indigo-400 mt-1 mr-3 flex-shrink-0" />
                <span className="text-gray-400">+1 (555) 123-4567</span>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="text-white font-bold text-lg tracking-wider uppercase">Newsletter</h3>
            <p className="text-gray-400">
              Subscribe to get updates on new products and special offers
            </p>
            <form className="space-y-3">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                required
              />
              <button 
                type="submit"
                className="w-full px-4 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-white font-medium transition-colors shadow-lg"
              >
                Subscribe Now
              </button>
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between">
          <p className="text-gray-500 text-sm order-2 md:order-1 mt-4 md:mt-0">
            &copy; {new Date().getFullYear()} Mohammad Amis. All rights reserved.
          </p>
          <div className="flex space-x-6 order-1 md:order-2">
            <a href="#" className="text-gray-500 hover:text-white text-sm transition-colors">Privacy Policy</a>
            <a href="#" className="text-gray-500 hover:text-white text-sm transition-colors">Terms of Service</a>
            <a href="#" className="text-gray-500 hover:text-white text-sm transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer;