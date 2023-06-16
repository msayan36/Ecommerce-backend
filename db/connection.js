import mongoose from "mongoose";

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "ecommerceDB",
    });
    console.log("Database Connected Successfully");
  } catch (error) {
    console.log(error);
  }
};

export default connect;
