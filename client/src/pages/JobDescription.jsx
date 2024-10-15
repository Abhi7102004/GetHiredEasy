import React, { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  MapPin,
  Briefcase,
  DollarSign,
  Users,
  IndianRupee,
  Loader2,
} from "lucide-react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { apiClient } from "@/lib/apiClient";
import { APPLY_JOB_ROUTE, GET_SINGLE_JOB_ROUTE } from "@/utils/constants";
import { setSingleJob } from "@/store/slices/jobSlice";
import moment from "moment";
import { toast } from "sonner";

const JobDescription = () => {
  const { jobId } = useParams();
  const { user } = useSelector((store) => store.auth);
  const { singleJob } = useSelector((store) => store.job);
  const [isLoading, setIsLoading] = useState(false);
  const isIntiallyApplied =
    singleJob?.applications?.filter(
      (application) => application?.applicant === user?._id
    ) || false;
  // console.log(isIntiallyApplied);
  const [isApplied, setIsApplied] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    const getSingleJob = async () => {
      try {
        const response = await apiClient.get(
          `${GET_SINGLE_JOB_ROUTE}/${jobId}`,
          { withCredentials: true }
        );
        if (response.data.success) {
          dispatch(setSingleJob(response.data.job));
          setIsApplied(
            response.data.job.applications?.some(
              (id) => id?.applicant === user?._id
            )
          );
        }
      } catch (error) {
        console.error("Error fetching job:", error);
      }
    };
    if (jobId) {
      getSingleJob();
    }
  }, [jobId, dispatch, user?._id]);
  const handleApply = async () => {
    setIsLoading(true);
    try {
      const response = await apiClient.post(
        `${APPLY_JOB_ROUTE}/${singleJob._id}`,
        {
          withCredentials: true,
        }
      );
      if (response.data.success) {
        setIsApplied(true);
        const updatedJobDescription = {
          ...singleJob,
          applications: [...singleJob.applications, { applicant: user?._id }],
        };
        dispatch(setSingleJob(updatedJobDescription));
        toast.success(response.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        mass: 1,
        delayChildren: 0.3,
        staggerChildren: 0.1,
      },
    },
    exit: { opacity: 0, y: -50, transition: { duration: 0.5 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };
  if (!singleJob) return <div>Loading...</div>;
  return (
    <AnimatePresence>
      <motion.div
        className="w-full mx-auto my-10 p-8 rounded-xl shadow-2xl bg-white dark:bg-gray-900 transition-colors duration-300"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <motion.div
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-8"
          variants={itemVariants}
        >
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              {singleJob?.title}
            </h1>
            <div className="flex flex-wrap items-center mt-4 gap-3 text-sm">
              <Badge
                variant="ghost"
                className="px-2 py-1 font-bold text-blue-800 dark:text-blue-300"
              >
                {singleJob?.position} Positions
              </Badge>
              <Badge
                className="text-[#F53982] px-2 py-1 font-bold"
                variant="ghost"
              >
                {singleJob?.jobType}
              </Badge>
              <Badge
                variant="ghost"
                className="px-2 py-1 font-bold  text-violet-800  dark:text-violet-300 flex items-center gap-1"
              >
                <IndianRupee className="w-3 h-3" />
                <span>{singleJob?.salary}</span>
              </Badge>
            </div>
          </div>

          <Button
            onClick={handleApply}
            disabled={isApplied}
            className={`${
              isApplied
                ? "bg-gray-700 dark:bg-white text-white dark:text-black cursor-not-allowed"
                : "bg-violet-500 hover:bg-violet-600 dark:bg-violet-600 dark:hover:bg-violet-700"
            } text-white font-bold py-3 px-6 rounded-full transition-colors duration-300 text-lg`}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Processing your application...
              </div>
            ) : isApplied ? (
              "Already Applied"
            ) : (
              "Apply now"
            )}
          </Button>
        </motion.div>

        <motion.div
          className="space-y-6 text-gray-700 dark:text-gray-300"
          variants={itemVariants}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <motion.div
              className="flex items-center space-x-3"
              variants={itemVariants}
            >
              <MapPin className="w-6 h-6 text-violet-500" />
              <p>
                <span className="font-semibold">Location:</span>{" "}
                {singleJob?.location}
              </p>
            </motion.div>
            <motion.div
              className="flex items-center space-x-3"
              variants={itemVariants}
            >
              <Briefcase className="w-6 h-6 text-violet-500" />
              <p>
                <span className="font-semibold">Experience:</span>{" "}
                {singleJob?.experienceLevel} years
              </p>
            </motion.div>
            <motion.div
              className="flex items-center space-x-3"
              variants={itemVariants}
            >
              <DollarSign className="w-6 h-6 text-violet-500" />
              <p>
                <span className="font-semibold">Salary:</span>{" "}
                {singleJob?.salary}
              </p>
            </motion.div>
            <motion.div
              className="flex items-center space-x-3"
              variants={itemVariants}
            >
              <Users className="w-6 h-6 text-violet-500" />
              <p>
                <span className="font-semibold">Total Applicants:</span>{" "}
                {singleJob?.applications.length}
              </p>
            </motion.div>
            <motion.div
              className="flex items-center space-x-3"
              variants={itemVariants}
            >
              <Calendar className="w-6 h-6 text-violet-500" />
              <p>
                <span className="font-semibold">Posted Date:</span>{" "}
                {moment(singleJob?.createdAt).format("YYYY-MM-DD")}
              </p>
            </motion.div>
          </div>
          <motion.div variants={itemVariants}>
            <h2 className="text-2xl font-semibold mb-3 text-gray-900 dark:text-white">
              Job Description
            </h2>
            <p className="leading-relaxed">{singleJob?.description}</p>
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default JobDescription;
