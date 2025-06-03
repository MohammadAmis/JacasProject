import { useState } from "react";
import { FaCreditCard, FaGooglePay } from "react-icons/fa";
import { AiFillBank } from 'react-icons/ai';
import { IoMdLock } from "react-icons/io";
import { FiArrowLeft } from "react-icons/fi";

const CheckoutPage = ({ total, closeModal }) => {
  const [shippingDetails, setShippingDetails] = useState({
    fullName: "",
    address: "",
    city: "",
    postalCode: "",
    country: "India"
  });

  const [selectedPayment, setSelectedPayment] = useState("credit-card");
  const [isProcessing, setIsProcessing] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingDetails(prev => ({
      ...prev,
      [name]: value
    }));
    validateField(name, value);
  };

  const validateField = (name, value) => {
    let newErrors = { ...errors };

    switch (name) {
      case "fullName":
        newErrors.fullName = value.trim() ? "" : "Full name is required";
        break;
      case "postalCode":
        newErrors.postalCode = /^\d{6}$/.test(value) ? "" : "Enter 6-digit PIN code";
        break;
      default:
        newErrors[name] = value.trim() ? "" : `${name.charAt(0).toUpperCase() + name.slice(1)} is required`;
    }

    setErrors(newErrors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate all fields
    Object.keys(shippingDetails).forEach(field => {
      validateField(field, shippingDetails[field]);
    });

    if (Object.values(errors).some(error => error)) return;

    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      alert(`Order placed successfully for ₹${total.toFixed(2)}!`);
      closeModal();
    }, 2000);
  };

  return (
    <div className="bg-white rounded-xl max-w-2xl mx-auto">
      <div className="p-6 md:p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Checkout</h1>
          <button 
            onClick={closeModal}
            className="text-gray-500 hover:text-gray-700"
          >
            <FiArrowLeft className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Shipping Details */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-6 pb-2 border-b border-gray-200">
              Shipping Information
            </h2>
            
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={shippingDetails.fullName}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 rounded-lg border ${errors.fullName ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-[#273F4F] focus:border-transparent`}
                  aria-invalid={!!errors.fullName}
                  aria-describedby={errors.fullName ? "fullName-error" : undefined}
                />
                {errors.fullName && (
                  <p id="fullName-error" className="text-red-500 text-xs mt-1">{errors.fullName}</p>
                )}
              </div>

              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                  Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={shippingDetails.address}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 rounded-lg border ${errors.address ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-[#273F4F] focus:border-transparent`}
                />
                {errors.address && (
                  <p className="text-red-500 text-xs mt-1">{errors.address}</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                    City <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={shippingDetails.city}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-lg border ${errors.city ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-[#273F4F] focus:border-transparent`}
                  />
                  {errors.city && (
                    <p className="text-red-500 text-xs mt-1">{errors.city}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700 mb-1">
                    PIN Code <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="postalCode"
                    name="postalCode"
                    value={shippingDetails.postalCode}
                    onChange={handleInputChange}
                    maxLength="6"
                    className={`w-full px-4 py-3 rounded-lg border ${errors.postalCode ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-[#273F4F] focus:border-transparent`}
                  />
                  {errors.postalCode && (
                    <p className="text-red-500 text-xs mt-1">{errors.postalCode}</p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                  Country <span className="text-red-500">*</span>
                </label>
                <select
                  id="country"
                  name="country"
                  value={shippingDetails.country}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#273F4F] focus:border-transparent"
                >
                  <option value="India">India</option>
                </select>
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-6 pb-2 border-b border-gray-200">
              Payment Method
            </h2>
            
            <div className="grid grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => setSelectedPayment("credit-card")}
                className={`p-3 rounded-lg border flex flex-col items-center ${
                  selectedPayment === "credit-card"
                    ? "border-[#273F4F] bg-[#273F4F]/10"
                    : "border-gray-300 hover:border-gray-400"
                }`}
              >
                <FaCreditCard className="w-6 h-6 mb-1 text-[#273F4F]" />
                <span className="text-sm">Credit Card</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedPayment("upi")}
                className={`p-3 rounded-lg border flex flex-col items-center ${
                  selectedPayment === "upi"
                    ? "border-[#273F4F] bg-[#273F4F]/10"
                    : "border-gray-300 hover:border-gray-400"
                }`}
              >
                <FaGooglePay className="w-6 h-6 mb-1 text-[#273F4F]" />
                <span className="text-sm">UPI</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedPayment("internet-banking")}
                className={`p-3 rounded-lg border flex flex-col items-center ${
                  selectedPayment === "internet-banking"
                    ? "border-[#273F4F] bg-[#273F4F]/10"
                    : "border-gray-300 hover:border-gray-400"
                }`}
              >
                <AiFillBank className="w-6 h-6 mb-1 text-[#273F4F]" />
                <span className="text-sm">Net Banking</span>
              </button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-gray-200">
              Order Summary
            </h2>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Subtotal:</span>
                <span className="font-medium">₹{total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Shipping:</span>
                <span className="font-medium">₹0.00</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Tax:</span>
                <span className="font-medium">₹{(total * 0.18).toFixed(2)}</span>
              </div>
              <div className="flex justify-between pt-3 border-t border-gray-200 mt-3">
                <span className="text-lg font-semibold">Total:</span>
                <span className="text-lg font-semibold">₹{(total * 1.18).toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isProcessing || Object.values(errors).some(error => error)}
            className={`w-full py-3 px-6 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 ${
              isProcessing || Object.values(errors).some(error => error)
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-[#273F4F] text-white hover:bg-[#1a2d3a]'
            }`}
          >
            {isProcessing ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </>
            ) : (
              <>
                <IoMdLock className="w-5 h-5" />
                Pay ₹{(total * 1.18).toFixed(2)}
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;