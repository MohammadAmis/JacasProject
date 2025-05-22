import { useState, useEffect, useRef } from "react";
import { NavLink, Link } from "react-router-dom";
import { FaCartPlus } from "react-icons/fa";
import { FiMenu, FiX, FiUser, FiBell, FiLogOut } from "react-icons/fi";
// import logo from "../../assets/Logo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const mobileMenuRef = useRef(null);
  const profileMenuRef = useRef(null);

  const menuItems = [
    { id: 1, name: "Home", path: "/" },
    { id: 2, name: "Products", path: "/products" },
    { id: 4, name: "About", path: "/about" },
    { id: 5, name: "Help", path: "/help" },
    { id: 6, name: "Dashboard", path: "/dashboard" },
  ];

  const profileMenuItems = [
    { id: 1, name: "Profile", path: "/profile", icon: <FiUser className="w-5 h-5" /> },
    { id: 2, name: "Notifications", path: "/notifications", icon: <FiBell className="w-5 h-5" /> },
    { id: 3, name: "Login", path: "/login", icon: <FiLogOut className="w-5 h-5" /> },
  ];

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="bg-[#508D69] shadow-lg h-16 sticky top-0 z-50">
      <div className="container-fluid mx-auto px-4 sm:px-6 lg:px-10 ">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Mobile Menu Button */}
          <div className="flex items-center justify-between w-full md:w-auto">
            <Link to="/" className="text-2xl mobile:text-3xl text-white font-semibold">
{/*               <img src={logo} alt="" className="h-12 w-full object-cover" /> */}
              Jacas
            </Link>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <Link to="/cart" className="mr-4">
                <FaCartPlus className="text-2xl text-white hover:text-green-900 transition-colors" />
              </Link>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-md text-white hover:bg-green-900 focus:outline-none focus:ring-2 focus:ring-white"
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
                        ? "text-white bg-green-900 bg-opacity-75" 
                        : "text-white hover:bg-green-900 hover:bg-opacity-75"
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
            <Link to="/cart" className="mr-6">
            
              <FaCartPlus className="text-2xl text-white  hover:text-green-900 transition-colors"  />
              
            </Link>
            
            <div className="relative" ref={profileMenuRef}>
              <button
                className="flex items-center bg-green-900 bg-opacity-25 rounded-full p-2 hover:bg-opacity-50 transition-colors focus:outline-none focus:ring-2 focus:ring-white"
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                aria-label="Profile menu"
              >
                <FiUser className="h-6 w-6 text-white" />
              </button>

              {showProfileMenu && (
                <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 z-50">
                  {profileMenuItems.map((item) => (
                    <Link
                      key={item.id}
                      to={item.path}
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                      onClick={() => setShowProfileMenu(false)}
                    >
                      {item.icon}
                      <span className="ml-3">{item.name}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          ref={mobileMenuRef}
          className={`md:hidden absolute w-full left-0 bg-[#508D69] transition-all duration-300 ease-in-out overflow-hidden ${
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
                      ? "text-white bg-green-900 bg-opacity-75"
                      : "text-white bg-green-700 hover:bg-opacity-75"
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
            <div className="pt-4 border-t border-gray-700">
              {profileMenuItems.map((item) => (
                <Link
                  key={item.id}
                  to={item.path}
                  className="flex items-center px-3 py-2 text-white hover:bg-green-900 hover:bg-opacity-75 rounded-md transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {item.icon}
                  <span className="ml-3">{item.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
