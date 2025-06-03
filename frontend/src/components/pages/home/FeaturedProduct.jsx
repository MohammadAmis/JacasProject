import { useEffect,useState } from "react";
import Card_Product from "./Card_Product";
import { fetchData } from "./fetchData";
import SkeletonLoader from "./SkeletonLoader";
// import { useNavigate } from "react-router-dom";


const FeaturedProduct = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  // const navigate = useNavigate();

  useEffect(() => {
    const getProducts = async () => {
      try {
        setLoading(true);
        // setTimeout(() => {
          fetchData(4).then(data => setProducts(data));
        // }, 0);
      } catch (err) {
        console.log(err.message || "Failed to fetch products");
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, []);

return (
  <section className="max-w-7xl mx-auto py-10">
    {/* Header section */}
    <div className="text-center mb-10 bg-[#547792] l rounded-xl overflow-hidden shadow-2xl p-3 mx-auto ">
      <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2">Top Selling Products</h2>
      <p className="text-blue-100/90">Customer favorites this season</p>
    </div>

    {/* Product grid - properly centered container */}
    <div className="flex justify-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 justify-items-center w-full">
        {products.map((product) => (
          <div key={product._id} className="w-full max-w-[280px]">
            <Card_Product 
              product={product}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100 h-full"
            />
          </div>
        ))}
        
        {loading && 
          [...Array(4)].map((_, i) => (
            <div 
              key={i}
              className="bg-gray-50 rounded-xl shadow-md overflow-hidden border border-gray-200 h-full w-full max-w-[280px]"
            >
              <SkeletonLoader className="h-full w-full" />
            </div>
          ))
        }
      </div>
    </div>

    {/* CTA button */}
    {/* {products.length > 0 && (
      <div className=" text-center flex items-center ju w-fit mt-10 px-5 py-2.5 bg-[#547792] hover:opacity-80 text-white font-medium  transition-colors rounded-xl overflow-hidden shadow-2xl">
        <button 
          onClick={() => navigate("/products")}
          className=" inline-flex  items-center"
        >
          Browse All Products
          <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    )} */}
  </section>
);

}

export default FeaturedProduct;



