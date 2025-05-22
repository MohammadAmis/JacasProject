import { useState ,useEffect} from "react";
import { FiUpload, FiX } from "react-icons/fi";
import { BiError } from "react-icons/bi";
import { IoMdLock } from "react-icons/io";
import axios from 'axios'

const ProductUploadForm = ({modelInfo}) => {
  const [previewImage,setPreviewImage]= useState("https://via.placeholder.com/150")
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

  // Dynamically update formData with modelInfo.data
  useEffect(() => {
    if (modelInfo?.data) {
      const updatedFormData = { ...formData, ...modelInfo.data };
      setFormData(updatedFormData);

      // If an image URL is part of the data, update the preview
      if (modelInfo.data.image) {
        setPreviewImage(modelInfo.data.image);
      }
    }
  }, [modelInfo]);

  const [errors, setErrors] = useState({});

  const categories = [
    'Raw','Soft','Prepared','Others'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    validateField(name, value);
  };

  const removeImage = () => {
    setFormData((prev) => ({
      ...prev,
      image: ""
    }));
    setPreviewImage("https://via.placeholder.com/150")
    
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
          alert("Please Upload One Image")
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
      setFormData((prev) => ({ ...prev, image: file }));
      setPreviewImage(URL.createObjectURL(file)); // Directly preview the file
    }
  };

  const handleSubmit =  (e) => {
    e.preventDefault();
    
    // try {
      if(modelInfo?.operation){
        uploadProduct()
      }else{
        updateProduct()
      }
    // } catch (error) {
    //   console.log(error)
    // }finally{
    //   setIsProcessing(false)
    // }
  }

  const updateProduct = async () => {
    setIsProcessing(true)
    if (!formData._id) {
      alert("Product ID is missing, unable to update.");
      return;
    }

    try {
      const response = await axios.put(`/api/admin/update-product/${formData._id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert("Product updated successfully!");
    } catch (error) {
      console.error(error);
      alert("Error updating product.");
    }finally{
      setIsProcessing(false)
    }
  };

  const uploadProduct=async()=>{
    setIsProcessing(true)
    try {
      const response = await axios.post('/api/admin/upload-product', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert("Product uploaded successfully!");
      
    } catch (error) {
      console.error(error);
      alert("Error uploading product.");
    }
    finally{
      setIsProcessing(false)
    }
    
  }


  return (
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow-xl rounded-lg p-6 md:p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          {modelInfo.operation ?"Upload":"Update"} Product
        </h2>


          <form onSubmit={handleSubmit} className="space-y-3">
            {/* Image Upload Section */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Product Images
              </label>
              <div className=" flex  justify-stretch border-2 border-gray-300 border-dashed rounded-md hover:border-indigo-500 transition-colors duration-200">
              <div className="m-1 flex flex-1 justify-center p-4 border-2 border-gray-300 border-dashed rounded hover:border-indigo-500 transition-colors duration-200">
                <div className="space-y-1 text-center">
                  <FiUpload className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="flex text-sm text-gray-600">
                    <label htmlFor="images" className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
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
          
              {/* Image Previews */}
              <div className="flex   m-1 p-4 border-2 border-gray-300 border-dashed rounded hover:border-indigo-500 transition-colors duration-200 ">
                
                  <div className="relative">
                    <img
                      src={previewImage}
                      className="h-24 w-24 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage()}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors duration-200"
                    >
                      <FiX className="h-4 w-4" />
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
                className={`mt-1 block w-full  bg-white border-2  rounded-md shadow-sm ${errors.name ? "border-red-500" : "border-gray-300"} focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2.5`}
              />
              {errors.name && (
                <p className="text-red-500 text-sm flex items-center mt-1">
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
                className={`mt-1 block w-full bg-white border-2  rounded-md shadow-sm ${errors.description ? "border-red-500" : "border-gray-300"} focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2.5`}
              />
              {errors.description && (
                <p className="text-red-500 text-sm flex items-center mt-1">
                  <BiError className="mr-1" /> {errors.description}
                </p>
              )}
            </div>

            {/*  Price, Purchasing Price, and Discount Price */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                  Maximum Price
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">$</span>
                  </div>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    min="0"
                    step="1"
                    value={formData.price}
                    onChange={handleInputChange}
                    className={`block w-full pl-7 bg-white border-2 rounded-md shadow-sm  focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2.5`}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="purchasing_price" className="block text-sm font-medium text-gray-700">
                  Purchase Price
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">$</span>
                  </div>
                  <input
                    type="number"
                    id="purchasing_price"
                    name="purchasing_price"
                    min="0"
                    step="1"
                    value={formData.purchasing_price}
                    onChange={handleInputChange}
                    className={`block w-full pl-7 bg-white border-2 rounded-md shadow-sm  focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2.5`}
                  />
                </div>
                
              </div>

              <div>
                <label htmlFor="discount_price" className="block text-sm font-medium text-gray-700">
                  Discounted Price
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">$</span>
                  </div>
                  <input
                    type="number"
                    id="discount_price"
                    name="discount_price"
                    min="0"
                    step="1"
                    value={formData.discount_price}
                    onChange={handleInputChange}
                    className={`block w-full pl-7 bg-white border-2 rounded-md shadow-sm  focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2.5`}
                  />
                </div>
                
              </div>
            </div>
            {/* { category and stock} */}
            <div className="grid grid-cols-1 tablet:grid-cols-2 gap-6">
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className={`mt-1 block w-full bg-white border-2 rounded-md shadow-sm ${errors.category ? "border-red-500" : "border-gray-300"} focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2.5`}
                >
                  <option value="">Select a category</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                {errors.category && (
                  <p className="text-red-500 text-sm flex items-center mt-1">
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
                  className={`mt-1 block w-full bg-white border-2 rounded-md shadow-sm  focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2.5`}
                />
                
              </div>
            </div>

            {/* Submit Button */}
            {/* <div className="pt-4">
              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
              >
                {modelInfo.operation ?"Upload":"Update"}
              </button>
            </div> */}

            <div className="mt-4">
            <button
            type="submit"
            disabled={isProcessing}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
            >
            {isProcessing ? (
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                  <span>Processing...</span>
                </div>
            ) : (
                <div className="flex items-center space-x-2">
                  <IoMdLock className="w-5 h-5" />
                  <span>{modelInfo.operation ?"Upload":"Update"}</span>
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
