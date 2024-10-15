import CompanyModel from "../models/company-model.js";
import cloudinary from "../utils/cloudinary.js";
import getDataUri from "../utils/dataURI.js";
export const RegisterCompany = async (req, res) => {
  try {
    const { companyName } = req.body;
    if (!companyName) {
      return res.status(401).json({
        message: "Company name is required",
        success: false,
      });
    }
    let company = await CompanyModel.findOne({ name: companyName });
    if (company) {
      return res.status(401).json({
        message: "You can't register same company again",
        success: false,
      });
    }
    company = await CompanyModel.create({
      name: companyName,
      userId: req.userId,
    });
    return res.status(201).json({
      message: `${companyName} registered successfully.`,
      company,
      success: true,
    });
  } catch (err) {
    console.log(err);
  }
};
export const getCompany = async (req, res) => {
  try {
    const userId = req.userId;
    const companies = await CompanyModel.find({ userId });
    if (!companies) {
      return res.status(404).json({
        message: "No companies Found",
        success: false,
      });
    }
    return res.status(200).json({
      companies,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
export const getCompanyById = async (req, res) => {
  try {
    const companyName = req.params.id;
    const company = await CompanyModel.findById(companyName);
    if (!company) {
      return res.status(404).json({
        message: "Company not Found",
        success: false,
      });
    }
    return res.status(200).json({
      company,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
export const updateCompanyById = async (req, res) => {
  try {
    const { name, description, website, location } = req.body;
    // console.log(req);
    const file=req.file;
    // console.log(file)
    let logo_url;
    if(file){
      const fileUri=getDataUri(file);
      const logoContent=await cloudinary.uploader.upload(fileUri.content);
      logo_url=logoContent.secure_url;
    }
    // console.log(logo_url)
    const updateData = { name, description, website, location,logo:logo_url };
    const company = await CompanyModel.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );
    if (!company) {
      return res.status(404).json({
        message: "Company not Found",
        success: false,
      });
    }
    return res.status(200).json({
      message:"Company information updated",
      company,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
