import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user-routes.js";
import companyRoute from "./routes/company-routes.js";
import jobRoute from "./routes/job-routes.js";
import applicationRoute from "./routes/application-route.js";

const app = express();
// import path from "path";
dotenv.config();
const PORT = process.env.PORT || 3000;
// const _dirname=path.resolve();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const corsOption = {
  origin: "https://get-hired-easy-v01.vercel.app/",
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
};

app.use(cors(corsOption));

app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);
app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});

// "dev": "nodemon server/app.js"
// "build": "npm install && npm install --prefix client && npm run build --prefix client"
// "start": "nodemon server/app.js"
