import React, { useState } from "react";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/store/slices/jobSlice";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const [query,setQuery]=useState("");
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: { duration: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 200,
      },
    },
    exit: {
      opacity: 0,
      y: -10,
      transition: { duration: 0.2 },
    },
  };
  const handleSearch=()=>{
    dispatch(setSearchedQuery(query));
    navigate('/browse')
  }
  
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-col items-center gap-5 my-10 light:bg-gradient-to-br from-purple-50 to-indigo-100 p-4 text-gray-900 dark:text-white"
    >
      <motion.span
        variants={itemVariants}
        className="bg-gradient-to-r from-pink-500 to-purple-500 text-white text-md md:text-lg font-bold px-6 py-2 rounded-full mb-8 shadow-lg"
      >
        No. 1 Job Hunt Website
      </motion.span>

      <motion.h1
        variants={itemVariants}
        className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-center mb-2 leading-tight"
      >
        Search, Apply & 
      </motion.h1>
      <motion.h1
        variants={itemVariants}
        className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-center leading-tight bg-clip-text mt-2 text-transparent bg-gradient-to-r from-purple-400 to-pink-600 "
      >
        Get Your Dream Jobs
      </motion.h1>

      <motion.p
        variants={itemVariants}
        className="text-lg md:text-xl text-center text-gray-600 dark:text-gray-300 max-w-2xl mb-12"
      >
        Find the best job opportunities that match your skills and aspirations.
        Start your journey with us today!
      </motion.p>

      <motion.div variants={itemVariants} className="relative w-full max-w-md">
        <input
          type="text"
          onChange={(e)=>setQuery(e.target.value)}
          className="w-full border-2 border-purple-300 dark:border-purple-600 px-4 py-3 rounded-full focus:outline-none focus:ring-4 focus:ring-purple-400 focus:border-purple-500 transition-all duration-300 bg-white dark:bg-gray-800"
          placeholder="Search for your dream job..."
        />
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleSearch}
          className="absolute right-1 top-1 bottom-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-full transition-all duration-300 shadow-md hover:shadow-lg"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default HeroSection;
