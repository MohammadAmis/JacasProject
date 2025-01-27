/* eslint-disable react/prop-types */
import { FiShoppingCart, FiUsers, FiTrendingUp,FiDollarSign } from "react-icons/fi";
import { Chart as ChartJS, LineElement, Title, PointElement, CategoryScale, LinearScale, BarElement } from "chart.js";
import { Line, Bar } from "react-chartjs-2";

// Register the chart types with ChartJS
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  BarElement  // Register the Bar chart type
);


const Overview = () => {

  

  const MetricCard = ({ title, value, icon: Icon, color }) => (
    <div className={`bg-white p-6 rounded-lg shadow-md border-l-4 ${color}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-sm">{title}</p>
          <p className="text-2xl font-bold mt-2">{value}</p>
        </div>
        <div className={`p-3 rounded-full ${color.replace("border", "bg")} bg-opacity-20`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </div>
  );

  const salesData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Sales",
        data: [3000, 4500, 3800, 5200, 4800, 6000],
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1
      }
    ]
  };


  const categoryData = {
    labels: ["Electronics", "Clothing", "Books", "Home"],
    datasets: [
      {
        label: "Product Categories",
        data: [400, 300, 200, 278],
        backgroundColor: ["rgba(255, 99, 132, 0.5)", "rgba(54, 162, 235, 0.5)", "rgba(255, 206, 86, 0.5)", "rgba(75, 192, 192, 0.5)"],
        borderColor: ["rgb(255, 99, 132)", "rgb(54, 162, 235)", "rgb(255, 206, 86)", "rgb(75, 192, 192)"],
        borderWidth: 1,
      },
    ],
  };

  const products = [
    { name: "Premium Headphones", unitsSold: 245, revenue: "$12,250", status: "In Stock" },
    { name: "Wireless Mouse", unitsSold: 189, revenue: "$5,670", status: "Low Stock" },
    { name: "Gaming Keyboard", unitsSold: 156, revenue: "$7,800", status: "In Stock" },
    { name: "4K Monitor", unitsSold: 98, revenue: "$29,400", status: "Out of Stock" }
  ];

  const recentOrders = [
    { id: "#ORD001", customer: "John Doe", total: "$299", status: "Delivered" },
    { id: "#ORD002", customer: "Jane Smith", total: "$499", status: "Processing" },
    { id: "#ORD003", customer: "Mike Johnson", total: "$799", status: "Pending" },
    { id: "#ORD004", customer: "Sarah Williams", total: "$199", status: "Shipped" }
  ];

  return (
    <div className="max-w-7xl  mx-auto  bg-gray-100">
        {/* Dashboard Content */}
        <main className="p-6">
          {/* KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-6">
            <MetricCard
              title="Total Revenue"
              value="$24,780"
              icon={FiDollarSign}
              color="border-blue-500"
            />
            <MetricCard
              title="Total Orders"
              value="1,280"
              icon={FiShoppingCart}
              color="border-green-500"
            />
            <MetricCard
              title="Growth"
              value="450"
              icon={FiTrendingUp}
              color="border-yellow-500"
            />
            <MetricCard
              title="Active Customers"
              value="89"
              icon={FiUsers}
              color="border-purple-500"
            />
            <MetricCard
              title="New Customers"
              value="89"
              icon={FiUsers}
              color="border-pink-500"
            />
          </div>

          {/* Sales Chart */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div className="bg-white rounded-lg p-6 shadow-sm mb-6">
              <h2 className="text-lg font-semibold mb-4">Sales Trend</h2>
              <Line data={salesData} />
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm mb-6">
                <h2 className="text-lg font-semibold mb-4">Product Categories</h2>
                <Bar data={categoryData} />
              </div>
          </div>

          {/* Product Performance */}
          <div className="bg-white rounded-lg p-6 shadow-sm mb-6">
            <h2 className="text-lg font-semibold mb-4">Product Performance</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3">Product Name</th>
                    <th className="text-left py-3">Units Sold</th>
                    <th className="text-left py-3">Revenue</th>
                    <th className="text-left py-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product, index) => (
                    <tr key={index} className="border-b hover:bg-gray-50">
                      <td className="py-3">{product.name}</td>
                      <td className="py-3">{product.unitsSold}</td>
                      <td className="py-3">{product.revenue}</td>
                      <td className="py-3">
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${product.status === "In Stock" ? "bg-green-100 text-green-800" : product.status === "Low Stock" ? "bg-yellow-100 text-yellow-800" : "bg-red-100 text-red-800"}`}
                        >
                          {product.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Recent Orders */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Recent Orders</h2>
            <div className="space-y-4">
              {recentOrders.map((order, index) => (
                <div key={index} className="flex items-center justify-between border-b pb-4">
                  <div>
                    <p className="font-medium">{order.id}</p>
                    <p className="text-sm text-gray-500">{order.customer}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{order.total}</p>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${order.status === "Delivered" ? "bg-green-100 text-green-800" : order.status === "Processing" ? "bg-blue-100 text-blue-800" : order.status === "Shipped" ? "bg-purple-100 text-purple-800" : "bg-yellow-100 text-yellow-800"}`}
                    >
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
    </div>
  );
};

export default Overview;