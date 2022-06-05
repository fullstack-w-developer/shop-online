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
      const {id}  = req.query
    const product = await Product.findById(id);
   return res.json({ msg: "success", product });

   
  } catch (error: any) {
    return console.log(error.message);
  }
};
