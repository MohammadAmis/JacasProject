import { useState } from "react";
import { Link } from "react-router-dom";
import { FiMinus, FiPlus, FiX,FiShoppingBag } from "react-icons/fi";
import CheckoutPage from "./CheckOut";

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Premium Wireless Headphones",
      price: 299.99,
      quantity: 1,
      image: "images.unsplash.com/photo-1505740420928-5e560c06d30e"
    },
    {
      id: 2,
      name: "Smart Fitness Watch",
      price: 199.99,
      quantity: 2,
      image: "images.unsplash.com/photo-1523275335684-37898b6baf30"
    },
    {
      id: 3,
      name: "Ultra HD Camera",
      price: 899.99,
      quantity: 1,
      image: "images.unsplash.com/photo-1526170375885-4d8ecf77b99f"
    },
    {
      id: 4,
      name: "Premium Wireless Headphones",
      price: 299.99,
      quantity: 1,
      image: "images.unsplash.com/photo-1505740420928-5e560c06d30e"
    },
    {
      id: 5,
      name: "Smart Fitness Watch",
      price: 199.99,
      quantity: 2,
      image: "images.unsplash.com/photo-1523275335684-37898b6baf30"
    },
    {
      id: 6,
      name: "Ultra HD Camera",
      price: 899.99,
      quantity: 1,
      image: "images.unsplash.com/photo-1526170375885-4d8ecf77b99f"
    }
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [discountCode, setDiscountCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const shippingCost = 15.99;
  const taxRate = 0.08;

  const openModal = () => {
    setIsModalOpen(true);
  }
  
  const closeModal = () => {
    setIsModalOpen(false);
  }

  const updateQuantity = (id, change) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(0, item.quantity + change) }
          : item
      ).filter(item => item.quantity > 0)
    );
  };

  const removeItem = (id) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const applyDiscount = () => {
    if (discountCode.toLowerCase() === "save20") {
      setDiscount(20);
    } else {
      setDiscount(0);
    }
  };

  const subtotal = calculateSubtotal();
  const tax = subtotal * taxRate;
  const discountAmount = (subtotal * discount) / 100;
  const total = subtotal + tax + shippingCost - discountAmount;

  return (
    <div className="h-[calc(100vh-5rem)] bg-[#94B4C1]  p-4 sm:px-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* <div className="flex items-center justify-between p-2 rounded-xl mb-4  sticky top-[70px] lg:z-40 bg-gray-100  lg:py-3 lg:-mt-3">
          <h1 className="text-3xl font-bold text-gray-900">Your Cart</h1>
          <Link to="/" className="text-indigo-600 hover:text-indigo-700 flex items-center">
            <FiShoppingBag className="w-5 h-5 mr-1 " />
            <span className="hidden md:block ">Continue Shopping</span>
          </Link>
        </div> */}

        <div className="lg:grid lg:grid-cols-12 lg:gap-8 ">
          {/* Cart Items */}
          <div className="lg:col-span-8 space-y-4 overflow-y-auto hide-scrollbar" style={{ maxHeight: "calc(100vh - 200px)" }}>
            {cartItems.length === 0 ? (
              <div className="bg-[#547792] p-8 rounded-xl shadow-sm text-center">
                <p className="text-black text-lg">Your cart is empty</p>
                <Link to="/" className=" bg-[#273F4F] justify-center flex items-center gap-2 text-white px-4 py-2 rounded-lg mt-4">
                  <FiShoppingBag className="w-5 h-5  " />
                    <span className="hidden md:block ">Add Some Products</span>
                </Link>
              </div>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-[#547792] p-4 rounded-xl shadow-sm transition-all hover:shadow-md"
                >
                  <div className="flex items-start gap-4">
                    <img
                      src={`https://${item.image}`}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://images.unsplash.com/photo-1560393464-5c69a73c5770";
                      }}
                    />
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-gray-400 hover:text-red-500"
                          aria-label="Remove item"
                        >
                          <FiX className="w-5 h-5 text-white" />
                        </button>
                      </div>
                      <p className="text-gray-500">${item.price.toFixed(2)}</p>
                      
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center gap-3 bg-[#273F4F]  rounded-full px-4 py-2">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="text-gray-600 hover:text-indigo-600"
                            aria-label="Decrease quantity"
                          >
                            <FiMinus className="w-4 h-4 text-white" />
                          </button>
                          <span className="text-white font-medium">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="text-gray-600 hover:text-indigo-600"
                            aria-label="Increase quantity"
                          >
                            <FiPlus className="w-4 h-4 text-white" />
                          </button>
                        </div>
                        <p className="text-lg font-medium text-gray-900">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-4 lg:sticky lg:top-20 h-fit lg:z-10 my-4 lg:my-0 ">
            <div className="bg-[#547792] p-6 rounded-xl shadow-sm text-black">
              <h2 className="text-xl font-semibold  mb-6">Order Summary</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span >Subtotal</span>
                  <span >${subtotal.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span >Shipping</span>
                  <span >${shippingCost.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span >Tax</span>
                  <span >${tax.toFixed(2)}</span>
                </div>
                
                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount ({discount}%)</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}

                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between">
                    <span className="text-lg font-semibold ">Total</span>
                    <span className="text-lg font-semibold ">
                      ${total.toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className="mt-6 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-2">
                    <input
                      type="text"
                      value={discountCode}
                      onChange={(e) => setDiscountCode(e.target.value)}
                      placeholder="Discount code"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#273F4F]"
                    />
                    <button
                      onClick={applyDiscount}
                      className="px-4 sm:px-6 py-3 bg-[#273F4F] text-white rounded-lg hover:opacity-90 transition-opacity text-sm sm:text-base whitespace-nowrap"
                    >
                      Apply
                    </button>
                  </div>

                  <button
                    onClick={openModal}
                    className="w-full py-3 px-6 bg-[#273F4F] text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
                  >
                    Checkout Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Checkout Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full relative overflow-hidden">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-2"
            >
              <FiX className="w-6 h-6" />
            </button>
            <div className="p-8">
              <CheckoutPage />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;