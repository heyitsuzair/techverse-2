const cloudinary = require('../config/cloudinary');

const uploadToCloudinary = async (file, options = {}) => {
    try {
        const uploadOptions = {
            resource_type: "image",
            allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'webp'],
            ...options
        };

        if (file.buffer) {
            return await new Promise((resolve, reject) => {
                cloudinary.uploader.upload_stream(
                    uploadOptions,
                    (error, result) => {
                        if (error) reject(error);
                        resolve(result);
                    }
                ).end(file.buffer);
            });
        }

        const result = await cloudinary.uploader.upload(
            file.path || file,
            uploadOptions
        );

        return {
            public_id: result.public_id,
            url: result.secure_url,
            format: result.format,
            width: result.width,
            height: result.height,
            created_at: result.created_at,
            bytes: result.bytes,
            folder: result.folder
        };

    } catch (error) {
        throw new Error(`Error uploading to Cloudinary: ${error.message}`);
    }
};

module.exports = uploadToCloudinary;