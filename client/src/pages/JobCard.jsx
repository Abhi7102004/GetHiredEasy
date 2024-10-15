import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Bookmark, IndianRupee, ChevronDown, ChevronUp } from "lucide-react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { DUMMY_PROFILE_URL } from "@/utils/constants";

const JobCard = ({ job }) => {
  
  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
  };
  
  const navigate = useNavigate();
  
  const formatDateDifference = (createdAt) => {
    if (!createdAt) return "";

    const now = moment();
    const jobCreatedAt = moment(createdAt);

    const months = now.diff(jobCreatedAt, "months");
    jobCreatedAt.add(months, "months");
    const days = now.diff(jobCreatedAt, "days");

    return `${months > 0 ? `${months} Month${months > 1 ? "s" : ""} ` : ""}${
      days >= 0 ? `${days} Day${days > 1 ? "s" : ""} ` : ""
    }Ago`;
  };

  return (
    <motion.div
      className="p-5 rounded-md shadow-xl bg-white dark:bg-gray-950/25 border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:shadow-2xl"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={cardVariants}
    >
      <div className="flex items-center justify-between">
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          {job ? formatDateDifference(job?.createdAt) : ""}
        </p>
        <Button 
          variant="outline" 
          className="rounded-full hover:bg-gray-100 dark:hover:bg-gray-800" 
          size="icon"
        >
          <Bookmark className="w-4 h-4" />
        </Button>
      </div>
      
      <div className="flex items-center gap-3 my-3">
        <Avatar className="w-12 h-12 border-2 border-gray-100 dark:border-gray-700">
          <AvatarImage src={job?.company?.logo || DUMMY_PROFILE_URL} />
        </Avatar>
        <div>
          <h3 className="text-black line-clamp-1 dark:text-white font-semibold">
            {job?.company?.name}
          </h3>
          <p className="text-gray-600 line-clamp-1 dark:text-gray-400 text-sm">
            {job?.location}
          </p>
        </div>
      </div>

      <div className="space-y-2">
        <h1 className="font-bold text-lg line-clamp-1 text-black dark:text-white">
          {job?.title}
        </h1>
        <div className="relative">
          <p className={`text-sm text-gray-600 line-clamp-1 dark:text-gray-400`}>
            {job?.description}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center mt-4 gap-2">
        <Badge
          variant="ghost"
          className="px-2 py-1 font-medium text-blue-800 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/30"
        >
          {job?.position} Positions
        </Badge>
        <Badge 
          className="text-[#F53982] px-2 py-1 font-medium bg-pink-50 dark:bg-pink-950/30" 
          variant="ghost"
        >
          {job?.jobType}
        </Badge>
        <Badge
          variant="ghost"
          className="px-2 py-1 font-medium text-violet-800 dark:text-violet-300 bg-violet-50 dark:bg-violet-950/30 flex items-center gap-1"
        >
          <IndianRupee className="w-3 h-3" />
          <span>{job?.salary}</span>
        </Badge>
      </div>

      <div className="flex items-center gap-3 mt-4">
        <Button
          onClick={() => navigate(`/description/${job?._id}`)}
          variant="outline"
          className="text-black dark:text-white border-black dark:border-white hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          View Details
        </Button>
        <Button 
          className="bg-[#F72907] dark:bg-[#F53982] text-white hover:opacity-90 transition-opacity"
        >
          Save For Later
        </Button>
      </div>
    </motion.div>
  );
};

export default JobCard;