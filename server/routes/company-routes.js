import express from "express";

import isAuthenticated from "../middleware/auth-middleware.js";
import {
  getCompany,
  getCompanyById,
  RegisterCompany,
  updateCompanyById,
} from "../controllers/company-controller.js";
import { singleUpload } from "../middleware/multer.js";
const Router = express.Router();
Router.post("/register", isAuthenticated, RegisterCompany);
Router.get("/get", isAuthenticated, getCompany);
Router.get("/get/:id", isAuthenticated, getCompanyById);
Router.put("/update/:id", isAuthenticated,singleUpload,updateCompanyById);

export default Router;
