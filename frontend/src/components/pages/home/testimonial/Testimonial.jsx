import { motion } from 'framer-motion';
import { FaQuoteLeft, FaQuoteRight } from 'react-icons/fa';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import TestimonialData from "./TestimonialData";
import { useState } from 'react';


const Testimonial = () => {
  const [current, setCurrent] = useState(0);

  const nextTestimonial = () => {
    setCurrent((prev) => (prev === TestimonialData.length - 1 ? 0 : prev + 1));
  };

  const prevTestimonial = () => {
    setCurrent((prev) => (prev === 0 ? TestimonialData.length - 1 : prev - 1));
  };

  return (
    <section className="max-w-7xl mx-auto py-3">
        <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-center bg-[#547792] l rounded-xl overflow-hidden shadow-2xl p-3 mx-auto">
          What Our Customers Say
        </h2>

        <div className="relative max-w-3xl mx-auto my-10">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {/* Card Container */}
            <div className="bg-[#547792] rounded-xl  p-8 relative">
              {/* Navigation Arrows - Top Right */}
              <div className="absolute -top-6 right-4 flex space-x-2">
                <button
                  onClick={prevTestimonial}
                  className="p-2 rounded-full bg-gray-800 shadow-lg hover:bg-gray-900 transition-colors"
                >
                  <FiChevronLeft className="w-6 h-6 text-white" />
                </button>
                <button
                  onClick={nextTestimonial}
                  className="p-2 rounded-full bg-gray-800 shadow-lg hover:bg-gray-900 transition-colors"
                >
                  <FiChevronRight className="w-6 h-6 text-white" />
                </button>
              </div>

              {/* Quote Content */}
              <FaQuoteLeft className="text-white text-xl mb-4" />
              <p className="text-white text-lg italic mb-6">
                {TestimonialData[current].message}
              </p>
              <FaQuoteRight className="text-white text-xl ml-auto" />

              {/* Author Info */}
              <div className="flex items-center justify-center space-x-4 mt-8">
                <img 
                  src={TestimonialData[current].image} 
                  alt={TestimonialData[current].name}
                  className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-lg"
                />
                <div>
                  <h3 className="text-xl font-semibold text-white">
                    {TestimonialData[current].name}
                  </h3>
                  <p className="text-white">{TestimonialData[current].restaurant}</p>
                  <p className="text-white">{TestimonialData[current].date}</p>
                  <div className="flex mt-1 text-yellow-400">
                    {[...Array(TestimonialData[current].rating)].map((_, i) => (
                      <svg
                        key={i}
                        className="w-5 h-5 fill-current"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  
                </div>
              </div>
            </div>
          </motion.div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {TestimonialData.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === current ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
    </section>
  );
};

export default Testimonial;