// Navbar.jsx
import { useState, useEffect, useRef } from "react";
import { NavLink, Link } from "react-router-dom";
import { FaCartPlus } from "react-icons/fa";
import { FiMenu, FiX, FiUser ,FiLogOut, FiLogIn} from "react-icons/fi";
import logo from "../../../src/assets/company-logo-3.png";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";

const Navbar = () => {
  const { user } = useAuth();
  const { cartItems } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const mobileMenuRef = useRef(null);
  const [unreadNotificationCount, setUnreadNotificationCount] = useState(2);
  // Simulating unread notifications count
  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const menuItems = [
    { id: 1, name: "Home", path: "/" },
    { id: 2, name: "Products", path: "/products" },
    { id: 4, name: "About", path: "/about" },
    { id: 5, name: "Help", path: "/help" },
  ];

  if (user?.role === "admin") {
    menuItems.push({ id: 6, name: "Dashboard", path: "/dashboard" });
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="bg-[#547792] shadow-lg h-16 sticky top-0 z-50">
      <div className="container-fluid mx-auto px-4 sm:px-6 lg:px-10 ">
        <div className="flex items-center justify-between h-16">
          {/* logo */}
          <div className="flex items-center justify-between w-full md:w-auto">
            <Link to="/" className="text-2xl mobile:text-3xl text-white font-semibold">
              <img src={logo} alt="Company Logo" className="h-16 w-auto object-contain" />
            </Link>

            {/* Mobile menu button and icons */}
            <div className="md:hidden flex items-center space-x-4">
              <Link to="/cart" className="relative">
                <FaCartPlus className="text-2xl text-white hover:text-[#273F4F] transition-colors" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#273F4F] text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </Link>
              
              {(user?.role === "user" || user?.role === "admin") ? (
                <Link to="/profile" className="relative h-full w-full px-3 py-1  rounded-full flex items-center justify-center transition-colors mr-6 text-white hover:text-[#273F4F] ring-2 ring-white hover:ring-[#273F4F]">
                  <FiUser className="text-2xl" />
                  <span className=" text-medium font-medium ml-1 capitalize">
                    {user?.username || "Profile"}
                    
                  </span>
                  {unreadNotificationCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-[#273F4F] text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                        {unreadNotificationCount}
                      </span>
                  )}
                </Link>
              ) : (
                <Link 
                  to="/login"
                  className="text-2xl text-white hover:text-[#273F4F] transition-colors"
                >
                  <FiLogIn className="w-6 h-6" />
                </Link>
              )}
              
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-1 rounded-md text-white hover:bg-[#273F4F] focus:outline-none focus:ring-2 focus:ring-white"
                aria-label="Toggle menu"
              >
                {isOpen ? <FiX className="h-6 w-6" /> : <FiMenu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {menuItems.map((item) => (
                <NavLink
                  key={item.id}
                  to={item.path}
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-md text-medium font-medium transition-colors ${
                      isActive 
                        ? "text-white bg-[#273F4F] " 
                        : "text-white hover:bg-[#273F4F] "
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              ))}
            </div>
          </div>

          {/* Desktop Right Section */}
          <div className="hidden md:flex items-center ml-4">
            <Link to="/cart" className="mr-6 relative">
              <FaCartPlus className="text-2xl text-white hover:text-[#273F4F] transition-colors" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#273F4F] text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Link>
            {(user?.role === "user" || user?.role === "admin") ? (
              <Link to="/profile" className="relative h-full w-full px-3 py-1  rounded-full flex items-center justify-center transition-colors mr-6 text-white hover:text-[#273F4F] ring-2 ring-white hover:ring-[#273F4F]">
                <FiUser className="text-2xl" />
                <span className=" text-medium font-medium ml-1 capitalize">{user?.username || "Account"}</span>
                {unreadNotificationCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-[#273F4F] text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                        {unreadNotificationCount}
                      </span>
                )}
                
              </Link>
            ) : (
              <Link to="/login" className="h-full w-full px-2 py-1  rounded-full flex items-center justify-center transition-colors mr-6 text-white hover:text-[#273F4F] ring-2 ring-white hover:ring-[#273F4F]">
                <FiLogOut className="text-2xl " />
                <span className="text-medium font-medium ml-1">Login</span>
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          ref={mobileMenuRef}
          className={`md:hidden absolute w-full left-0 bg-[#547792] transition-all duration-300 ease-in-out overflow-hidden ${
            isOpen ? "max-h-96 py-2 border-t border-gray-700" : "max-h-0"
          }`}
        >
          <div className="px-2 pt-2 pb-3 space-y-1">
            {menuItems.map((item) => (
              <NavLink
                key={item.id}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                    isActive
                      ? "text-white bg-[#273F4F] "
                      : "text-white "
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;