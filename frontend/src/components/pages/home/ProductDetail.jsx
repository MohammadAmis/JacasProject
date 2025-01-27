import { useState } from 'react';
import { useLocation } from 'react-router-dom';

const ProductDetail = () => {
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const { state } = useLocation();
  const product = state?.product_details;

  // Add error handling if product not found
  if (!product) {
    return <div>Product not found</div>;
  }

  const handleAddToCart = () => {
    // Add to cart logic here
    alert(`Added ${selectedQuantity} ${product.name} to cart`);
  };

  const handleBuyNow = () => {
    // Buy now logic here
    alert(`Buying ${selectedQuantity} ${product.name}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
      <div className="flex flex-col">
        {/* Main Image */}
        <div className="w-full h-96 overflow-hidden">
          <img
            src={product.images[selectedImage]}
            alt={product.name}
            className="w-full h-full object-cover rounded-xl"
          />
        </div>

        {/* Thumbnails */}
        <div className="flex flex-row gap-2 mt-2 justify-center overflow-x-auto sm:overflow-visible">
          {product.images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden border-2 transition-all ${
                selectedImage === index 
                  ? 'border-indigo-500 scale-105' 
                  : 'border-gray-200 hover:border-indigo-200'
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
      </div>

        {/* Product Details */}
        <div className="space-y-6 bg-gray-100 p-4 rounded-lg">
          <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
          
          <div className="text-2xl font-semibold text-indigo-600">
            ${product.price}
          </div>

          <div className="prose text-gray-600">
            <p>{product.description}</p>
          </div>

          {/* Quantity Selector */}
          <div className="flex flex-row items-center space-y-2 gap-4">
            <label className="text-lg font-medium text-gray-700">Quantity</label>
            <div className="flex items-center border border-gray-300 rounded-lg w-fit">
              <button
                onClick={() => setSelectedQuantity(Math.max(1, selectedQuantity - 1))}
                className="px-3 py-2.5 text-gray-600 hover:bg-gray-50 active:bg-gray-100 transition-colors border-r border-gray-300"
                aria-label="Decrease quantity"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                </svg>
              </button>
              <input
                type="number"
                value={selectedQuantity}
                min="1"
                onChange={(e) => {
                  const value = Math.max(1, parseInt(e.target.value) || 1);
                  setSelectedQuantity(value);
                }}
                className="w-16 px-4 py-2 text-center border-0 text-gray-900 focus:ring-0 bg-transparent"
              />
              <button
                onClick={() => setSelectedQuantity(selectedQuantity + 1)}
                className="px-3 py-2.5 text-gray-600 hover:bg-gray-50 active:bg-gray-100 transition-colors border-l border-gray-300"
                aria-label="Increase quantity"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </button>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex space-x-4">
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-indigo-600 text-white py-3 px-6 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Add to Cart
            </button>
            <button
              onClick={handleBuyNow}
              className="flex-1 bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors"
            >
              Buy Now
            </button>
          </div>

          {/* Product Specifications */}
          <div className="pt-6 border-t-2 border-gray-500">
            <h2 className="text-2xl font-semibold mb-4 text-black">Specifications</h2>
            <dl className="grid grid-cols-2 gap-4">
              {product.specs.map((spec, index) => (
                <div key={index} className="bg-gray-500 p-3 rounded-lg">
                  <dt className="text-sm font-medium text-black">{spec.name}</dt>
                  <dd className="mt-1 text-black">{spec.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;