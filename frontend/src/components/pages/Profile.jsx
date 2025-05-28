import { useState } from 'react';
import { FaUser, FaBox, FaEdit, FaCog } from 'react-icons/fa';
import { FiSearch } from 'react-icons/fi';
import { MdOutlineLocalShipping, MdOutlinePending, MdOutlineDeliveryDining } from "react-icons/md";
import { useAuth } from '../../context/AuthContext';

const Profile = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("profile");
  const [searchOrder, setSearchOrder] = useState("");
  const [editMode, setEditMode] = useState(false);  
  const [security, setSecurity] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  const [userData, setUserData] = useState({
    name: user?.username,
    email: user?.email,
    phone: '+1 234 567 890',
    address: '123 Main St, New York, USA'
  });

  // Mock order history
  const dummyOrders = [
    {
      id: "ORD001",
      date: "2024-01-15",
      items: ["Premium Headphones", "Wireless Mouse"],
      status: "Delivered",
      total: "$299.99"
    },
    {
      id: "ORD002",
      date: "2024-01-10",
      items: ["Smart Watch", "Phone Case"],
      status: "Processing",
      total: "$459.99"
    },
    {
      id: "ORD003",
      date: "2024-01-05",
      items: ["Laptop Stand", "USB Hub"],
      status: "Shipped",
      total: "$89.99"
    },
    {
      id: "ORD003",
      date: "2024-01-05",
      items: ["Laptop Stand", "USB Hub"],
      status: "Shipped",
      total: "$89.99"
    }
  ];

  const getStatusIcon = (status) => {
      switch (status) {
        case "Delivered":
          return <MdOutlineDeliveryDining className="text-green-500" />;
        case "Shipped":
          return <MdOutlineLocalShipping className="text-blue-500" />;
        case "Processing":
          return <MdOutlinePending className="text-yellow-500" />;
        default:
          return null;
      }
    };
  
    const filteredOrders = dummyOrders.filter(order =>
      order.id.toLowerCase().includes(searchOrder.toLowerCase()) ||
      order.items.some(item => item.toLowerCase().includes(searchOrder.toLowerCase()))
    );

  

  const handleInputChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value
    });
  };

  const handleSecurityChange = (e) => {
    setSecurity({
      ...security,
      [e.target.name]: e.target.value
    });
  };

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    setEditMode(false);
    // Add API call here
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    // Add password change logic
  };

  return (
    <div className="h-[calc(100vh-5rem)] bg-[#94B4C1] p-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto lg:sticky  lg:top-24">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Profile Header */}
          <div className="bg-[#547792] text-white p-6">
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 rounded-full bg-indigo-400 flex items-center justify-center">
                <span className="text-2xl">JD</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold">{userData.name}</h1>
                <p className="text-indigo-200">{userData.email}</p>
              </div>
            </div>
          </div>

          <div className="lg:grid lg:grid-cols-12">
            {/* Navigation */}
            <div className="lg:col-span-3 border-r p-4 bg-gray-50">
              <nav className="flex flex-row space-x-2 overflow-x-auto lg:flex-col lg:space-x-0 lg:space-y-2 lg:overflow-visible justify-evenly">
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`w-auto sm:w-full flex  items-center justify-center lg:justify-start space-x-2 p-3 rounded-lg ${
                    activeTab === 'profile' ? 'bg-[#273F4F] text-white' : 'hover:bg-[#273F4F]'
                  }`}
                >
                  <FaUser className="w-5 h-5 flex-shrink-0 " />
                  <span className='hidden sm:block '>Profile</span>
                </button>
                <button
                  onClick={() => setActiveTab('orders')}
                  className={`w-auto sm:w-full flex items-center justify-center sm:justify-start space-x-2 p-3 rounded-lg ${
                    activeTab === 'orders' ? 'bg-[#273F4F] text-white' : 'hover:bg-[#273F4F]'
                  }`}
                >
                  <FaBox className="w-5 h-5 flex-shrink-0" />
                  <span className='hidden sm:block'>Order History</span>
                </button>
                <button
                  onClick={() => setActiveTab('security')}
                  className={`w-auto sm:w-full flex items-center justify-center sm:justify-start space-x-2 p-3 rounded-lg ${
                    activeTab === 'security' ? 'bg-[#273F4F] text-white' : 'hover:bg-[#273F4F]'
                  }`}
                >
                  <FaCog className="w-5 h-5 flex-shrink-0" />
                  <span className='hidden sm:block'>Setting</span>
                </button>
              </nav>
            </div>

            {/* Content Area */}
            <div className="lg:col-span-9 p-6">
              {activeTab === 'profile' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold">Profile Information</h2>
                    <button
                      onClick={() => setEditMode(!editMode)}
                      className="flex items-center space-x-2 text-indigo-600 hover:text-indigo-700 px-3 py-1.5 rounded-md"
                    >
                      <FaEdit className="w-4 h-4" />
                      <span>{editMode ? 'Cancel' : 'Edit'}</span>
                    </button>
                  </div>

                  <form onSubmit={handleProfileUpdate} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Name</label>
                        <input
                          name="name"
                          value={userData.name}
                          onChange={handleInputChange}
                          disabled={!editMode}
                          className="w-full px-4 py-2.5 rounded-md border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-100 transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                          name="email"
                          type="email"
                          value={userData.email}
                          onChange={handleInputChange}
                          disabled={!editMode}
                          className="w-full px-4 py-2.5 rounded-md border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-100 transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Phone</label>
                        <input
                          name="phone"
                          value={userData.phone}
                          onChange={handleInputChange}
                          disabled={!editMode}
                          className="w-full px-4 py-2.5 rounded-md border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-100 transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Address</label>
                        <input
                          name="address"
                          value={userData.address}
                          onChange={handleInputChange}
                          disabled={!editMode}
                          className="w-full px-4 py-2.5 rounded-md border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-100 transition-all"
                        />
                      </div>
                    </div>
                    {editMode && (
                      <button
                        type="submit"
                        className="w-full md:w-auto px-6 py-2.5 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors font-medium"
                      >
                        Save Changes
                      </button>
                    )}
                  </form>
                </div>
              )}

              {/* Orders Section */}
              {activeTab === "orders" && (
                <div className="animate-fadeIn">
                  <h2 className="text-2xl font-bold mb-6">Order History</h2>
                  <div className="mb-6 relative">
                    <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search orders..."
                      value={searchOrder}
                      onChange={(e) => setSearchOrder(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border-2 rounded-lg focus:ring-2 focus:ring-[#273F4F] "
                    />
                  </div>
                  <div className="space-y-4 overflow-auto max-h-72 hide-scrollbar">
                    {filteredOrders.map((order) => (
                      <div
                        key={order.id}
                        className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <h3 className="font-semibold text-lg">{order.id}</h3>
                            <p className="text-sm text-gray-600">{order.date}</p>
                            <div className="mt-2">
                              {order.items.map((item, index) => (
                                <span
                                  key={index}
                                  className="inline-block bg-gray-100 rounded-full px-3 py-1 text-sm mr-2 mb-2"
                                >
                                  {item}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center space-x-2 mb-2">
                              {getStatusIcon(order.status)}
                              <span className={`text-sm ${order.status === "Delivered" ? "text-green-500" : order.status === "Shipped" ? "text-blue-500" : "text-yellow-500"}`}>
                                {order.status}
                              </span>
                            </div>
                            <p className="font-bold">{order.total}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'security' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-bold mb-6">Security Settings</h2>
                  <form onSubmit={handlePasswordChange} className="space-y-6 max-w-md">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Current Password
                      </label>
                      <input
                        type="password"
                        name="currentPassword"
                        value={security.currentPassword}
                        onChange={handleSecurityChange}
                        className="w-full px-4 py-2.5 rounded-md border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        New Password
                      </label>
                      <input
                        type="password"
                        name="newPassword"
                        value={security.newPassword}
                        onChange={handleSecurityChange}
                        className="w-full px-4 py-2.5 rounded-md border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Confirm New Password
                      </label>
                      <input
                        type="password"
                        name="confirmPassword"
                        value={security.confirmPassword}
                        onChange={handleSecurityChange}
                        className="w-full px-4 py-2.5 rounded-md border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full px-6 py-2.5 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors font-medium"
                    >
                      Change Password
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;