import mongoose from "mongoose";
const connectDb = async () => {
  if (mongoose.connections[0].readyState) {
    console.log("alreadt connected");
  }
  mongoose
  // @ts-ignore
    .connect(process.env.MONGO_URi)
    .then(() => {
      console.log("connected DB");
    })
    .catch((err: any) => {
      console.log(err.message);
    });
};

export default connectDb;
