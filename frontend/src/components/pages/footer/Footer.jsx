import { FaFacebook, FaTwitter, FaInstagram, FaGithub } from 'react-icons/fa';
// import logo from '../../../assets/Logo.png';

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 ">
          
          {/* Logo */}
          <div className="flex items-center sm:col-span-2 lg:col-span-1">
            <img 
              src={logo} 
              alt="Company Logo" 
              className="h-42 w-auto" // Adjust height as needed
            />
          </div>

          {/* Quick Links */}
          <div className='justify-self-center'>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <nav className="space-y-2">
              <a href="#" className="block hover:text-indigo-400 transition-colors">About</a>
              <a href="#" className="block hover:text-indigo-400 transition-colors">Products</a>
              <a href="#" className="block hover:text-indigo-400 transition-colors">Your Cart</a>
            </nav>
          </div>

          {/* Support */}
          <div className='justify-self-center'>
            <h3 className="text-white font-semibold mb-4">Support</h3>
            <nav className="space-y-2">
              <a href="#" className="block hover:text-indigo-400 transition-colors">Contact Us</a>
              <a href="#" className="block hover:text-indigo-400 transition-colors">FAQ</a>
              <a href="#" className="block hover:text-indigo-400 transition-colors">Shipping</a>
              <a href="#" className="block hover:text-indigo-400 transition-colors">Returns Policy</a>
            </nav>
          </div>

          {/* Follow Us */}
          <div className="sm:col-span-2 lg:col-span-1 justify-self-center">
            <h3 className="text-white font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4 mb-6">
              <a href="#" className="text-gray-400 hover:text-indigo-400 transition-colors">
                <FaFacebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-indigo-400 transition-colors">
                <FaTwitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-indigo-400 transition-colors">
                <FaInstagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-indigo-400 transition-colors">
                <FaGithub className="h-6 w-6" />
              </a>
            </div>

            {/* Newsletter moved below Follow Us */}
            <div className="space-y-4 justify-self-center">
              <p className="text-sm">Join our newsletter for updates</p>
              <form className="flex gap-2">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="w-full px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:border-indigo-500"
                />
                <button 
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-white font-medium transition-colors"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center flex flex-row items-center justify-center gap-4">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Mohammad Amis. All rights reserved.
          </p>
          <a href="#" className="text-gray-500 hover:text-gray-300 text-sm">Privacy Policy</a>
          <a href="#" className="text-gray-500 hover:text-gray-300 text-sm">Terms of Service</a>
          
        </div>
      </div>
    </footer>
  )
}

export default Footer
