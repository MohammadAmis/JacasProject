import { useState } from "react";
import { FaHeart, FaStar } from "react-icons/fa";
import PropTypes from 'prop-types';

const Card_Product = ({ product }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const calculateDiscount = (original, discounted) => {
    return Math.round(((original - discounted) / original) * 100);
  };

  const addToCart=(id)=>{
    alert("Product added to Cart ID : "+id);
  }

  const handleFavoriteClick = () => {
    setIsFavorite(!isFavorite);
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
      className="relative w-72 bg-white rounded-xl shadow-md transition-all duration-300 hover:shadow-xl overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
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
          className={`absolute bottom-0 left-0 right-0 bg-transparent  p-4 transform transition-all duration-300 ${isHovered ? "translate-y-0" : "translate-y-full"}`}
        >
          <h3 className="font-bold text-lg capitalize text-white mb-2">
            {product.name}
          </h3>
          <div className="flex items-center justify-between mb-2">
            {/* <span className="line-through text-xl text-gray-200 ">
            ₹{product.price}
            </span> */}
            <span className="text-2xl font-bold text-white">
            ₹{product.discount_price}
            </span>
            <div className="flex gap-1">{renderStars(Math.ceil((Math.random()*10)/2))}</div>
          </div>
          <div className="flex items-center justify-center">
            {/* <span className="text-sm text-white">
              Rating: {product.rating}/5
            </span> */}
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
              aria-label="Add to cart"
              onClick={()=>addToCart(product._id)}
            >
              Add to Cart
            </button>
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