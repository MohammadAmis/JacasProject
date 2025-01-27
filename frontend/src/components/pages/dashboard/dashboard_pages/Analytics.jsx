import { useState, useEffect } from 'react';
import { Chart as ChartJS, registerables } from 'chart.js';
import { Bar, Line, Pie, Doughnut } from 'react-chartjs-2';


ChartJS.register(...registerables);

const Analytics = () => {
  const [loading, setLoading] = useState(true);



  // Sales Trend Data
  const salesChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    datasets: [
      {
        label: '2023 Sales',
        data: [4000, 6000, 8000, 7500, 9200],
        borderColor: '#3B82F6',
        tension: 0.4
      },
      {
        label: '2022 Sales',
        data: [3500, 5500, 7000, 6500, 8000],
        borderColor: '#94A3B8',
        tension: 0.4,
        borderDash: [5, 5]
      }
    ]
  };

  // Product Category Data
  const productChartData = {
    labels: ['Electronics', 'Fashion', 'Home & Living', 'Books'],
    datasets: [{
      label: 'Sales',
      data: [2400, 1800, 3200, 1500],
      backgroundColor: [
        '#3B82F6',
        '#10B981',
        '#F59E0B',
        '#EF4444'
      ]
    }]
  };

  // Customer Demographics
  const customerData = {
    labels: ['18-24', '25-34', '35-44', '45+'],
    datasets: [{
      label: 'Customers by Age',
      data: [30, 45, 15, 10],
      backgroundColor: '#3B82F6'
    }]
  };

  // Payment Methods
  const paymentMethodsData = {
    labels: ['Credit Card', 'UPI', 'Net Banking', 'COD'],
    datasets: [{
      data: [45, 35, 12, 8],
      backgroundColor: [
        '#3B82F6',
        '#10B981',
        '#F59E0B',
        '#EF4444'
      ]
    }]
  };

  // Top Products
  const topProductsData = {
    labels: ['Smartphone X', 'Laptop Pro', 'Smart Watch', 'Wireless Headphones'],
    datasets: [{
      label: 'Units Sold',
      data: [120, 85, 65, 45],
      backgroundColor: '#3B82F6'
    }]
  };

  useEffect(() => {
    setTimeout(() => setLoading(false), 1500);
  }, []);

  if (loading) {
    return <div className="p-6 text-center">Loading analytics...</div>;
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      
      {/* Main Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Sales Trend Comparison */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Sales Trend Comparison</h3>
          <div className="h-64">
            <Line 
              data={salesChartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                scales: { y: { beginAtZero: true } }
              }}
            />
          </div>
        </div>

        {/* Product Category Distribution */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Product Category Sales</h3>
          <div className="h-64">
            <Doughnut
              data={productChartData}
              options={{
                responsive: true,
                maintainAspectRatio: false
              }}
            />
          </div>
        </div>
      </div>

      {/* Secondary Data Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {/* Customer Demographics */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Customer Age Groups</h3>
          <div className="h-48">
            <Bar
              data={customerData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                indexAxis: 'y',
                scales: { x: { beginAtZero: true } }
              }}
            />
          </div>
        </div>

        {/* Payment Methods */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Payment Methods</h3>
          <div className="h-48">
            <Pie
              data={paymentMethodsData}
              options={{
                responsive: true,
                maintainAspectRatio: false
              }}
            />
          </div>
        </div>

        {/* Top Selling Products */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Top Selling Products</h3>
          <div className="h-48">
            <Bar
              data={topProductsData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                indexAxis: 'y',
                scales: { x: { beginAtZero: true } }
              }}
            />
          </div>
        </div>



        
      </div>

      {/* India Map */}
      {/* <IndiaMap regionalData={regionalData}/> */}

      
    </div>
  );
};

export default Analytics;