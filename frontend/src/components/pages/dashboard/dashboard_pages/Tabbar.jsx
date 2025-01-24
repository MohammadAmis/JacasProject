import { FiSettings, FiGrid, FiClock, FiBarChart2, FiShoppingCart, FiPackage } from "react-icons/fi";

const Tabbar = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: "overview", label: "Overview", icon: FiGrid },
    { id: "products", label: "Products", icon: FiPackage },
    { id: "orders", label: "Orders", icon: FiShoppingCart },
    { id: "analytics", label: "Analytics", icon: FiBarChart2 },
    { id: "history", label: "History", icon: FiClock },
    { id: "setting", label: "Setting", icon: FiSettings },
  ];

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center h-16 space-x-4">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`inline-flex items-center px-4 py-2 border-b-2 ${
                activeTab === id
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500"
              }`}
            >
              <Icon className="mr-2" />
              {label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Tabbar;
