import { useState } from "react";
import { Link } from "react-router-dom";
import { FiMinus, FiPlus, FiX, FiShoppingBag } from "react-icons/fi";
import { useCart } from '../../../context/CartContext'
import CheckoutPage from "./CheckOut";

const Cart = () => {
  const { 
    cartItems, 
    removeFromCart, 
    updateQuantity, 
    clearCart, 
    cartTotal 
  } = useCart();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [discountCode, setDiscountCode] = useState("");
  const [discount, setDiscount] = useState(0);
  
  // Constants for calculations
  const shippingCost = cartItems.length > 0 ? 15.99 : 0;
  const taxRate = 0.08;
  const subtotal = cartTotal;
  const tax = subtotal * taxRate;
  const discountAmount = (subtotal * discount) / 100;
  const total = subtotal + tax + shippingCost - discountAmount;

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(id);
    } else {
      updateQuantity(id, newQuantity);
    }
  };

  const applyDiscount = () => {
    if (discountCode.toLowerCase() === "save20") {
      setDiscount(20);
    } else {
      setDiscount(0);
      alert("Invalid discount code");
    }
  };

  return (
    <div className="min-h-[calc(100vh-5rem)] bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items Section */}
          <div className="lg:w-2/3">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Your Shopping Cart</h1>
              <Link 
                to="/products" 
                className="flex items-center gap-2 text-[#273F4F] hover:text-[#1a2d3a]"
              >
                <FiShoppingBag className="w-5 h-5" />
                <span className="hidden sm:inline">Continue Shopping</span>
              </Link>
            </div>

            {cartItems.length === 0 ? (
              <div className="bg-white p-8 rounded-xl shadow-sm text-center">
                <p className="text-gray-600 text-lg mb-4">Your cart is empty</p>
                <Link 
                  to="/products" 
                  className="inline-flex items-center gap-2 bg-[#273F4F] text-white px-6 py-3 rounded-lg hover:bg-[#1a2d3a] transition-colors"
                >
                  <FiShoppingBag className="w-5 h-5" />
                  <span>Browse Products</span>
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={item._id}
                    className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow flex gap-4"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-24 h-24 object-cover rounded-lg"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://images.unsplash.com/photo-1560393464-5c69a73c5770";
                      }}
                    />
                    <div className="flex-1 flex flex-col">
                      <div className="flex justify-between">
                        <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
                        <button
                          onClick={() => removeFromCart(item._id)}
                          className="text-gray-400 hover:text-red-500"
                          aria-label="Remove item"
                        >
                          <FiX className="w-5 h-5" />
                        </button>
                      </div>
                      <p className="text-gray-600">₹{item.price.toFixed(2)}</p>
                      
                      <div className="mt-auto flex items-center justify-between">
                        <div className="flex items-center gap-3 bg-gray-100 rounded-full px-4 py-1">
                          <button
                            onClick={() => handleQuantityChange(item._id, item.quantity - 1)}
                            className="text-gray-600 hover:text-[#273F4F]"
                            aria-label="Decrease quantity"
                          >
                            <FiMinus className="w-4 h-4" />
                          </button>
                          <span className="font-medium">{item.quantity}</span>
                          <button
                            onClick={() => handleQuantityChange(item._id, item.quantity + 1)}
                            className="text-gray-600 hover:text-[#273F4F]"
                            aria-label="Increase quantity"
                          >
                            <FiPlus className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="text-lg font-medium text-gray-900">
                          ₹{(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:w-1/3">
            <div className="bg-white p-6 rounded-xl shadow-sm sticky top-4">
              <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal ({cartItems.length} items)</span>
                  <span className="font-medium">₹{subtotal.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">₹{shippingCost.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-medium">₹{tax.toFixed(2)}</span>
                </div>
                
                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount ({discount}%)</span>
                    <span>-₹{discountAmount.toFixed(2)}</span>
                  </div>
                )}

                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between">
                    <span className="text-lg font-semibold">Total</span>
                    <span className="text-lg font-semibold">
                      ₹{total.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={discountCode}
                    onChange={(e) => setDiscountCode(e.target.value)}
                    placeholder="Discount code"
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#273F4F]"
                  />
                  <button
                    onClick={applyDiscount}
                    className="px-4 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors whitespace-nowrap"
                  >
                    Apply
                  </button>
                </div>

                <button
                  onClick={openModal}
                  disabled={cartItems.length === 0}
                  className={`w-full py-3 px-6 rounded-lg font-medium transition-colors ${
                    cartItems.length > 0
                      ? 'bg-[#273F4F] text-white hover:bg-[#1a2d3a]'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  Proceed to Checkout
                </button>

                {cartItems.length > 0 && (
                  <button
                    onClick={clearCart}
                    className="w-full py-2 text-red-600 hover:text-red-800 transition-colors text-sm"
                  >
                    Clear Cart
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Checkout Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            
            <div className="p-6">
              <CheckoutPage total={total} closeModal={closeModal} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;