import mongoose from "mongoose";
const connectDb = async () => {
  if (mongoose.connections[0].readyState) {
    console.log("alreadt connected");
  }
  mongoose
    // @ts-ignore
    .connect(
      " mongodb+srv://admin:m1a2h3d4i5@cluster0.gy9ht.mongodb.net/shops?retryWrites=true&w=majority"
    )
    .then(() => {
      console.log("connected DB");
    })
    .catch((err: any) => {
      console.log(err.message);
    });
};

export default connectDb;
