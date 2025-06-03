import { useState, useEffect } from "react";
import { FiUpload, FiX } from "react-icons/fi";
import { BiError } from "react-icons/bi";
import { IoMdLock } from "react-icons/io";
import axios from 'axios';

const ProductUploadForm = ({ modelInfo,closeModal }) => {
  const [previewImage, setPreviewImage] = useState("https://via.placeholder.com/150");
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    price: "0",
    purchasing_price: "0",
    discount_price: "0",
    stock: "0",
    image: "",
  });

  const [errors, setErrors] = useState({});
  const categories = ['Raw', 'Soft', 'Prepared', 'Others'];

  useEffect(() => {
    if (modelInfo?.data) {
      const updatedFormData = { ...formData, ...modelInfo.data };
      setFormData(updatedFormData);

      if (modelInfo.data.image) {
        setPreviewImage(modelInfo.data.image);
      }
    }
  }, [modelInfo]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    validateField(name, value);
  };

  const removeImage = () => {
    setFormData(prev => ({ ...prev, image: "" }));
    setPreviewImage("https://via.placeholder.com/150");
  };

  const validateField = (name, value) => {
    let newErrors = { ...errors };

    switch (name) {
      case "name":
        if (!value.trim()) {
          newErrors.name = "Product name is required";
        } else {
          delete newErrors.name;
        }
        break;

      case "category":
        if (!value) {
          newErrors.category = "Please select a category";
        } else {
          delete newErrors.category;
        }
        break;

      case "description":
        if (!value.trim()) {
          newErrors.description = "Product description is required";
        } else {
          delete newErrors.description;
        }
        break;

      case "image":
        if (!value) {
          alert("Please Upload One Image");
        }
        break;

      default:
        break;
    }

    setErrors(newErrors);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, image: file }));
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (modelInfo?.operation) {
      uploadProduct();
    } else {
      updateProduct();
    }
  };

  const updateProduct = async () => {
    setIsProcessing(true);
    if (!formData._id) {
      alert("Product ID is missing, unable to update.");
      return;
    }

    try {
      
      const response = await axios.put(`https://global-venture.onrender.com/api/admin/update-product/${formData._id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      // const response = await axios.put(`/api/admin/update-product/${formData._id}`, formData, {
      //   headers: { 'Content-Type': 'multipart/form-data' },
      // });
      alert("Product updated successfully!");
    } catch (error) {
      console.error(error);
      alert("Error updating product.");
    } finally {
      setIsProcessing(false);
    }
  };

  const uploadProduct = async () => {
    setIsProcessing(true);
    try {
      const response = await axios.post('/api/admin/upload-product', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert("Product uploaded successfully!");
    } catch (error) {
      console.error(error);
      alert("Error uploading product.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="absolute top-36  max-w-4xl mx-auto ">
       <button
          onClick={closeModal}
          className="absolute top-2 right-3  text-gray-400 hover:text-gray-600"
        >
          <FiX size={24} />
        </button>
      
      <div className=" bg-white shadow-xl rounded-lg p-4 sm:p-6 md:p-8 overflow-y-auto hide-scrollbar max-h-[80vh]">
        
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 text-center">
          {modelInfo.operation ? "Upload" : "Update"} Product
        </h2>

        <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
          {/* Image Upload Section */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Product Images
            </label>
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="flex-1 flex justify-center p-4 border-2 border-gray-300 border-dashed rounded-md hover:border-indigo-500 transition-colors">
                <div className="space-y-1 text-center">
                  <FiUpload className="mx-auto h-8 w-8 sm:h-12 sm:w-12 text-gray-400" />
                  <div className="flex text-sm text-gray-600">
                    <label htmlFor="images" className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500">
                      <span>Upload images</span>
                      <input
                        id="images"
                        name="images"
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="sr-only"
                      />
                    </label>
                  </div>
                  <p className="text-xs text-gray-500">PNG, JPG, GIF up to 5MB</p>
                </div>
              </div>
              
              {/* Image Preview */}
              <div className="flex-1 flex justify-center items-center p-4 border-2 border-gray-300 border-dashed rounded-md">
                <div className="relative">
                  <img
                    src={previewImage}
                    className="h-20 w-20 sm:h-24 sm:w-24 object-cover rounded-lg"
                    alt="Product preview"
                  />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                  >
                    <FiX className="h-3 w-3 sm:h-4 sm:w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Name Field */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Product Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className={`mt-1 block w-full bg-white border-2 rounded-md shadow-sm p-2 sm:p-2.5 text-sm ${
                errors.name ? "border-red-500" : "border-gray-300"
              } focus:border-indigo-500 focus:ring-indigo-500`}
            />
            {errors.name && (
              <p className="text-red-500 text-xs sm:text-sm flex items-center mt-1">
                <BiError className="mr-1" /> {errors.name}
              </p>
            )}
          </div>

          {/* Description Field */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows="2"
              value={formData.description}
              onChange={handleInputChange}
              className={`mt-1 block w-full bg-white border-2 rounded-md shadow-sm p-2 sm:p-2.5 text-sm ${
                errors.description ? "border-red-500" : "border-gray-300"
              } focus:border-indigo-500 focus:ring-indigo-500`}
            />
            {errors.description && (
              <p className="text-red-500 text-xs sm:text-sm flex items-center mt-1">
                <BiError className="mr-1" /> {errors.description}
              </p>
            )}
          </div>

          {/* Price Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                Maximum Price
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 text-sm">$</span>
                </div>
                <input
                  type="number"
                  id="price"
                  name="price"
                  min="0"
                  step="1"
                  value={formData.price}
                  onChange={handleInputChange}
                  className="block w-full pl-7 bg-white border-2 border-gray-300 rounded-md shadow-sm p-2 sm:p-2.5 text-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div>
              <label htmlFor="purchasing_price" className="block text-sm font-medium text-gray-700">
                Purchase Price
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 text-sm">$</span>
                </div>
                <input
                  type="number"
                  id="purchasing_price"
                  name="purchasing_price"
                  min="0"
                  step="1"
                  value={formData.purchasing_price}
                  onChange={handleInputChange}
                  className="block w-full pl-7 bg-white border-2 border-gray-300 rounded-md shadow-sm p-2 sm:p-2.5 text-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div>
              <label htmlFor="discount_price" className="block text-sm font-medium text-gray-700">
                Discounted Price
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 text-sm">$</span>
                </div>
                <input
                  type="number"
                  id="discount_price"
                  name="discount_price"
                  min="0"
                  step="1"
                  value={formData.discount_price}
                  onChange={handleInputChange}
                  className="block w-full pl-7 bg-white border-2 border-gray-300 rounded-md shadow-sm p-2 sm:p-2.5 text-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
            </div>
          </div>

          {/* Category and Stock */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                Category
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className={`mt-1 block w-full bg-white border-2 rounded-md shadow-sm p-2 sm:p-2.5 text-sm ${
                  errors.category ? "border-red-500" : "border-gray-300"
                } focus:border-indigo-500 focus:ring-indigo-500`}
              >
                <option value="">Select a category</option>
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              {errors.category && (
                <p className="text-red-500 text-xs sm:text-sm flex items-center mt-1">
                  <BiError className="mr-1" /> {errors.category}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="stock" className="block text-sm font-medium text-gray-700">
                Stock
              </label>
              <input
                type="number"
                id="stock"
                name="stock"
                min="0"
                value={formData.stock}
                onChange={handleInputChange}
                className="mt-1 block w-full bg-white border-2 border-gray-300 rounded-md shadow-sm p-2 sm:p-2.5 text-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-2 sm:pt-4">
            <button
              type="submit"
              disabled={isProcessing}
              className="w-full flex justify-center py-2 sm:py-3 px-4 border border-transparent rounded-md shadow-sm text-sm sm:text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
            >
              {isProcessing ? (
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-b-2 border-white" />
                  <span>Processing...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <IoMdLock className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>{modelInfo.operation ? "Upload" : "Update"}</span>
                </div>
              )}
            </button>
          </div>
        </form>
      </div>
      
    </div>
  );
};

export default ProductUploadForm;
