import React from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { IndianRupee } from "lucide-react";

const LatestJobTrends = ({ job }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.3 }}
      className="p-6 rounded-xl shadow-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 cursor-pointer transition-all duration-300 ease-in-out hover:shadow-xl dark:hover:shadow-gray-700/50 hover:scale-105"
    >
      {/* Company and Location */}
      <div className="mb-4 flex justify-between items-start">
        <div>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">{job?.company?.name}</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">{job?.location}</p>
        </div>
        <Badge className="text-sm font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
          {job?.jobType}
        </Badge>
      </div>

      {/* Job Title and Description */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">{job?.title}</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3">{job?.description}</p>
      </div>

      {/* Job Details */}
      <div className="flex flex-wrap items-center gap-3 text-sm">
        <Badge className="px-2 py-1 font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
          {job?.position} Positions
        </Badge>
        <Badge className="px-2 py-1 font-medium bg-violet-100 text-violet-800 dark:bg-violet-900 dark:text-violet-300 flex items-center gap-1">
          <IndianRupee className="w-3 h-3" />
          <span>{job?.salary}</span>
        </Badge>
      </div>
    </motion.div>
  );
};

export default LatestJobTrends;