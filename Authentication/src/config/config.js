import dotenv from "dotenv";
dotenv.config();

if(!process.env.MONGO_URI){
  throw new Error("MONGO_URI is not defined in the environment variables");
}
if(!process.env.REFRESH_TOKEN_SECRET){
  throw new Error("REFRESH_TOKEN_SECRET is not defined in the environment variables");
}
if(!process.env.ACCESS_TOKEN_SECRET){
  throw new Error("ACCESS_TOKEN_SECRET is not defined in the environment variables");
}
if(!process.env.PORT){
  throw new Error("PORT is not defined in the environment variables");
}

const config = {
  MONGO_URI: process.env.MONGO_URI,
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
  PORT: process.env.PORT,
};

export default config;
