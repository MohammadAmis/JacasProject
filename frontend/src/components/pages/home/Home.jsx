import Carousel from './Carousel';
import FeaturedProduct from './FeaturedProduct';
import Testimonial from './testimonial/Testimonial';

const Home = () => {

  return (
    <section className="min-h-screen max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-white">
      <Carousel />
      <FeaturedProduct />
      <Testimonial />
    </section>
  );
};

export default Home;
