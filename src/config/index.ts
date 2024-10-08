import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

const _config = {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  cors_origin: process.env.CORS_ORIGIN,
  mongo_uri: process.env.MONGO_CONNECTION_STRING,
  CLOUDINARY: {
    API_KEY: process.env.CLOUDINARY_API_KEY,
    API_SECRET: process.env.CLOUDINARY_API_SECRET,
    CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
  },
};

export const config = Object.freeze(_config);
