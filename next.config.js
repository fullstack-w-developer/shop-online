/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  env: {
    MONGO_URi:
      "mongodb+srv://admin:m1a2h3d4i5@cluster0.gy9ht.mongodb.net/shops?retryWrites=true&w=majority",
    BASE_Url: "http://localhost:3000",
    ACCESS_TOKEN_SECRET:"uhcuyfgwiydff4873iykr87fhuiaalh849ur984yrfhuyg3",
    REFRESH_TOKEN_SECRET:"jkfe3r7fyhcbuyjsgx87wuf3qaw0x8fhx7rcfgf6c7fgcbcg8545bf7"
  },
  images: {
    domains: [
      "dkstatics-public.digikala.com",
    ],
  },
};
