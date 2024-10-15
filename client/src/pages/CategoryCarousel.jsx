import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from '@/store/slices/jobSlice';

const categories = [
  "Frontend Developer",
  "Backend Developer",
  "Data Science",
  "Graphic Designer",
  "FullStack Developer"
];

const CategoryCarousel = () => {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [isAnimating, setIsAnimating] = React.useState(false); 
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const nextCategory = () => {
    if (isAnimating) return; 
    setIsAnimating(true);
    setActiveIndex((prevIndex) => (prevIndex + 1) % categories.length);
    setTimeout(() => setIsAnimating(false), 300); 
  };

  const prevCategory = () => {
    if (isAnimating) return; 
    setIsAnimating(true);
    setActiveIndex((prevIndex) => (prevIndex - 1 + categories.length) % categories.length);
    setTimeout(() => setIsAnimating(false), 300); 
  };
  const handleCategorySearch=(activeIndex)=>{
    dispatch(setSearchedQuery(categories[activeIndex]));
    navigate('/browse')
  }
  return (
    <div className="w-full max-w-4xl mx-auto my-12 px-4">
      <motion.div 
        className="relative bg-transparent rounded-2xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-between p-6">
          <motion.button
            aria-label="Previous Category"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="text-gray-600 dark:text-gray-300 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
            onClick={prevCategory}
          >
            <ChevronLeft size={24} />
          </motion.button>
          
          <motion.button 
            onClick={()=>handleCategorySearch(activeIndex)}
            key={activeIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.25 }} 
            className="flex-1 text-center"
          >
            <h3 className="text-3xl font-semibold text-gray-800 dark:text-white">
              {categories[activeIndex]}
            </h3>
          </motion.button>

          <motion.button
            aria-label="Next Category"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="text-gray-600 dark:text-gray-300 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
            onClick={nextCategory}
          >
            <ChevronRight size={24} />
          </motion.button>
        </div>
        
        <motion.div 
          className="absolute bottom-0 left-0 right-0 h-[3px] bg-gray-300 dark:bg-gray-700"
          initial={{ width: '0%' }}
          animate={{ width: `${((activeIndex + 1) / categories.length) * 100}%` }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
    </div>
  );
};

export default CategoryCarousel;
