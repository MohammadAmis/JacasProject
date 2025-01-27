import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaRegArrowAltCircleLeft, FaRegArrowAltCircleRight } from "react-icons/fa";
import Slide1 from "./Slide/Slide_1";
import Slide2 from "./Slide/Slide_2";
import Slide3 from "./Slide/Slide_3";

const slides = [
  { id: 1, component: <Slide1 /> },
  { id: 2, component: <Slide2 /> },
  { id: 3, component: <Slide3 /> }
];

const Carousel = () => {
  const [[currentIndex, direction], setCurrentIndex] = useState([0, 0]);
  const [autoRotate, setAutoRotate] = useState(true);

  // Auto-rotate functionality
  useEffect(() => {
    let interval;
    if (autoRotate) {
      interval = setInterval(() => {
        setCurrentIndex([(currentIndex + 1) % slides.length, 1]);
      }, 5000);
    }
    return () => interval && clearInterval(interval);
  }, [autoRotate, currentIndex]);

  const handleNext = () => {
    setCurrentIndex([(currentIndex + 1) % slides.length, 1]);
    setAutoRotate(false);
  };

  const handlePrev = () => {
    setCurrentIndex([currentIndex === 0 ? slides.length - 1 : currentIndex - 1, -1]);
    setAutoRotate(false);
  };

  // Handle swipe gestures
  const handleDragEnd = (event, { offset, velocity }) => {
    const swipeThreshold = 50;
    const swipePower = Math.abs(offset.x) * velocity.x;
    
    if (swipePower < -swipeThreshold) {
      handleNext();
    } else if (swipePower > swipeThreshold) {
      handlePrev();
    }
  };

  // Animation variants
  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 0.95
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: { duration: 0.3 }
    },
    exit: (direction) => ({
      x: direction > 0 ? '-100%' : '100%',
      opacity: 0,
      scale: 0.95,
      transition: { duration: 0.3 }
    })
  };

  return (
    <div 
      className="relative h-[calc(100vh-5rem)] max-w-7xl mx-auto   m-3 overflow-hidden z-10 rounded-xl "
      onMouseEnter={() => setAutoRotate(false)}
      onMouseLeave={() => setAutoRotate(true)}
    >
      <AnimatePresence custom={direction} initial={false}>
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          className="absolute w-full h-full"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          onDragEnd={handleDragEnd}
          onDragStart={() => setAutoRotate(false)}
          aria-label="Swipeable carousel slide"
        >
          {slides[currentIndex].component}
        </motion.div>
      </AnimatePresence>

      {/* Navigation Buttons */}
      <div className="absolute inset-0 flex items-center justify-between px-4">
        <button
          onClick={handlePrev}
          className="text-white p-2 rounded-full z-20 hover:scale-110 transition-transform"
          aria-label="Previous slide"
        >
          <FaRegArrowAltCircleLeft className="text-4xl text-white/80 hover:text-white" />
        </button>
        <button
          onClick={handleNext}
          className="text-white p-2 rounded-full z-20 hover:scale-110 transition-transform"
          aria-label="Next slide"
        >
          <FaRegArrowAltCircleRight className="text-4xl text-white/80 hover:text-white" />
        </button>
      </div>

      {/* Progress Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex([index, index > currentIndex ? 1 : -1])}
            className={`h-2 w-8 rounded-full transition-all duration-300 ${
              index === currentIndex ? 'bg-white/90 w-12' : 'bg-white/40'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Slide Counter */}
      {/* <div className="absolute top-4 right-4 bg-black/30 text-white px-3 py-1 rounded-full text-sm z-20">
        {currentIndex + 1} / {slides.length}
      </div> */}
    </div>
  );
};

export default Carousel;