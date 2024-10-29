import mongoose from "mongoose";
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log('mongoDb connected')
  } catch (err) {
    console.log("Database Connection Failed", err.message);
  }
};
export default connectDB