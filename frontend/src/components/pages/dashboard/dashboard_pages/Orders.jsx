import { useEffect, useState } from 'react';
import { FiSearch, FiArrowUp, FiChevronDown } from "react-icons/fi";
import axios from 'axios';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [showScrollTop, setShowScrollTop] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('all');
    const [sortBy, setSortBy] = useState('newest');
    const [isLoading, setIsLoading] = useState(true);

    // Status options for filtering
    const statusOptions = [
        { value: 'all', label: 'All Statuses' },
        { value: 'pending', label: 'Pending' },
        { value: 'processed', label: 'Processed' },
        { value: 'shipped', label: 'Shipped' },
        { value: 'delivered', label: 'Delivered' },
        { value: 'cancelled', label: 'Cancelled' }
    ];

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
                setIsLoading(true);
                const response = await axios.get('https://global-venture.onrender.com/api/admin/fetch-order');
                // const response = await axios.get('api/admin/fetch-order');
                setOrders(response.data);
            } catch (error) {
                console.error("Error fetching orders:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchOrders();
    }, []);

    // Filter and sort orders
    const filteredOrders = orders
        .filter(order => {
            const matchesSearch = order.product_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                order.order_id.toString().includes(searchQuery);
            const matchesStatus = selectedStatus === 'all' || order.status === selectedStatus;
            return matchesSearch && matchesStatus;
        })
        .sort((a, b) => {
            if (sortBy === 'newest') return new Date(b.order_date) - new Date(a.order_date);
            if (sortBy === 'oldest') return new Date(a.order_date) - new Date(b.order_date);
            return 0;
        });

    return (
        <div className=" bg-white p-6 rounded-xl shadow-lg  max-w-full overflow-hidden">
            {/* Header Section */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">Order Management</h2>
                    <p className="text-gray-500 mt-1">{filteredOrders.length} orders found</p>
                </div>
                
                <div className="w-full lg:w-auto flex flex-col sm:flex-row gap-3">
                    <div className="relative flex-1">
                        <input
                            type="text"
                            placeholder="Search orders..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <FiSearch className="absolute left-3 top-3.5 text-gray-400" />
                    </div>

                    <div className="relative flex-1">
                        <select
                            value={selectedStatus}
                            onChange={(e) => setSelectedStatus(e.target.value)}
                            className="w-full pl-4 pr-8 py-2.5 bg-white border border-gray-200 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            {statusOptions.map(option => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                        <FiChevronDown className="absolute right-3 top-3.5 text-gray-400 pointer-events-none" />
                    </div>

                    <div className="relative flex-1">
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="w-full pl-4 pr-8 py-2.5 bg-white border border-gray-200 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="newest">Newest First</option>
                            <option value="oldest">Oldest First</option>
                        </select>
                        <FiChevronDown className="absolute right-3 top-3.5 text-gray-400 pointer-events-none" />
                    </div>
                </div>
            </div>

            {/* Orders Table */}
            <div className="overflow-x-auto rounded-lg border border-gray-100">
                <table className="w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Order ID
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider min-w-[200px]">
                                Product
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Price
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Qty
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Total
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Payment
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Address
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Status
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Date
                            </th>
                        </tr>
                    </thead>
                    
                    <tbody className="bg-white divide-y divide-gray-200">
                        {isLoading ? (
                            // Loading Skeleton
                            Array(5).fill(0).map((_, index) => (
                                <tr key={index} className="animate-pulse">
                                    {Array(9).fill(0).map((_, colIndex) => (
                                        <td key={colIndex} className="px-6 py-4">
                                            <div className="h-4 bg-gray-100 rounded"></div>
                                        </td>
                                    ))}
                                </tr>
                            ))
                        ) : (
                            filteredOrders.map((order) => (
                                <tr key={order.order_id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 font-medium text-gray-900">#{order.order_id}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center">
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-gray-900">{order.product_name}</div>
                                                
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-gray-900">₹{parseInt(order.price).toLocaleString()}</td>
                                    <td className="px-6 py-4 text-gray-900">{order.quantity}</td>
                                    <td className="px-6 py-4 text-gray-900">₹{parseInt(order.total).toLocaleString()}</td>
                                    <td className="px-6 py-4 text-sm text-gray-900 lg:text-base">
                                        {order.payment_method}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-900 lg:text-base">
                                        <div className="max-w-[200px] truncate">
                                            {order.address}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                                            order.status === "delivered" ? "bg-green-100 text-green-800" :
                                            order.status === "shipped" ? "bg-yellow-100 text-yellow-800" :
                                            order.status === "cancelled" ? "bg-red-100 text-red-800" :
                                            order.status === "pending" ? "bg-blue-100 text-blue-800" :
                                            "bg-gray-100 text-gray-800"
                                        }`}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-500">
                                        {new Date(order.order_date).toLocaleDateString('en-IN', {
                                            day: 'numeric',
                                            month: 'short',
                                            year: 'numeric'
                                        })}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Scroll to Top Button */}
            <button
                onClick={scrollToTop}
                className={`fixed bottom-8 right-8 p-3 bg-blue-600 text-white rounded-full shadow-lg transition-all duration-300 ${
                    showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                } hover:bg-blue-700 hover:shadow-xl`}
            >
                <FiArrowUp className="w-5 h-5" />
            </button>
        </div>
    );
};

export default Orders;
