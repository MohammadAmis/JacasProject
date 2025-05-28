import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../../context/AuthContext"; 

const Register = () => {
  const navigate=useNavigate()
  const { register } = useAuth(); // Assuming you have a register function in your AuthContext

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
 

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Real-time validation
    const newErrors = { ...errors };

    switch (name) {
      case "email":
        if (!validateEmail(value)) {
          newErrors.email = "Invalid email format";
        } else {
          delete newErrors.email;
        }
        break;
      case "password":
        if (value.length < 8) {
          newErrors.password = "Password must be at least 8 characters";
        } else {
          delete newErrors.password;
        }
        if (formData.confirmPassword && value !== formData.confirmPassword) {
          newErrors.confirmPassword = "Passwords do not match";
        } else if (formData.confirmPassword) {
          delete newErrors.confirmPassword;
        }
        break;
      case "confirmPassword":
        if (value !== formData.password) {
          newErrors.confirmPassword = "Passwords do not match";
        } else {
          delete newErrors.confirmPassword;
        }
        break;
      default:
        break;
    }

    setErrors(newErrors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await register(formData);
          
      if(response.request.status === 200){ 
        console.log('Registration response :', response);
        navigate('/')
      }
  
    } catch (error) {
      console.log(error.response?.data?.error || "Registration failed");
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8 bg-gradient-to-r from-blue-300 to-purple-500 p-8 rounded-xl shadow-lg transform transition-all hover:scale-105">
        <div>
          <h2 className="text-center text-3xl font-extrabold text-gray-900 mb-2">
            Registration
          </h2>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-indigo-500 transition-colors"
                value={formData.username}
                onChange={handleChange}
                aria-label="Username"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className={`mt-1 block w-full px-3 py-2  bg-white border rounded-md shadow-sm focus:outline-none focus:ring-2 transition-colors ${errors.email ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-black focus:border-indigo-500"}`}
                value={formData.email}
                onChange={handleChange}
                aria-label="Email address"
                aria-invalid={errors.email ? "true" : "false"}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600" role="alert">
                  {errors.email}
                </p>
              )}
            </div>

            <div className="relative">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="mt-1 relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  className={`block w-full px-3 py-2  bg-white border rounded-md shadow-sm focus:outline-none focus:ring-2 transition-colors ${errors.password ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-black focus:border-indigo-500"}`}
                  value={formData.password}
                  onChange={handleChange}
                  aria-label="Password"
                  aria-invalid={errors.password ? "true" : "false"}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <FaEyeSlash className="h-5 w-5 text-gray-400" />
                  ) : (
                    <FaEye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600" role="alert">
                  {errors.password}
                </p>
              )}
            </div>

            <div className="relative">
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm Password
              </label>
              <div className="mt-1 relative">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  required
                  className={`block w-full px-3 py-2  bg-white border rounded-md shadow-sm focus:outline-none focus:ring-2 transition-colors ${errors.confirmPassword ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-black focus:border-indigo-500"}`}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  aria-label="Confirm password"
                  aria-invalid={errors.confirmPassword ? "true" : "false"}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                >
                  {showConfirmPassword ? (
                    <FaEyeSlash className="h-5 w-5 text-gray-400" />
                  ) : (
                    <FaEye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-600" role="alert">
                  {errors.confirmPassword}
                </p>
              )}
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={Object.keys(errors).length > 0}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >Register</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;