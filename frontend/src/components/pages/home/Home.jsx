import Carousel from './Carousel';
import FeaturedProduct from './FeaturedProduct';
import Testimonial from './testimonial/Testimonial';

const Home = () => {

  return (
    <div className="min-h-screen bg-white">
      <Carousel />
      <FeaturedProduct />
      <Testimonial />
    </div>
  );
};

export default Home;
