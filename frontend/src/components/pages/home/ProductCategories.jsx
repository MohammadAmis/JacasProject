import { useState } from 'react';
import PropTypes from 'prop-types';
import Card_Product from './Card_Product';
import { 
  FaUtensils, 
  FaBookOpen, 
  FaPlug, 
  FaBoxOpen 
} from 'react-icons/fa';

const ProductCategories = ({ productsByCategory }) => {
  const categories = [
    { name: 'Food', icon: <FaUtensils className="w-8 h-8" /> },
    { name: 'Spices', icon: <FaBookOpen className="w-8 h-8" /> },
    { name: 'Electronics', icon: <FaPlug className="w-8 h-8" /> },
    { name: 'Others', icon: <FaBoxOpen className="w-8 h-8" /> }
  ];

  const [activeTab, setActiveTab] = useState(categories[0].name);

  return (
    <section className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-0 py-6">
      {/* Main Container */}
      <div className="bg-white rounded-2xl shadow-2xl p-2 sm:p-4 lg:p-6">
        <h2 className="text-4xl font-bold text-black mb-6 text-center">
          Explore Our Categories
        </h2>

        {/* Category Cards Container */}
        <div className="mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 justify-evenly ">
            {categories.map((category) => (
              <button
                key={category.name}
                onClick={() => setActiveTab(category.name)}
                className={`group relative p-6 rounded-xl transition-all duration-300 
                  flex items-center justify-center space-x-4 overflow-hidden 
                  ${activeTab === category.name 
                    ? 'bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg'
                    : 'bg-gray-700 hover:bg-gray-600 text-gray-200'}
                `}
              >
                <span className="flex-shrink-0 z-10">{category.icon}</span>
                <span className="text-2xl font-semibold z-10">{category.name}</span>
                {/* Hover effect layer */}
                <div className={`absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-20 
                  transition-opacity duration-300 ${activeTab === category.name ? 'hidden' : ''}`}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Products Container */}
        <div className="bg-gray-800 rounded-xl p-4 shadow-inner">
          {categories.map((category) => (
            <div
              key={category.name}
              className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center gap-4
                transition-opacity duration-500 ${
                  activeTab !== category.name ? 'hidden' : ''
                }`}
            >
              {productsByCategory[category.name]?.length > 0 ? (
                productsByCategory[category.name].map((product) => (
                  <Card_Product key={product._id} product={product} />
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <p className="text-gray-400 text-lg italic">
                    No products found in {category.name} category
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

ProductCategories.propTypes = {
  productsByCategory: PropTypes.shape({
    Food: PropTypes.array,
    Spices: PropTypes.array,
    Electronics: PropTypes.array,
    Others: PropTypes.array,
  }).isRequired,
};

export default ProductCategories;