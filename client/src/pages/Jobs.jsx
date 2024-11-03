import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FilterCard from "./FilterCard";
import JobCard from "./JobCard";
import useGetAllJobs from "@/hooks/useGetAllJobs";
import { FolderSearch } from "lucide-react";

const Jobs = () => {
  const [hasAnimated, setHasAnimated] = useState(false);
  useGetAllJobs();
  const { jobs = [] } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);

  // Reset animation state when component unmounts
  useEffect(() => {
    setHasAnimated(false);
    return () => setHasAnimated(false);
  }, []);

  const appliedJobs = jobs?.filter((job) =>
    job?.applications?.some(
      (application) => application?.applicant === user?._id
    )
  ) || [];

  const availableJobs = jobs?.filter(
    (job) =>
      !job?.applications?.some(
        (application) => application?.applicant === user?._id
      )
  ) || [];

  const JobsGrid = ({ jobsList = [] }) => {
    if (!jobsList || jobsList?.length === 0) {
      return (
        <div className="flex flex-col gap-2 items-center justify-center mb-8 rounded-lg">
          <FolderSearch className="w-8 h-8 text-slate-400" />
          <h3 className="text-xl font-semibold dark:text-slate-200 text-slate-500">
            No Jobs Found
          </h3>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-6">
        {jobsList.map((job, index) => (
          <motion.div
            key={job?._id}
            initial={!hasAnimated ? { opacity: 0, y: 20 } : false}
            animate={!hasAnimated ? { opacity: 1, y: 0 } : false}
            transition={{
              duration: 0.3,
              delay: index * 0.1,
            }}
            onAnimationComplete={() => {
              if (index === jobsList.length - 1) {
                setHasAnimated(true);
              }
            }}
          >
            <JobCard job={job} />
          </motion.div>
        ))}
      </div>
    );
  };

  return (
    <div className="w-full mx-auto py-10">
      <div className="w-full grid grid-cols-1 xl:grid-cols-4 xl:gap-y-0 gap-y-10 xl:gap-x-10 gap-x-0">
        <motion.div
          className="md:col-span-1"
          initial={!hasAnimated ? { opacity: 0, x: -20 } : false}
          animate={!hasAnimated ? { opacity: 1, x: 0 } : false}
          transition={{ duration: 0.3 }}
        >
          <FilterCard />
        </motion.div>

        <div className="lg:col-span-3">
          <Tabs defaultValue="available" className="w-full">
            <div className="mb-6">
              <TabsList className="inline-flex h-10 items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800 p-1">
                <TabsTrigger
                  value="available"
                  className="data-[state=active]:bg-blue-500 data-[state=active]:text-white rounded-md px-6 py-2 text-sm font-medium transition-all"
                >
                  Available Jobs ({availableJobs?.length || 0})
                </TabsTrigger>
                <TabsTrigger
                  value="applied"
                  className="data-[state=active]:bg-green-500 data-[state=active]:text-white rounded-md px-6 py-2 text-sm font-medium transition-all"
                >
                  Applied Jobs ({appliedJobs?.length || 0})
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="available" className="mt-0">
              <JobsGrid jobsList={availableJobs} />
            </TabsContent>

            <TabsContent value="applied" className="mt-0">
              <JobsGrid jobsList={appliedJobs} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Jobs;