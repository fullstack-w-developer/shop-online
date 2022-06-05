import User from "../../model/user";
import jwt from "jsonwebtoken";
import connectDb from "../../utils/connectDB";
import { createAccessToken } from "../../utils/generateToken";

connectDb();

export default async (req: any, res: any) => {
  try {
    const rf_token = req.cookies.refreshtoken;

    if (!rf_token)
      return res
        .status(400)
        .json({ err: "Please login now!" });
    const result: any = jwt.verify(
      rf_token,
      // @ts-ignore
      process.env.REFRESH_TOKEN_SECRET
    );
    if (!result)
      return res.status(400).json({
        err: "Your token is incorrect or has expired.",
      });

    const user = await User.findById(result.id);
    if (!user)
      return res
        .status(400)
        .json({ err: "User does not exist." });

    const access_token = createAccessToken({
      id: user._id,
    });
    res.json({
      user: {
        access_token,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err: any) {
    return res.status(500).json({ err: err.message });
  }
};
