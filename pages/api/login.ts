import {
  createAccessToken,
  createRefreshToken,
} from "./../../utils/generateToken";
import connectDb from "../../utils/connectDB";
import User from "../../model/user";
import bcrypt from "bcrypt";
import cors from "cors";

const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}

connectDb();
export default async (req: any, res: any) => {
  switch (req.method) {
    case "POST":
      await Login(req, res);
      break;
  }
};

const Login = async (req: any, res: any) => {
  try {
    await cors(corsOptions)
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user)
      return res
        .status(400)
        .json({ err: "this email is not exists" });

    const match = await bcrypt.compare(
      password,
      user.password
    );

    if (!match)
      return res
        .status(400)
        .json({ err: "email or password is incorrect" });

    const create_access_token = await createAccessToken({
      id: user._id,
    });
    const refresh_token = await createRefreshToken({
      id: user._id,
    });

    res.status(200).json({
      msg: "login successful",
      user: {
        access_token: create_access_token,
        refresh_token,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error: any) {
    res.status(500).json({ err: error.message });
  }
};
