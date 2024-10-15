import React, { useEffect } from "react";
import JobCard from "./JobCard";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { setSearchedQuery } from "@/store/slices/jobSlice";
import useGetAllJobs from "@/hooks/useGetAllJobs";

// Animation variants for individual job cards
const cardVariants = {
  hidden: { opacity: 0, y: 50 }, // Initially hidden state
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2, // Stagger the appearance of each card
      duration: 0.5,  // Animation duration
    },
  }),
};

const BrowseJobs = () => {
  useGetAllJobs();
  const dispatch=useDispatch();
  const {allSearchedJobs:jobs}=useSelector(store=>store.job)
  useEffect(()=>{
    return ()=>{
      dispatch(setSearchedQuery(""))
    }
  },[])
  return (
    <div className="lg:max-w-[85%] w-full mx-auto my-10">
      <h1 className="text-2xl font-bold mb-6">Searched Results ({jobs?.length})</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {jobs?.map((job, index) => (
          // Apply motion.div for each JobCard with the custom animation
          <motion.div 
            key={index} 
            custom={index} 
            variants={cardVariants} 
            initial="hidden" 
            animate="visible"
          >
            <JobCard job={job} />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default BrowseJobs;
