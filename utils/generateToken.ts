import jwt from "jsonwebtoken";

export const createAccessToken = (payload: any) => {
  // @ts-ignore
  return jwt.sign(
    payload,
    "uhcuyfgwiydff4873iykr87fhuiaalh849ur984yrfhuyg3",
    { expiresIn: "15m" }
  );
};

export const createRefreshToken = (payload: any) => {
  // @ts-ignore
  return jwt.sign(
    payload,
    "jkfe3r7fyhcbuyjsgx87wuf3qaw0x8fhx7rcfgf6c7fgcbcg8545bf7",
    { expiresIn: "7d" }
  );
};
