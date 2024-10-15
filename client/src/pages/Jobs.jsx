import { motion } from "framer-motion";
import FilterCard from "./FilterCard";
import JobCard from "./JobCard";
import { useSelector } from "react-redux";
import useGetAllJobs from "@/hooks/useGetAllJobs";

const Jobs = () => {
  useGetAllJobs();
  const {jobs}=useSelector(store=>store.job);

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.3,
        duration: 0.4,
      },
    }),
  };

  return (
    <div className="w-full mx-auto py-10">
      <div className="grid grid-cols-1 xl:grid-cols-4 xl:gap-y-0 gap-y-10 xl:gap-x-10 gap-x-0 ">
        {/* Filter section */}
        <motion.div
          className="xl:col-span-1"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <FilterCard />
        </motion.div>

        {/* Jobs section */}
        <div className="lg:col-span-3">
          {jobs.length === 0 ? (
            <motion.p
              className="text-xl text-center text-gray-300"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              No jobs found
            </motion.p>
          ) : (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-6"
              initial="hidden"
              animate="visible"
              variants={cardVariants}
            >
              {jobs.map((job, index) => (
                <motion.div key={index} custom={index} variants={cardVariants}>
                  <JobCard job={job} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Jobs;
