const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
require('dotenv').config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: async (req, file) => {
        return {
            folder: "freelance_submissions",
            resource_type: file.mimetype.startsWith("video") ? "video" : "auto",
            public_id: `${Date.now()}_${file.originalname}`
        };
    }
});

const upload = multer({ storage });

module.exports = upload;