import { useState } from 'react';
import { 
  FaUser, 
  FaBox, 
  FaEdit, 
  FaCog, 
  FaTimes, 
  FaSignOutAlt,
  FaBell, 
  FaBullhorn,
  FaShoppingCart, 
  FaTag, 
  FaBoxOpen, 
  FaShippingFast
} from 'react-icons/fa';
import { FiSearch } from 'react-icons/fi';
import { MdOutlineLocalShipping, MdOutlinePending, MdOutlineDeliveryDining, MdOutlinePayment, MdOutlineLocalOffer } from "react-icons/md";
import { useAuth } from '../../context/AuthContext';

const Profile = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState("profile");
  const [searchOrder, setSearchOrder] = useState("");
  const [editMode, setEditMode] = useState(false);  
  const [notificationTab, setNotificationTab] = useState("all"); // Separate state for notification sub-tabs
  
  const [security, setSecurity] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'new-product',
      title: 'New Jackfruit Product Launched!',
      message: 'Check out our new organic jackfruit chips now available in store',
      date: '2023-05-15T10:30:00',
      read: false,
      image: '/images/jackfruit-chips.jpg'
    },
    {
      id: 2,
      type: 'discount',
      title: 'Summer Sale - 20% Off!',
      message: 'Enjoy 20% discount on all products this weekend. Use code SUMMER20',
      date: '2023-05-10T08:15:00',
      read: true,
      expiry: '2023-05-20'
    },
    {
      id: 3,
      type: 'cart',
      title: 'Items in your cart',
      message: 'Your cart has items waiting for checkout. Complete your purchase now!',
      date: '2023-05-08T14:45:00',
      read: false
    },
    {
      id: 4,
      type: 'shipping',
      title: 'Order #12345 shipped',
      message: 'Your order has been dispatched and will arrive in 2-3 business days',
      date: '2023-05-05T11:20:00',
      read: true,
      trackingNumber: 'TRK789456123'
    },
    {
      id: 5,
      type: 'payment',
      title: 'Payment received',
      message: 'We have received your payment for order #12345',
      date: '2023-05-04T09:10:00',
      read: true
    },
    {
      id: 6,
      type: 'announcement',
      title: 'New Store Location Opening',
      message: 'Visit our new store in Mumbai opening next month with special offers!',
      date: '2023-04-28T16:30:00',
      read: false
    }
  ]);

  const markAsRead = (id) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({
      ...notification,
      read: true
    })));
  };

  const deleteNotification = (id) => {
    setNotifications(notifications.filter(notification => notification.id !== id));
  };

  const filteredNotifications = notifications.filter(notification => {
    if (notificationTab === 'all') return true;
    return notification.type === notificationTab;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  const getNotificationIcon = (type) => {
    switch(type) {
      case 'new-product':
        return <FaBoxOpen className="text-blue-500 text-xl" />;
      case 'discount':
        return <FaTag className="text-red-500 text-xl" />;
      case 'cart':
        return <FaShoppingCart className="text-green-500 text-xl" />;
      case 'shipping':
        return <FaShippingFast className="text-purple-500 text-xl" />;
      case 'payment':
        return <MdOutlinePayment className="text-indigo-500 text-xl" />;
      case 'announcement':
        return <FaBullhorn className="text-yellow-500 text-xl" />;
      default:
        return <FaBell className="text-gray-500 text-xl" />;
    }
  };

  const getTypeLabel = (type) => {
    switch(type) {
      case 'new-product': return 'New Product';
      case 'discount': return 'Discount';
      case 'cart': return 'Cart Reminder';
      case 'shipping': return 'Shipping Update';
      case 'payment': return 'Payment';
      case 'announcement': return 'Announcement';
      default: return 'Notification';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  const [userData, setUserData] = useState({
    name: user?.username,
    email: user?.email,
    phone: '+91 98765 43210',
    address: '123 Main St, Mumbai, India'
  });

  // Mock order history
  const dummyOrders = [
    {
      id: "ORD001",
      date: "2024-01-15",
      items: ["Jackfruit Chips", "Jackfruit Flour"],
      status: "Delivered",
      total: "₹599",
      trackingNumber: "TRK123456789"
    },
    {
      id: "ORD002",
      date: "2024-01-10",
      items: ["Jackfruit Seeds", "Jackfruit Jam"],
      status: "Processing",
      total: "₹459"
    },
    {
      id: "ORD003",
      date: "2024-01-05",
      items: ["Jackfruit Candy", "Jackfruit Powder"],
      status: "Shipped",
      total: "₹289",
      trackingNumber: "TRK987654321"
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
    alert("Profile updated successfully!");
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    if (security.newPassword !== security.confirmPassword) {
      alert("New passwords don't match!");
      return;
    }
    // Add password change logic
    alert("Password changed successfully!");
    setSecurity({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
  };

  return (
    <div className="min-h-[calc(100vh-5rem)] bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-[#3a6a8a] to-[#547792] text-white p-6">
            <div className="flex flex-col sm:flex-row items-center space-x-0 sm:space-x-6 space-y-4 sm:space-y-0">
              <div className="w-20 h-20 rounded-full bg-[#273F4F] flex items-center justify-center text-2xl font-bold text-white">
                {userData.name?.charAt(0).toUpperCase()}
              </div>
              <div className="text-center sm:text-left">
                <h1 className="text-2xl font-bold">{userData.name}</h1>
                <p className="text-white/90">{userData.email}</p>
              </div>
            </div>
          </div>

          <div className="lg:grid lg:grid-cols-12">
            {/* Navigation */}
            <div className="lg:col-span-3 border-r p-4 bg-gray-50">
              <nav className="flex flex-row space-x-2 overflow-x-auto lg:flex-col lg:space-x-0 lg:space-y-2 lg:overflow-visible">
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`flex items-center justify-center lg:justify-start space-x-2 p-3 rounded-lg transition-colors ${
                    activeTab === 'profile' 
                      ? 'bg-[#273F4F] text-white' 
                      : 'hover:bg-[#273F4F]/10'
                  }`}
                >
                  <FaUser className="w-5 h-5 flex-shrink-0" />
                  <span className="hidden lg:inline">Profile</span>
                </button>
                <button
                  onClick={() => setActiveTab('orders')}
                  className={`flex items-center justify-center lg:justify-start space-x-2 p-3 rounded-lg transition-colors ${
                    activeTab === 'orders' 
                      ? 'bg-[#273F4F] text-white' 
                      : 'hover:bg-[#273F4F]/10'
                  }`}
                >
                  <FaBox className="w-5 h-5 flex-shrink-0" />
                  <span className="hidden lg:inline">Order History</span>
                </button>
                <button
                  onClick={() => setActiveTab('notifications')}
                  className={`flex items-center justify-center lg:justify-start space-x-2 p-3 rounded-lg transition-colors relative ${
                    activeTab === 'notifications' 
                      ? 'bg-[#273F4F] text-white' 
                      : 'hover:bg-[#273F4F]/10'
                  }`}
                >
                  <FaBell className="w-5 h-5 flex-shrink-0" />
                  <span className="hidden lg:inline">Notifications</span>
                  {unreadCount > 0 && (
                    <span className="absolute -top-0 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {unreadCount}
                    </span>
                  )}
                </button>
                <button
                  onClick={() => setActiveTab('security')}
                  className={`flex items-center justify-center lg:justify-start space-x-2 p-3 rounded-lg transition-colors ${
                    activeTab === 'security' 
                      ? 'bg-[#273F4F] text-white' 
                      : 'hover:bg-[#273F4F]/10'
                  }`}
                >
                  <FaCog className="w-5 h-5 flex-shrink-0" />
                  <span className="hidden lg:inline">Security</span>
                </button>
                <button
                  onClick={() => logout()}
                  className={`flex items-center justify-center lg:justify-start space-x-2 p-3 rounded-lg transition-colors ${
                    activeTab === 'logout' 
                      ? 'bg-[#273F4F] text-white' 
                      : 'hover:bg-[#273F4F]/10'
                  }`}
                >
                  <FaSignOutAlt className="w-5 h-5 flex-shrink-0" />
                  <span className="hidden lg:inline">Logout</span>
                </button>
              </nav>
            </div>

            {/* Content Area */}
            <div className="lg:col-span-9 p-6">
              {/* Profile Section */}
              {activeTab === 'profile' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-bold text-gray-900">Profile Information</h2>
                    <button
                      onClick={() => setEditMode(!editMode)}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
                        editMode 
                          ? 'bg-gray-200 text-gray-800 hover:bg-gray-300' 
                          : 'bg-[#273F4F] text-white hover:bg-[#1a2d3a]'
                      }`}
                    >
                      <span>{editMode ? <FaTimes className='w-4 h-4' /> : <FaEdit className="w-4 h-4" />}</span>
                      <span className="hidden lg:inline">{editMode ? 'Cancel' : 'Edit Profile'}</span>
                    </button>
                  </div>

                  <form onSubmit={handleProfileUpdate} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                        <input
                          name="name"
                          value={userData.name}
                          onChange={handleInputChange}
                          disabled={!editMode}
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#273F4F] focus:border-transparent disabled:bg-gray-100"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input
                          name="email"
                          type="email"
                          value={userData.email}
                          onChange={handleInputChange}
                          disabled={!editMode}
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#273F4F] focus:border-transparent disabled:bg-gray-100"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                        <input
                          name="phone"
                          value={userData.phone}
                          onChange={handleInputChange}
                          disabled={!editMode}
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#273F4F] focus:border-transparent disabled:bg-gray-100"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                        <input
                          name="address"
                          value={userData.address}
                          onChange={handleInputChange}
                          disabled={!editMode}
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#273F4F] focus:border-transparent disabled:bg-gray-100"
                        />
                      </div>
                    </div>
                    {editMode && (
                      <button
                        type="submit"
                        className="px-6 py-3 bg-[#273F4F] text-white rounded-lg hover:bg-[#1a2d3a] transition-colors font-medium"
                      >
                        Save Changes
                      </button>
                    )}
                  </form>
                </div>
              )}

              {/* Orders Section */}
              {activeTab === "orders" && (
                <div>
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                    <h2 className="text-xl font-bold text-gray-900">Order History</h2>
                    <div className="relative w-full sm:w-64">
                      <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search orders..."
                        value={searchOrder}
                        onChange={(e) => setSearchOrder(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border-2 rounded-lg focus:ring-2 focus:ring-[#273F4F] focus:border-transparent"
                      />
                    </div>
                  </div>
                  
                  {filteredOrders.length > 0 ? (
                    <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
                      {filteredOrders.map((order) => (
                        <div
                          key={order.id}
                          className="border rounded-lg p-4 hover:shadow-md transition-shadow bg-white"
                        >
                          <div className="flex flex-col sm:flex-row justify-between gap-4">
                            <div>
                              <div className="flex items-center gap-2 mb-2">
                                <h3 className="font-semibold text-lg">Order #{order.id}</h3>
                                <span className="text-sm text-gray-500">{order.date}</span>
                              </div>
                              <div className="flex flex-wrap gap-2">
                                {order.items.map((item, index) => (
                                  <span
                                    key={index}
                                    className="inline-block bg-gray-100 rounded-full px-3 py-1 text-sm"
                                  >
                                    {item}
                                  </span>
                                ))}
                              </div>
                            </div>
                            <div className="flex flex-col items-end">
                              <div className="flex items-center gap-2 mb-2">
                                {getStatusIcon(order.status)}
                                <span className={`text-sm font-medium ${
                                  order.status === "Delivered" ? "text-green-600" :
                                  order.status === "Shipped" ? "text-blue-600" : "text-yellow-600"
                                }`}>
                                  {order.status}
                                </span>
                              </div>
                              <p className="font-bold text-lg">{order.total}</p>
                              {order.trackingNumber && (
                                <p className="text-sm text-gray-500 mt-1">
                                  Tracking: {order.trackingNumber}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="bg-gray-50 p-8 rounded-lg text-center">
                      <p className="text-gray-600">No orders found matching your search</p>
                    </div>
                  )}
                </div>
              )}

              {/* Notifications Section */}
              {activeTab === "notifications" && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-bold text-gray-900">Notifications</h2>
                    <button
                      onClick={markAllAsRead}
                      className="flex items-center space-x-2 px-4 py-2 bg-[#273F4F] text-white rounded-lg hover:bg-[#1a2d3a]"
                    >
                      <span>Mark all as read</span>
                    </button>
                  </div>

                  {/* Notification Tabs */}
                  <div className="border-b border-gray-200">
                    <nav className="flex overflow-x-auto">
                      <button
                        onClick={() => setNotificationTab('all')}
                        className={`px-4 py-3 text-sm font-medium whitespace-nowrap ${
                          notificationTab === 'all' 
                            ? 'border-b-2 border-[#273F4F] text-[#273F4F]' 
                            : 'text-gray-500 hover:text-gray-700'
                        }`}
                      >
                        All Notifications
                      </button>
                      <button
                        onClick={() => setNotificationTab('new-product')}
                        className={`px-4 py-3 text-sm font-medium whitespace-nowrap flex items-center gap-1 ${
                          notificationTab === 'new-product' 
                            ? 'border-b-2 border-[#273F4F] text-[#273F4F]' 
                            : 'text-gray-500 hover:text-gray-700'
                        }`}
                      >
                        <FaBoxOpen className="w-4 h-4" />
                        <span>New Products</span>
                      </button>
                      <button
                        onClick={() => setNotificationTab('discount')}
                        className={`px-4 py-3 text-sm font-medium whitespace-nowrap flex items-center gap-1 ${
                          notificationTab === 'discount' 
                            ? 'border-b-2 border-[#273F4F] text-[#273F4F]' 
                            : 'text-gray-500 hover:text-gray-700'
                        }`}
                      >
                        <MdOutlineLocalOffer className="w-4 h-4" />
                        <span>Discounts</span>
                      </button>
                      <button
                        onClick={() => setNotificationTab('cart')}
                        className={`px-4 py-3 text-sm font-medium whitespace-nowrap flex items-center gap-1 ${
                          notificationTab === 'cart' 
                            ? 'border-b-2 border-[#273F4F] text-[#273F4F]' 
                            : 'text-gray-500 hover:text-gray-700'
                        }`}
                      >
                        <FaShoppingCart className="w-4 h-4" />
                        <span>Cart</span>
                      </button>
                      <button
                        onClick={() => setNotificationTab('shipping')}
                        className={`px-4 py-3 text-sm font-medium whitespace-nowrap flex items-center gap-1 ${
                          notificationTab === 'shipping' 
                            ? 'border-b-2 border-[#273F4F] text-[#273F4F]' 
                            : 'text-gray-500 hover:text-gray-700'
                        }`}
                      >
                        <FaShippingFast className="w-4 h-4" />
                        <span>Shipping</span>
                      </button>
                    </nav>
                  </div>

                  {/* Notifications List */}
                  <div className="divide-y divide-gray-200 max-h-[500px] overflow-y-auto">
                    {filteredNotifications.length > 0 ? (
                      filteredNotifications.map(notification => (
                        <div 
                          key={notification.id} 
                          className={`p-4 hover:bg-gray-50 transition-colors ${!notification.read ? 'bg-blue-50' : ''}`}
                        >
                          <div className="flex items-start gap-3">
                            <div className="mt-1">
                              {getNotificationIcon(notification.type)}
                            </div>
                            <div className="flex-1">
                              <div className="flex justify-between items-start">
                                <h3 className="font-medium text-gray-900">{notification.title}</h3>
                                <div className="flex items-center gap-2">
                                  <span className="text-xs text-gray-500">{formatDate(notification.date)}</span>
                                  <button 
                                    onClick={() => deleteNotification(notification.id)}
                                    className="text-gray-400 hover:text-red-500"
                                  >
                                    <FaTimes className="w-3 h-3" />
                                  </button>
                                </div>
                              </div>
                              <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                              
                              {/* Additional info based on notification type */}
                              {notification.type === 'discount' && notification.expiry && (
                                <div className="mt-2">
                                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                    Expires: {new Date(notification.expiry).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                                  </span>
                                </div>
                              )}
                              
                              {notification.type === 'shipping' && notification.trackingNumber && (
                                <div className="mt-2">
                                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                                    Tracking #: {notification.trackingNumber}
                                  </span>
                                </div>
                              )}
                              
                              {notification.image && (
                                <div className="mt-3">
                                  <img 
                                    src={notification.image} 
                                    alt="Product" 
                                    className="h-20 w-20 object-cover rounded-md border border-gray-200"
                                  />
                                </div>
                              )}
                            </div>
                            {!notification.read && (
                              <button 
                                onClick={() => markAsRead(notification.id)}
                                className="w-2 h-2 rounded-full bg-blue-500 mt-2"
                                title="Mark as read"
                              />
                            )}
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="p-8 text-center">
                        <FaBell className="mx-auto h-12 w-12 text-gray-400" />
                        <h3 className="mt-2 text-sm font-medium text-gray-900">No notifications</h3>
                        <p className="mt-1 text-sm text-gray-500">
                          {notificationTab === 'all' 
                            ? "You don't have any notifications yet." 
                            : `You don't have any ${getTypeLabel(notificationTab).toLowerCase()} notifications.`}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Security Section */}
              {activeTab === 'security' && (
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-6">Security Settings</h2>
                  <form onSubmit={handlePasswordChange} className="max-w-md space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Current Password
                      </label>
                      <input
                        type="password"
                        name="currentPassword"
                        value={security.currentPassword}
                        onChange={handleSecurityChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#273F4F] focus:border-transparent"
                        placeholder="Enter current password"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        New Password
                      </label>
                      <input
                        type="password"
                        name="newPassword"
                        value={security.newPassword}
                        onChange={handleSecurityChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#273F4F] focus:border-transparent"
                        placeholder="Enter new password"
                        required
                        minLength="8"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Confirm New Password
                      </label>
                      <input
                        type="password"
                        name="confirmPassword"
                        value={security.confirmPassword}
                        onChange={handleSecurityChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#273F4F] focus:border-transparent"
                        placeholder="Confirm new password"
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full px-6 py-3 bg-[#273F4F] text-white rounded-lg hover:bg-[#1a2d3a] transition-colors font-medium"
                    >
                    Update Password
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