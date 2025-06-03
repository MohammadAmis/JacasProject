/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { FiEdit2, FiTrash2, FiUpload, FiRefreshCw, FiX, FiArrowUp , FiSearch,FiFilter} from "react-icons/fi";
import ProductUploadForm from "./ProductUploadForm";
import axios from "axios";
import SkeletonLoader from "../../home/SkeletonLoader.jsx";

const Products = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [originalProducts, setOriginalProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [modelInfo, setModelInfo] = useState({operation: true, data: null,});
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false);

  // Sorting options
  const sortOptions = [
    { key: 'name', label: 'Name' },
    { key: 'price', label: 'Price' },
    { key: 'stock', label: 'Stock' },
    { key: 'rating', label: 'Rating' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.pageYOffset > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    fetchProducts();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const openModal = () => {
    setIsModalOpen(true);
  }
  
  const closeModal = () => {
    setIsModalOpen(false);
    setModelInfo({operation:true,data:null})

  }

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
    
    const sortedProducts = [...products].sort((a, b) => {
      if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
      if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
      return 0;
    });
    
    setProducts(sortedProducts);
    setIsSortOpen(false);
  };

  const fetchProducts = async () => {
    try {
      setIsFetching(true); // Show loading indicator (if needed)
      const response = await axios.get('api/users/fetch-products');
      setOriginalProducts(response.data);
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setIsFetching(false); // Hide loading indicator
    }
  };

  const updateProduct = (id) => {
      const result_product = originalProducts.find((product) => product._id === id);
      setModelInfo({operation:false,data:result_product})
      openModal()
      // console.log(result_product);
  };
    
  const deleteProduct=async(id)=>{
    try {
      // const response=await axios.delete(`https://global-venture.onrender.com/api/users/fetch-products/${id}`)
      const response=await axios.delete(`api/users/fetch-products/${id}`)
      if(response.status===200){
        setProducts(products.filter(product => product._id !== id));
        setOriginalProducts(originalProducts.filter(product => product._id !== id));
      }
            
    } catch (error) {
      console.log(error)
    }
  }

  const InfoBadge = ({ label, value }) => (
    <div className="flex justify-between items-center bg-white p-2 rounded-lg shadow-sm">
      <span className="text-gray-600">{label}:</span>
      <span className="font-medium text-gray-800">{value}</span>
    </div>
  );

  const PriceDisplay = ({ label, value }) => (
    <div className="flex justify-between items-center">
      <span className="text-gray-600">{label}:</span>
      <span className="font-semibold text-blue-600">
        ₹{Number(value).toLocaleString()}
      </span>
    </div>
  );

  const ProductCard = ({ product }) => (
    <div className="border rounded-lg p-4 relative hover:shadow-xl transition-shadow bg-gray-50">
      <div className="absolute top-2 right-2 flex space-x-2">
        <button 
          className="p-2 text-blue-600 hover:bg-blue-100 rounded-full transition-colors"
          onClick={() => updateProduct(product._id)}
          aria-label="Edit product"
        >
          <FiEdit2 />
        </button>
        <button 
          className="p-2 text-red-600 hover:bg-red-100 rounded-full transition-colors"
          onClick={() => deleteProduct(product._id)}
          aria-label="Delete product"
        >
          <FiTrash2 />
        </button>
      </div>

      <div className="h-48 bg-gray-200 rounded-lg mb-4 overflow-hidden">
        <img
          src={product.image || '/placeholder-product.jpg'}
          alt={product.name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>

      <h3 className="font-semibold text-lg mb-2 text-gray-800 capitalize">{product.name}</h3>
      
      <div className="grid grid-cols-2 gap-2 text-sm mb-3">
        <InfoBadge label="Category" value={product.category} />
        <InfoBadge label="Stock" value={product.stock} />
        <InfoBadge label="Rating" value={product.rating} />
        <InfoBadge label="Status" value={product.status} />
      </div>

      <div className="space-y-1 border-t pt-3">
        <PriceDisplay label="MRP" value={product.price} />
        <PriceDisplay label="Cost" value={product.purchasing_price} />
        <PriceDisplay label="Selling Price" value={product.discount_price} />
      </div>
    </div>
  );

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        {/* Left Section - Label */}
        <div className="w-full md:w-auto">
          <h1 className="text-2xl font-bold text-gray-900">Product Management</h1>
        </div>

        {/* Right Section - Search and Actions */}
        <div className="w-full md:w-auto flex items-center justify-end gap-3">
          {/* Search Container */}
          <div className="flex-1 flex items-center gap-2 mr-auto">
            {/* Mobile Search Trigger */}
            <button
              onClick={() => setIsSearchActive(!isSearchActive)}
              className="md:hidden p-2 hover:bg-gray-100 rounded-lg"
            >
              <FiSearch className="text-gray-600 text-lg" />
            </button>

            {/* Search Input - Takes available left space */}
            <div className={`${isSearchActive ? 'flex' : 'hidden md:flex'} relative flex-1 w-full`}>
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Search products"
              />
              {/* Mobile Close Button */}
              <button
                onClick={() => setIsSearchActive(false)}
                className="md:hidden absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 rounded-full"
              >
                <FiX className="text-gray-600" />
              </button>
            </div>
          </div>

          {/* Action Buttons - Always right-aligned */}
          <div className={`${isSearchActive ? 'hidden md:flex' : 'flex'} items-center gap-2`}>
            {/* Sort Button */}
            <div className="relative">
              <button 
                className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                onClick={() => setIsSortOpen(!isSortOpen)}
              >
                <FiFilter className="mr-2" />
                Sort
              </button>
              
              {isSortOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                  {sortOptions.map(option => (
                    <button
                      key={option.key}
                      onClick={() => handleSort(option.key)}
                      className="w-full px-4 py-2 text-left hover:bg-gray-100 flex justify-between items-center"
                    >
                      {option.label}
                      {sortConfig.key === option.key && (
                        <span className="text-blue-600">
                          {sortConfig.direction === 'asc' ? '↑' : '↓'}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Add Product Button */}
            <button
              onClick={openModal}
              className="flex items-center p-2 md:px-4 md:py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-200"
            >
              <FiUpload className="text-lg" />
              <span className="hidden md:block ml-2">Add</span>
            </button>

            {/* Refresh Button */}
            <button
              onClick={fetchProducts}
              className="flex items-center p-2 md:px-4 md:py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-200"
            >
              <FiRefreshCw className="text-lg" />
              <span className="hidden md:block ml-2">Refresh</span>
            </button>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      {isFetching ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => <SkeletonLoader key={i} />)}
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">No products found</p>
          <button
            onClick={openModal}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Add Your First Product
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}

      {/* Modal For Upload */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          
            
            <ProductUploadForm modelInfo={modelInfo} closeModal={closeModal}  />
          
        </div>
      )}

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className={`${
          showScrollTop ? "opacity-100" : "opacity-0"
        } fixed bottom-8 right-8 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50`}
        aria-label="Scroll to top"
      >
        <FiArrowUp />
      </button>
    </div>
  );
};

export default Products;
