import ApplicationModel from "../models/application-model.js";
import JobModel from "../models/job-model.js";
import { sendEmail } from "../config/nodemailer.js";
import UserModel from "../models/user-model.js";
export const applyJob = async (req, res) => {
  try {
    const userId = req.userId;
    const jobId = req.params.id;
    const user = await UserModel.findById(userId);
    if (!jobId) {
      return res.status(400).json({
        message: "Job Id is required",
        success: false,
      });
    }
    const job = await JobModel.findById(jobId).populate({
      path:'company'
    });
    if (!job) {
      return res.status(400).json({
        message: "Job not found",
        success: false,
      });
    }
    const existingApplication = await ApplicationModel.findOne({
      job: jobId,
      applicant: userId,
    });
    if (existingApplication) {
      return res.status(400).json({
        message: "User has already applied for this job",
        success: false,
      });
    }
    const newApplication = await ApplicationModel.create({
      job: jobId,
      applicant: userId,
    });
    job.applications.push(newApplication._id);
    await job.save();
    try {
        sendEmail(
        user.email,
        "Your Job Application Confirmation - Thank You for Applying!",
        `Dear ${user.fullName},
    
    We are pleased to inform you that your application for the position of "${job.title}" has been successfully received.
    
    Our team will review your application shortly. You will be contacted if your profile matches our requirements for the next steps in the process.
    
    Thank you for choosing our platform to explore exciting job opportunities.
    
    Best regards,
    ${job?.company?.name} Team
    `
      );
    } catch (emailError) {
      console.error("Email sending failed:", emailError);
    }

    return res.status(200).json({
      message: "Job Applied Successfully",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error", success: false });
  }
};

export const getAppliedJobs = async (req, res) => {
  try {
    const userId = req.userId;
    const application = await ApplicationModel.find({
      applicant: userId,
    }).populate({
      path: "job",
      options: { sort: { createdAt: -1 } },
      populate: {
        path: "company",
        options: { sort: { createdAt: -1 } },
      },
    });
    if (!application.length) {
      return res.status(400).json({
        message: "No applications.",
        success: false,
      });
    }
    return res.status(200).json({
      application,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error", success: false });
  }
};

export const getApplicants = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await JobModel.findById(jobId).populate({
      path: "applications",
      options: { sort: { createdAt: -1 } },
      populate: {
        path: "applicant",
      },
    });
    if (!job) {
      return res.status(400).json({
        message: "Job not found.",
        success: false,
      });
    }
    return res.status(200).json({
      job,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error", success: false });
  }
};

export const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const applicationId = req.params.id;
    
    if (!status) {
      return res.status(400).json({
        message: "Status is required",
        success: false,
      });
    }
    const application = await ApplicationModel.findById(applicationId)
      .populate({
        path: 'job',   
        populate: {
          path: 'company', 
        },
      })
      .populate('applicant'); 

    if (!application) {
      return res.status(404).json({
        message: "Application not found",
        success: false,
      });
    }
    application.status = status.toLowerCase();  
    await application.save();
    let subject, textMessage;

    if (status.toLowerCase() === 'accepted') {
      subject = "Job Application Accepted";
      textMessage = `Dear ${application.applicant.fullName},\nCongratulations! Your application for the position of ${application.job.title} at ${application.job.company.name} has been accepted. We look forward to working with you.\nBest regards,\n${application.job.company.name} Team`;
    } else if (status.toLowerCase() === 'rejected') {
      subject = "Job Application Rejected";
      textMessage = `Dear ${application.applicant.fullName},\nWe regret to inform you that your application for the position of ${application.job.title} at ${application.job.company.name} has been rejected. We appreciate your interest in our company and encourage you to apply for future openings.\nBest regards,\n${application.job.company.name} Team`;
    } else {
      return res.status(400).json({
        message: "Invalid status. Only 'accepted' or 'rejected' statuses are allowed.",
        success: false,
      });
    }
    try {
      sendEmail(application.applicant.email,subject,textMessage);
    } catch (error) {
      console.log(error)
    }
    
    return res.status(200).json({
      message: "Status updated Successfully",
      success: true,
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error", success: false });
  }
};

