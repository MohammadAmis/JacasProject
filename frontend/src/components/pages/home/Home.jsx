import Carousel from './Carousel';
import FeaturedProduct from './FeaturedProduct';
import Testimonial from './testimonial/Testimonial';

const Home = () => {

  return (
    <div className="min-h-screen bg-[#94B4C1]">
      {/* Hero Section */}
      <Carousel/>

      {/* Featured Products Section */}
      <FeaturedProduct/>

      {/* Categories Section */}
      {/* <ProductCategories
        productsByCategory={{
          Food: products,
          // Recipes: recipeProducts,
          // Electronics: electronicProducts,
          // Others: otherProducts,
        }}
      /> */}

      {/* Testimonials Section */}
      <Testimonial/>

    </div>
  );
};

export default Home;
