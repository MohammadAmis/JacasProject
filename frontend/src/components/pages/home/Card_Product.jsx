import { useState, useEffect } from "react";
import { useCart } from '../../../context/CartContext';
import { FaShoppingCart, FaStar, FaCheck } from "react-icons/fa";
import PropTypes from 'prop-types';
import { useNavigate } from "react-router-dom";
import jackfruit_1 from '../../../assets/product_1.webp';
import jackfruit_2 from '../../../assets/product_2.webp';
import jackfruit_3 from '../../../assets/product_3.webp';
import jackfruit_4 from '../../../assets/product_4.webp';

const Card_Product = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isInCart, setIsInCart] = useState(false);
  const { addToCart, removeFromCart, cartItems } = useCart();
  const navigate = useNavigate();

  const product_details = {
    _id: product._id,
    name: product.name,
    price: product.price,
    discount_price: product.discount_price,
    description: 'Premium jackfruit product with natural goodness.',
    images: [jackfruit_1, jackfruit_2, jackfruit_3, jackfruit_4],
    rating: product.rating
  };

  const calculateDiscount = (original, discounted) => {
    return Math.round(((original - discounted) / original) * 100);
  };

  useEffect(() => {
    const itemInCart = cartItems.find(item => item._id === product._id);
    setIsInCart(!!itemInCart);
  }, [cartItems, product._id]);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    
    if (isInCart) {
      removeFromCart(product._id);
    } else {
      addToCart({
        _id: product._id,
        name: product.name,
        price: product.discount_price,
        image: product.image,
        quantity: 1
      });
    }
  };

  const handleCardClick = () => {
    navigate(`/product-detail/${product_details._id}`, {
      state: { product_details }
    });
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <FaStar
        key={index}
        className={`h-3 w-3 ${
          index < Math.floor(rating) ? "text-yellow-400" : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <div 
      className="relative w-full max-w-xs bg-white rounded-xl shadow-lg transition-all duration-300 hover:shadow-2xl overflow-hidden cursor-pointer border border-gray-100"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleCardClick}
    >
      {/* Product Image */}
      <div className="relative h-64 w-full transition-all duration-300" role="img" aria-label={product.name}>
        <img
          src={product.image}
          alt={product.name} 
          className={`w-full h-full object-cover transition-all duration-300 ${isHovered ? 'scale-105' : ''}`}
        />
        
        {/* Discount Badge */}
        <span className="absolute top-3 left-3 bg-green-600 text-white px-2 py-1 rounded-md font-bold text-xs">
          {calculateDiscount(product.price, product.discount_price)}% OFF
        </span>
        
        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          className={`absolute top-3 right-3 p-2 rounded-full shadow-md transition-all duration-300 ${
            isInCart 
              ? 'bg-green-500 text-white' 
              : 'bg-white/90 hover:bg-white text-gray-800'
          }`}
          aria-label={isInCart ? "Remove from cart" : "Add to cart"}
        >
          {isInCart ? (
            <FaCheck className="h-4 w-4" />
          ) : (
            <FaShoppingCart className="h-4 w-4" />
          )}
        </button>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <h3 className="font-medium text-gray-900 text-sm mb-1 line-clamp-1 capitalize">
          {product.name}
        </h3>
        
        <div className="flex items-center gap-1 mb-2">
          {renderStars(product.rating)}
          <span className="text-xs text-gray-500 ml-1">({product.rating})</span>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-gray-900">
            ₹{product.discount_price}
          </span>
          <span className="text-sm text-gray-500 line-through">
            ₹{product.price}
          </span>
        </div>
      </div>
    </div>
  );
};

Card_Product.propTypes = {
  product: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    discount_price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired
  }).isRequired,
};

export default Card_Product;