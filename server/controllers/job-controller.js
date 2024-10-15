import JobModel from "../models/job-model.js";
import { parseSalaryFilter } from "../utils/constants/parseSalaryFilter.js";

export const PostJob = async (req, res) => {
  try {
    const {
      title,
      description,
      requirements,
      experience,
      salary,
      location,
      jobType,
      position,
      companyId,
    } = req.body;
    const userId = req.userId;
    if (
      !title ||
      !experience ||
      !description ||
      !requirements ||
      !salary ||
      !location ||
      !jobType ||
      !position ||
      !companyId
    ) {
      return res.status(400).json({
        message: "Please fill in all required fields.",
        success: false,
      });
    }
    if (isNaN(salary) || salary <= 0) {
      return res
        .status(400)
        .json({ message: "Please provide a valid salary.", success: false });
    }
    const job = await JobModel.create({
      title,
      description,
      requirements: requirements.split(","),
      salary: Number(salary),
      experienceLevel: experience,
      location,
      jobType,
      position,
      company: companyId,
      createdBy: userId,
    });
    return res.status(201).json({
      message: "New Job Created Successfully",
      job,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
export const getAllJobs = async (req, res) => {
  try {
    const keyword = req.query.keyword || "";
    const query = {
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    };
    const jobs = await JobModel.find(query)
      .populate({
        path: "company",
      })
      .sort({ createdAt: -1 });
    if (!jobs) {
      return res.status(404).json({
        message: "No Job Found",
        success: false,
      });
    }
    return res.status(200).json({
      jobs,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
export const getJobById = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await JobModel.findById(jobId).populate({
      path: "applications",
    });
    if (!job) {
      return res.status(404).json({
        message: "No Job Found",
        success: false,
      });
    }
    return res.status(200).json({
      job,
      success: true,
    });
  } catch (error) {
    console.log(error.message);
  }
};
export const getAdminJobs = async (req, res) => {
  try {
    const adminId = req.userId;
    const jobs = await JobModel.find({ createdBy: adminId }).populate({
      path: "company",
    });
    if (!jobs) {
      return res.status(404).json({
        message: "No Job Found",
        success: false,
      });
    }
    return res.status(200).json({
      jobs,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
export const filterJobs = async (req, res) => {
  try {
    const { titleList, salary, location, jobType, experienceLevel } = req.body;
    const filter = {};
    if (titleList && Array.isArray(titleList) && titleList.length > 0) {
      filter.title = {
        $regex: titleList.map(title => `(?=.*${title})`).join(''),
        $options: 'i'
      };
    }
    if (salary && typeof salary === "string") {
      const salaryFilter = parseSalaryFilter(salary);
      console.log(salaryFilter)
      if (salaryFilter) {
        filter.salary = salaryFilter;
      }
    }
    if (location && typeof location === "string") {
      filter.location = { $regex: new RegExp(location, "i") }; 
    }
    if (jobType && typeof jobType === "string") {
      filter.jobType = { $regex: new RegExp(jobType, "i") }; 
    }
    if (experienceLevel && !isNaN(Number(experienceLevel))) {
      filter.experienceLevel = { $gte: Number(experienceLevel) };
    }
    const jobs = await JobModel.find(filter);

    res.status(200).json({
      success: true,
      jobs,
    });
  } catch (error) {
    console.log(error);
  }
};
