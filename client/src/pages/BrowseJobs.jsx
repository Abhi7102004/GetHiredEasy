import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { setAllSearchedJobs, setSearchedQuery } from "@/store/slices/jobSlice";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import JobCard from "./JobCard";
import useGetAllJobs from "@/hooks/useGetAllJobs";

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.5,
    },
  }),
};

const JobsGrid = ({ jobsList }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
    {jobsList.map((job, index) => (
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
);

const BrowseJobs = () => {
  useGetAllJobs();
  const dispatch = useDispatch();
  const { allSearchedJobs: jobs } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);
  const isMounted = useRef(false);

  const appliedJobs = jobs.filter((job) =>
    job.applications?.some((application) => application.applicant === user?._id)
  );

  const availableJobs = jobs.filter(
    (job) =>
      !job.applications?.some(
        (application) => application.applicant === user?._id
      )
  );

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      return;
    }
    return () => {
      dispatch(setSearchedQuery(""));
      dispatch(setAllSearchedJobs([]));
    };
  }, []);

  return (
    <div className="w-full mx-auto my-10">
      <h1 className="text-2xl font-bold mb-6">
        Searched Results ({jobs?.length})
      </h1>
      
      <Tabs defaultValue="available" className="w-full">
        <div className="mb-6">
          <TabsList className="inline-flex h-10 items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800 p-1">
            <TabsTrigger
              value="available"
              className="data-[state=active]:bg-blue-500 data-[state=active]:text-white rounded-md px-6 py-2 text-sm font-medium transition-all"
            >
              Available ({availableJobs.length})
            </TabsTrigger>
            <TabsTrigger
              value="applied"
              className="data-[state=active]:bg-green-500 data-[state=active]:text-white rounded-md px-6 py-2 text-sm font-medium transition-all"
            >
              Applied ({appliedJobs.length})
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="available" className="mt-0">
          {availableJobs.length === 0 ? (
            <motion.p
              className="text-xl text-center text-gray-500 dark:text-gray-400 mt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              No available jobs found
            </motion.p>
          ) : (
            <JobsGrid jobsList={availableJobs} />
          )}
        </TabsContent>

        <TabsContent value="applied" className="mt-0">
          {appliedJobs.length === 0 ? (
            <motion.p
              className="text-xl text-center text-gray-500 dark:text-gray-400 mt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              No applied jobs found
            </motion.p>
          ) : (
            <JobsGrid jobsList={appliedJobs} />
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BrowseJobs;