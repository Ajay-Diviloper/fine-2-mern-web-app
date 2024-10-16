import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import dotenv from 'dotenv';

dotenv.config();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "dcix3tvet",
  api_key: process.env.CLOUDINARY_API_KEY || "828759836311742",
  api_secret: process.env.CLOUDINARY_API_SECRET || "NM4Hpmr_purIdM2HGlrES3OR0BA",
});

// Set up Cloudinary storage for Multer
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'uploads',  // Folder in Cloudinary where the images will be uploaded
    allowedFormats: ['jpeg', 'png', 'jpg'],  // Allowed image formats
    public_id: (req, file) => file.originalname,  // Use original file name in Cloudinary
  },
});

const cloudnaryfileuploader = multer({ storage });

export default cloudnaryfileuploader;
