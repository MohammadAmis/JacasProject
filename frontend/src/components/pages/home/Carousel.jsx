import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronLeft,FaChevronRight } from "react-icons/fa";
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
    className="relative h-[70vh] sm:h-[80vh] max-w-7xl mx-auto rounded-2xl overflow-hidden shadow-2xl mt-3"
    onMouseEnter={() => setAutoRotate(false)}
    onMouseLeave={() => setAutoRotate(true)}
  >
    {/* Gradient overlay for better text visibility */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10 pointer-events-none" />
    
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
        dragElastic={0.1}
        onDragEnd={handleDragEnd}
        onDragStart={() => setAutoRotate(false)}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        aria-label={`Slide ${currentIndex + 1} of ${slides.length}`}
      >
        {slides[currentIndex].component}
      </motion.div>
    </AnimatePresence>

    {/* Navigation Buttons - Modern Floating Style */}
    <div className="absolute inset-0 flex items-center justify-between px-4 z-20">
      <button
        onClick={handlePrev}
        className="p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all hover:scale-110 shadow-lg"
        aria-label="Previous slide"
      >
        <FaChevronLeft className="text-2xl text-white" />
      </button>
      <button
        onClick={handleNext}
        className="p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all hover:scale-110 shadow-lg"
        aria-label="Next slide"
      >
        <FaChevronRight className="text-2xl text-white" />
      </button>
    </div>

    {/* Progress Indicators - Modern Dots */}
    <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
      {slides.map((_, index) => (
        <button
          key={index}
          onClick={() => setCurrentIndex([index, index > currentIndex ? 1 : -1])}
          className={`h-2.5 rounded-full transition-all duration-300 ${
            index === currentIndex ? 'bg-white w-8' : 'bg-white/50 w-3'
          }`}
          aria-label={`Go to slide ${index + 1}`}
          aria-current={index === currentIndex ? "true" : "false"}
        />
      ))}
    </div>

    

    {/* Optional: Slide Title */}
    {slides[currentIndex].title && (
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 text-white text-xl font-bold text-center z-20 px-4 py-2 bg-black/30 rounded-lg">
        {slides[currentIndex].title}
      </div>
    )}
  </div>
);
};

export default Carousel;