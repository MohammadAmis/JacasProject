import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaHeart, FaTruck, FaLeaf, FaRecycle, FaStar } from 'react-icons/fa';
import { RiSecurePaymentLine } from 'react-icons/ri';
import { useCart } from '../../../context/CartContext';

const ProductDetail = () => {
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isInCart, setIsInCart] = useState(false);
  const [cartQuantity, setCartQuantity] = useState(0);
  const { addToCart, removeFromCart, updateQuantity, cartItems } = useCart();
  const { state } = useLocation();
  const navigate = useNavigate();
  
  const product = state?.product_details;

  useEffect(() => {
    if (product) {
      const itemInCart = cartItems.find(item => item._id === product._id);
      setIsInCart(!!itemInCart);
      if (itemInCart) {
        setCartQuantity(itemInCart.quantity);
      }
    }
  }, [cartItems, product]);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 text-center">
        <div className="bg-white rounded-xl shadow-md p-8 max-w-md mx-auto">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Product Not Found</h2>
          <p className="text-gray-600 mb-6">The product you&apos;re looking for doesn&apos;t exist or has been removed.</p>
          <button 
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Browse Products
          </button>
        </div>
      </div>
    );
  }

  const handleBuyNow = () => {
    // First add to cart, then navigate to checkout
    handleAddToCart();
    navigate('/checkout');
  };
  
  const handleAddToCart = (e) => {
    e?.stopPropagation();
    
    if (isInCart) {
      // If already in cart, update the quantity
      updateQuantity(product._id, cartQuantity + selectedQuantity);
    } else {
      addToCart({
        _id: product._id,
        name: product.name,
        price: product.discount_price || product.price,
        image: product.images[0],
        quantity: selectedQuantity  // Use the selected quantity
      });
    }
  };

  const handleRemoveFromCart = (e) => {
    e.stopPropagation();
    removeFromCart(product._id);
  };

  // Render stars for rating
  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <FaStar
        key={index}
        className={`w-5 h-5 ${index < Math.floor(rating) ? "text-yellow-400" : "text-gray-300"}`}
      />
    ));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Image Gallery */}
        <div className="flex flex-col-reverse lg:flex-row gap-4">
          {/* Thumbnails */}
          <div className="flex lg:flex-col gap-2 justify-center overflow-x-hidden py-2 lg:py-0 px-4">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                  selectedImage === index 
                    ? 'border-[#273F4F] scale-105 shadow-sm' 
                    : 'border-gray-200 hover:border-[#273F4F]'
                }`}
              >
                <img
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
          
          {/* Main Image */}
          <div className="relative w-full h-80 sm:h-96 lg:h-[500px] bg-white rounded-xl shadow-md overflow-hidden flex items-center justify-center">
            <img
              src={product.images[selectedImage]}
              alt={product.name}
              className="w-full h-full object-contain p-4"
            />
            <button 
              onClick={() => setIsFavorite(!isFavorite)}
              className={`absolute top-4 right-4 p-2 rounded-full shadow-lg ${
                isFavorite 
                  ? 'text-red-500 bg-white' 
                  : 'text-gray-400 bg-white hover:text-red-500'
              }`}
            >
              <FaHeart className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          {/* Title and Category */}
          <div>
            <span className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium mb-2">
              {product.category || "Premium Product"}
            </span>
            <h1 className="text-3xl font-bold text-gray-900 capitalize">{product.name}</h1>
          </div>
          
          {/* Price and Rating */}
          <div className="flex flex-wrap items-center gap-4">
            <div className="text-2xl font-bold text-[#273F4F]">
              ₹{product.discount_price || product.price}
              {product.price && product.discount_price && (
                <span className="ml-2 text-gray-400 text-lg line-through">
                  ₹{product.price}
                </span>
              )}
            </div>
            <div className="flex items-center">
              {renderStars(product.rating || 4.5)}
              <span className="ml-1 text-gray-600">({product.reviewCount || "100"})</span>
            </div>
          </div>

          {/* Description */}
          <div className="prose text-gray-600 border-t border-b border-gray-200 py-4">
            <p>{product.description || "Premium jackfruit product with natural goodness."}</p>
          </div>

          {/* Highlights */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="flex items-center gap-2 bg-green-50 p-3 rounded-lg">
              <FaLeaf className="text-green-600 flex-shrink-0" />
              <span className="text-sm">Organic</span>
            </div>
            <div className="flex items-center gap-2 bg-green-50 p-3 rounded-lg">
              <FaRecycle className="text-green-600 flex-shrink-0" />
              <span className="text-sm">Eco-Friendly</span>
            </div>
            <div className="flex items-center gap-2 bg-green-50 p-3 rounded-lg">
              <FaTruck className="text-green-600 flex-shrink-0" />
              <span className="text-sm">Free Shipping</span>
            </div>
            <div className="flex items-center gap-2 bg-green-50 p-3 rounded-lg">
              <RiSecurePaymentLine className="text-green-600 flex-shrink-0" />
              <span className="text-sm">Secure Payment</span>
            </div>
          </div>

          {/* Quantity Selector */}
          <div className="pt-2">
            <label className="block text-lg font-medium text-gray-700 mb-3">Quantity</label>
            <div className="flex items-center gap-4">
              <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden w-fit">
                <button
                  onClick={() => setSelectedQuantity(Math.max(1, selectedQuantity - 1))}
                  className="px-4 py-3 text-gray-600 hover:bg-gray-50 active:bg-gray-100 transition-colors"
                  aria-label="Decrease quantity"
                >
                  <span className="text-xl font-light">−</span>
                </button>
                <input
                  type="number"
                  value={selectedQuantity}
                  min="1"
                  onChange={(e) => {
                    const value = Math.max(1, parseInt(e.target.value) || 1);
                    setSelectedQuantity(value);
                  }}
                  className="w-16 px-0 py-3 text-center border-0 text-gray-900 text-lg font-medium focus:ring-0 bg-transparent"
                />
                <button
                  onClick={() => setSelectedQuantity(selectedQuantity + 1)}
                  className="px-4 py-3 text-gray-600 hover:bg-gray-50 active:bg-gray-100 transition-colors"
                  aria-label="Increase quantity"
                >
                  <span className="text-xl font-light">+</span>
                </button>
              </div>
              
              <div className="text-lg font-medium">
                Total: <span className="text-[#273F4F]">₹{((product.discount_price || product.price) * selectedQuantity).toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button
              onClick={handleAddToCart}
              className={`flex items-center justify-center gap-3 flex-1 py-3.5 px-6 rounded-lg transition-colors font-medium ${
                isInCart
                  ? 'bg-green-600 text-white hover:bg-green-700'
                  : 'bg-[#273F4F] text-white hover:bg-[#1a2d3a]'
              }`}
            >
              <FaShoppingCart className="w-5 h-5" />
              <span>{isInCart ? 'Update Cart' : 'Add to Cart'}</span>
            </button>
            <button
              onClick={handleBuyNow}
              className="flex-1 bg-green-600 text-white py-3.5 px-6 rounded-lg hover:bg-green-700 transition-colors font-medium"
            >
              Buy Now
            </button>
          </div>

          {isInCart && (
            <button
              onClick={handleRemoveFromCart}
              className="text-sm text-red-600 hover:text-red-800 w-full text-center"
            >
              Remove from cart
            </button>
          )}

          {/* Product Specifications */}
          <div className="pt-6 border-t border-gray-200">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Product Details</h2>
            <div className="space-y-3">
              {product.specs && product.specs.length > 0 ? (
                product.specs.map((spec, index) => (
                  <div key={index} className="flex border-b border-gray-100 pb-3">
                    <dt className="w-1/3 font-medium text-gray-700">{spec.name}</dt>
                    <dd className="w-2/3 text-gray-600">{spec.value}</dd>
                  </div>
                ))
              ) : (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-600">No specifications available for this product</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;