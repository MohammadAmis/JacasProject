import { useState } from "react";
import PropTypes from "prop-types"; 
import { FaQuoteLeft, FaQuoteRight, FaStar } from "react-icons/fa";
import { motion } from "framer-motion";

const TestimonialCard = ({ testimonial }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <motion.div
      className=" max-w-screen-mobile w-[400px] mx-auto bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 "
      initial={{ opacity: 0, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
    >
      <div className="relative h-48 w-full  overflow-hidden">
        {!imageError ? (
          <img
            src={`https://${testimonial.image}`}
            alt={`${testimonial.name}'s dining experience at ${testimonial.restaurant}`}
            className="w-full h-full object-cover "
            onError={handleImageError}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-r from-gray-200 to-gray-300 flex items-center justify-center">
            <span className="text-gray-500">Image unavailable</span>
          </div>
        )}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/50 to-transparent"></div>
      </div>

      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-gray-800">{testimonial.name}</h3>
          <div className="flex items-center">
            {[...Array(testimonial.rating)].map((_, index) => (
              <FaStar key={index} className="text-yellow-400" />
            ))}
          </div>
        </div>

        <div className="mb-4">
          <FaQuoteLeft className="text-gray-400 mb-2" />
          <p className="text-gray-600 leading-relaxed">
            {isExpanded ? testimonial.fullReview : testimonial.shortReview}
          </p>
          <FaQuoteRight className="text-gray-400 ml-auto mt-2" />
        </div>

        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <span>{testimonial.date}</span>
          <span>{testimonial.restaurant}</span>
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full hover:from-orange-600 hover:to-red-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50"
            aria-label={isExpanded ? "Show less" : "Read more"}
          >
            {isExpanded ? "Show Less" : "Read More"}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

// PropTypes Validation
TestimonialCard.propTypes = {
  testimonial: PropTypes.shape({
    name: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    shortReview: PropTypes.string.isRequired,
    fullReview: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    restaurant: PropTypes.string.isRequired,
  }).isRequired,
};

export default TestimonialCard;
