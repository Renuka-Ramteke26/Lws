import { v2 as cloudinary } from 'cloudinary';

const connectCloudinary = async () => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY.trim(),   // use .trim() for safety
    api_secret: process.env.CLOUDINARY_SECRET_KEY.trim()
  });
  console.log("✅ Cloudinary connected");
};

export default connectCloudinary;
