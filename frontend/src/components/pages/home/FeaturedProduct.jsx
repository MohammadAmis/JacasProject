import { useEffect,useState } from "react";
import Card_Product from "./Card_Product";
import { fetchData } from "./fetchData";
import SkeletonLoader from "./SkeletonLoader";


const FeaturedProduct = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Example product data structure


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
    <section className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-0 py-6">
      <div className="bg-white rounded-2xl shadow-2xl p-2 sm:p-4 lg:p-6">
      <h2 className="text-4xl font-bold text-black mb-6 text-center">Top Sales Products</h2>
      <div className="bg-gray-800 rounded-xl p-4 shadow-inner grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 justify-items-center">
        {products.map((product) => (
          <Card_Product key={product._id} product={product} />
        ))}
        
        {loading && 
          [...Array(4)].map((_, i) => <SkeletonLoader key={i} />)
        }
      </div>
      </div>
    </section>
  );
};

export default FeaturedProduct;



