import connectDb from "../../../utils/connectDB";
import Product from "./../../../model/ProductModel";
connectDb();

export default async (req: any, res: any) => {
  switch (req.method) {
    case "GET":
      await getAllProducts(req, res);
      break;
  }
};

const getAllProducts = async (req: any, res: any) => {
  try {
    const products = await Product.find();
   return res.json({ msg: "success", products });

   
  } catch (error: any) {
    return res.json(error.message);
  }
};
