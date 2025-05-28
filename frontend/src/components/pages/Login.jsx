import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from 'axios';
import { Link,useNavigate } from 'react-router-dom'; // Assuming you're using React Router
import { useAuth } from "../../context/AuthContext";

const Login = () => {
    const navigate=useNavigate()
    const { login } = useAuth();
    const [formData, setFormData] = useState({
      email: "adi@gmail.com",
      password: "11111111",
    });
  

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    const newErrors = { ...errors };

    if (name === "email" && !validateEmail(value)) {
      newErrors.email = "Invalid email format";
    } else {
      delete newErrors.email;
    }

    setErrors(newErrors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await login(formData);
          
      if(response.request.status === 200){ 
        console.log('Login response Authcontext:', response);
        navigate('/')
      }
    } catch (error) {
      // console.log(error.response?.data?.error || "Login failed");
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center  p-4">
      <div className="max-w-md w-full space-y-8 bg-gradient-to-r from-blue-300 to-purple-500 p-8 rounded-xl shadow-lg transform transition-all hover:scale-105">
        <div>
          <h2 className="text-center text-3xl font-extrabold text-gray-900 mb-2">
            Login
          </h2>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
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
                className={`mt-1 block w-full px-3 py-2 bg-white border rounded-md shadow-sm focus:outline-none focus:ring-2 transition-colors ${
                  errors.email
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-black focus:border-indigo-500"
                }`}
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
                  className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-indigo-500 transition-colors"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  aria-label="Password"
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
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
            >
              Login
            </button>
          </div>

          <div className="text-center mt-4">
            <p className="text-sm text-gray-600">
              Do not have an account?{" "}
              <Link
                to="/register"
                className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors"
              >
                Register
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
