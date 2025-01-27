import Carousel from './Carousel';
import FeaturedProduct from './FeaturedProduct';
import Testimonial from './testimonial/Testimonial';
import ProductCategories from './ProductCategories';
import { useState,useEffect } from 'react';
import { fetchData } from './fetchData';

const Home = () => {
  const [products, setProducts] = useState([]);
  
    useEffect(() => {
      const getProducts = async () => {
        try {
            fetchData(4).then(data => setProducts(data));

        } catch (err) {
          console.log(err.message || "Failed to fetch products");
        }
      };
  
      getProducts();
    }, []);
  
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Carousel/>

      {/* Featured Products Section */}
      <FeaturedProduct/>

      {/* Categories Section */}
      <ProductCategories
        productsByCategory={{
          Food: products,
          // Recipes: recipeProducts,
          // Electronics: electronicProducts,
          // Others: otherProducts,
        }}
      />

      {/* Testimonials Section */}
      <Testimonial/>

    </div>
  );
};

export default Home;