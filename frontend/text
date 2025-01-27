import { useEffect, useState } from 'react';
import { FiSearch, FiFilter,FiArrowUp } from "react-icons/fi";
import axios from 'axios';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [showScrollTop, setShowScrollTop] = useState(false);

    useEffect(() => {
      const handleScroll = () => {
        setShowScrollTop(window.pageYOffset > 300);
      };
  
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }, []);
    const scrollToTop = () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get('/api/admin/fetch-order');
                setOrders(response.data); // Ensure you access the data property
            } catch (error) {
                console.error("Error fetching orders:", error);
            }
        };
        fetchOrders();
    }, []);

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold">Orders</h2>
                <div className="flex space-x-4">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search orders..."
                            className="pl-10 pr-4 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    </div>
                    <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                        <FiFilter className="mr-2" />
                        Filter
                    </button>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                            {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer ID</th> */}
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider text-nowrap">Unit Price</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Shipping Address</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {orders.map((order) => (
                            <tr key={order.order_id}>
                                <td className="px-6 py-4 whitespace-nowrap">{order.order_id}</td>
                                {/* <td className="px-6 py-4 whitespace-nowrap">{order.user_id}</td> */}
                                <td className="px-6 py-4 whitespace-nowrap">{order.product_name}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{parseInt(order.price)}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{order.quantity}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{parseInt(order.total)}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{order.payment_method}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{order.address}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{new Date(order.order_date).toLocaleString()}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span
                                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                            order.status === "delivered"
                                                ? "bg-green-100 text-green-800"
                                            : order.status === "shipped"
                                                ? "bg-yellow-100 text-yellow-800"
                                            : order.status === "cancelled"
                                                ? "bg-red-100 text-red-800"
                                            : order.status === "pending"
                                                ? "bg-blue-100 text-blue-800"
                                            : order.status === "processed"
                                                ? "bg-gray-200 text-orange-800"
                                            : "" // Default case, if any other status appears
                                        }`}
                                    >
                                        {order.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className={`${
          showScrollTop ? "opacity-100" : "opacity-0"
        } fixed bottom-8 right-8 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50`}
        aria-label="Scroll to top"
      >
        <FiArrowUp />
      </button>
        </div>
    );
};

export default Orders;
