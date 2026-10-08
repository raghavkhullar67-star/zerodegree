import mongoose from "mongoose"; // 'require' ki jagah 'import'

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log(`MongoDB Connected: ${conn.connection.host} ✅`);
  } catch (error) {
    console.error(`MongoDB Atlas Error: ${error.message}`);
    try {
      console.log("Attempting local MongoDB connection...");
      const conn = await mongoose.connect("mongodb://127.0.0.1:27017/zero_degree", {
        serverSelectionTimeoutMS: 3000,
      });
      console.log(`Local MongoDB Connected: ${conn.connection.host} ✅`);
    } catch (localErr) {
      console.error(`Local MongoDB unavailable: ${localErr.message}`);
      console.log("⚠️ Backend running with fallback handlers...");
    }
  }
};

// 'module.exports' ki jagah 'export default'
export default connectDB;