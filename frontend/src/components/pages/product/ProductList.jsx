import { useState, useEffect } from "react";
import { FiSearch, FiFilter,FiArrowUp } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { fetchData } from "../home/fetchData";
import Card_Product from "../home/Card_Product.jsx";

const ProductList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 2000 });
  const [originalProducts, setOriginalProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

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

  // Fetch products on initial render
  useEffect(() => {
    fetchData().then((data) => {
      setOriginalProducts(data);
      setFilteredProducts(data); // Set both original and filtered products
    });
  }, []); // Empty dependency array ensures this runs only once

  // Filter products whenever searchQuery or priceRange changes
  useEffect(() => {
    const filtered = originalProducts.filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesPrice =
        product.discount_price >= priceRange.min &&
        product.discount_price <= priceRange.max;
      return matchesSearch && matchesPrice;
    });
    setFilteredProducts(filtered);
  }, [searchQuery, priceRange, originalProducts]); // Dependencies for filtering

  return (
    <div className="max-w-7xl mx-auto px-4 py-4 my-3 rounded-xl bg-[#508D69]">
      <div className="mb-8 space-y-4">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="relative flex-1 min-w-[300px]">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Search products"
            />
          </div>
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            aria-expanded={isFilterOpen}
            aria-controls="filter-panel"
          >
            <FiFilter />
            <span>Filters</span>
          </button>
        </div>

        <AnimatePresence>
          {isFilterOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white p-4 rounded-lg shadow-md"
              id="filter-panel"
            >
              <div className="space-y-4">
                <h3 className="font-semibold">Price Range</h3>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min="0"
                    max="2000"
                    value={priceRange.min}
                    onChange={(e) =>
                      setPriceRange({ ...priceRange, min: Number(e.target.value) })
                    }
                    className="w-full"
                    aria-label="Minimum price"
                  />
                  <input
                    type="range"
                    min="0"
                    max="2000"
                    value={priceRange.max}
                    onChange={(e) =>
                      setPriceRange({ ...priceRange, max: Number(e.target.value) })
                    }
                    className="w-full"
                    aria-label="Maximum price"
                  />
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>${priceRange.min}</span>
                  <span>${priceRange.max}</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
        {filteredProducts.map((product) => (
          <motion.div
            key={product.id}
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className=" rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            <Card_Product key={product._id} product={product} />
          </motion.div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          No products found matching your criteria
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

export default ProductList;
