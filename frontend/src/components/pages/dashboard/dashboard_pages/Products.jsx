import { useState, useEffect} from "react";
import { FiEdit2, FiTrash2, FiUpload, FiRefreshCw, FiX,FiArrowUp } from "react-icons/fi";
import { BiSortAlt2 } from "react-icons/bi";
import ProductUploadForm from "./ProductUploadForm";
import axios from "axios";

const Products = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [originalProducts, setOriginalProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [modelInfo, setModelInfo] = useState({operation: true, data: null,});
  

  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.pageYOffset > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setProducts(originalProducts); // Reset to original list
    } else {
      const filtered = originalProducts.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setProducts(filtered);
    }
  }, [searchQuery, originalProducts]);

  const openModal = () => {
    setIsModalOpen(true);
  }
  
  const closeModal = () => {
    setIsModalOpen(false);
    setModelInfo({operation:true,data:null})

  }

  const fetchProducts = async () => {
    try {
      setIsFetching(true); // Show loading indicator (if needed)
      const response = await axios.get('https://global-venture.onrender.com/api/users/fetch-products');
      setOriginalProducts(response.data);
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setIsFetching(false); // Hide loading indicator
    }
  };

  useEffect(() => {
      fetchProducts();
  }, []);

  const updateProduct = (id) => {
    const result_product = originalProducts.find((product) => product._id === id);
    setModelInfo({operation:false,data:result_product})
    openModal()
    // console.log(result_product);
  };
  
  const deleteProduct=async(id)=>{
    try {
      const response=await axios.delete(`https://global-venture.onrender.com/api/users/fetch-products/${id}`)
      if(response.status===200){
        setProducts(products.filter(product => product._id !== id));
        setOriginalProducts(originalProducts.filter(product => product._id !== id));
      }
            
    } catch (error) {
      console.log(error)
    }
  }
        
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Products</h2>
        <div className="flex space-x-4">
          
          <div className="flex items-center ">
            <input
              type="text"
              className="bg-white outline-none focus:border-2 border border-gray-300 rounded-md px-4 py-2 shadow-sm text-sm"
              placeholder="Search..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </div>
          <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
            <BiSortAlt2 className="mr-2" />
            Sort
          </button>
          <button
            onClick={openModal}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            <FiUpload className="mr-2" />
            Add Product
          </button>
          <button
            onClick={fetchProducts} // Trigger refresh
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            <FiRefreshCw className="mr-2" />
            Refresh
          </button>
        </div>
      </div>

      {/* Products Grid */}
      {isFetching ? (
        <p className="text-center text-gray-500">Loading products...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
          {products.map((product) => (
            <div
              key={product._id}
              className="border rounded-lg p-4 relative hover:shadow-xl transition-shadow "
            >
              {/* Edit and Delete Buttons */}
              <div className="absolute top-2 right-2 flex space-x-2">
                <button className="p-2 text-blue-600 bg-white border border-gray-200 rounded-full hover:bg-blue-50"
                onClick={()=>updateProduct(product._id)}
                >
                  <FiEdit2 />
                </button>
                <button className="p-2 text-red-600 bg-white border border-gray-200 rounded-full hover:bg-red-50"
                onClick={()=>deleteProduct(product._id)}
                >
                  <FiTrash2 />
                </button>
              </div>

              {/* Product Image */}
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />

              {/* Product Details */}
              <h3 className="font-semibold text-lg mb-2 text-gray-600 bg-gray-300 w-full px-2 py-1 rounded-xl shadow-md capitalize">{product.name}</h3>
              <p className="text-gray-600 text-sm mb-2 bg-gray-300 w-full px-2 py-2 rounded-xl shadow-md capitalize">{product.description}</p>
              <div className="flex flex-wrap gap-3">
                <div className="text-sm text-gray-500 bg-gray-300 w-fit px-2 py-1 rounded-xl shadow-md">
                  <strong>Category:</strong> {product.category}
                </div>
                <div className="text-sm text-gray-500  bg-gray-300 w-fit px-2 py-1 rounded-xl shadow-md">
                  <strong>Stock:</strong> {product.stock}
                </div>
                <div className="text-sm text-gray-500  bg-gray-300 w-fit px-2 py-1 rounded-xl shadow-md">
                  <strong>Rating:</strong> {product.rating}
                </div>
                <div className="text-sm text-gray-500 capitalize bg-gray-300 w-fit px-2 py-1 rounded-xl shadow-md">
                  <strong>Status:</strong> {product.status}
                </div>
                <div className="text-sm text-gray-500  bg-gray-300 w-fit px-2 py-1 rounded-xl shadow-md">
                  <strong>MRP ₹ :</strong> {product.price}
                </div>
                <div className="text-sm text-gray-500  bg-gray-300 w-fit px-2 py-1 rounded-xl shadow-md">
                  <strong>Purchase At ₹ :</strong> ${product.purchasing_price}
                </div>
                <div className="text-sm text-gray-500  bg-gray-300 w-fit px-2 py-1 rounded-xl shadow-md">
                  <strong>Selling At ₹ :</strong> ${product.discount_price}
                </div>
              </div>

            </div>
          ))}
        </div>
      )}

      {/* Modal For Upload */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-lg w-full relative">
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
            >
              <FiX size={24} />
            </button>
            <ProductUploadForm modelInfo={modelInfo}  />
          </div>
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
