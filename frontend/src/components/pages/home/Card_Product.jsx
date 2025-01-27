import { useState } from "react";
import { FaHeart, FaStar } from "react-icons/fa";
import PropTypes from 'prop-types';
import { useNavigate } from "react-router-dom";
import jackfruit_1 from '../../../assets/product_1.webp';
import jackfruit_2 from '../../../assets/product_2.webp';
import jackfruit_3 from '../../../assets/product_3.webp';
import jackfruit_4 from '../../../assets/product_4.webp';



const Card_Product = ({ product }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const product_details= {
    id: product._id,
    name: 'Premium Wireless Headphones',
    price: 299.99,
    description: 'High-quality wireless headphones with noise cancellation and 30-hour battery life.',
    images: [
      jackfruit_1,
      jackfruit_2,
      jackfruit_3,
      jackfruit_4
    ],
    specs: [
      { name: 'Battery Life', value: '30 hours' },
      { name: 'Bluetooth Version', value: '5.0' },
      { name: 'Noise Cancellation', value: 'Active' },
      { name: 'Water Resistance', value: 'IPX4' },
      { name: 'Weight', value: '250g' },
      { name: 'Warranty', value: '2 years' }
    ]
  };

  const calculateDiscount = (original, discounted) => {
    return Math.round(((original - discounted) / original) * 100);
  };

  const handleFavoriteClick = (e) => {
    e.stopPropagation(); // Prevent card click when clicking favorite
    setIsFavorite(!isFavorite);
  };

  const handleCardClick = () => {
    // navigate(`/product-detail/${product._id}`, {  // this  is correct code for navigate to product detail page
    //   state: { product } // Pass product data via state
    // });
    navigate(`/product-detail/${product_details.id}`, {
      state: { product_details } // Pass product data via state
    });
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <FaStar
        key={index}
        className={`h-4 w-4 ${
          index < Math.floor(rating) ? "text-yellow-400" : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <div 
      className="relative w-72 bg-white rounded-xl shadow-md transition-all duration-300 hover:shadow-xl overflow-hidden cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleCardClick}
    >
      <div className="relative h-96 transition-all duration-300" role="img" aria-label={product.name}>
        <img
          src={product.image}
          alt={product.name} 
          className={`w-full h-full object-cover ${isHovered ? 'brightness-50' : ''}`}
        />
        <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-start">
          <span className="bg-red-500 text-white px-3 py-1 rounded-full font-bold text-sm">
            {calculateDiscount(product.price, product.discount_price)}% OFF
          </span>
          <button
            onClick={handleFavoriteClick}
            className="bg-white p-2 rounded-full shadow-md hover:scale-110 transition-transform duration-200"
            aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          >
            <FaHeart
              className={`h-5 w-5 ${
                isFavorite ? "text-red-500" : "text-gray-400"
              }`}
            />
          </button>
        </div>
        <div
          className={`absolute bottom-0 left-0 right-0 bg-transparent p-4 transform transition-all duration-300 ${isHovered ? "translate-y-0" : "translate-y-full"}`}
        >
          <h3 className="font-bold text-lg capitalize text-white mb-2">
            {product.name}
          </h3>
          <div className="flex items-center justify-between mb-2">
            <span className="text-2xl font-bold text-white">
              ₹{product.discount_price}
            </span>
            <div className="flex gap-1">{renderStars(product.rating)}</div>
          </div>
        </div>
      </div>
    </div>
  );
};


// Add PropTypes to validate the 'product' prop
Card_Product.propTypes = {
  product: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    discount_price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    rating:PropTypes.number.isRequired
  }).isRequired,
};

export default Card_Product;