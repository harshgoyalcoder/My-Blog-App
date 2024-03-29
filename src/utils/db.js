import mongoose from "mongoose";

const connect = async () => {
  try {
    mongoose.set('strictQuery', false);
    await mongoose.connect(process.env.MONGO || "");
  } catch (error) {
    throw new Error("Mongo Connection failed!");
  }
};

export default connect;