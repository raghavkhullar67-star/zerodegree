import mongoose from "mongoose"; // 'require' ki jagah 'import'

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host} ✅`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

// 'module.exports' ki jagah 'export default'
export default connectDB;