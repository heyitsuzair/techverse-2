import cloudinary from "../config/cloudinary";

const deleteFromCloudinary = async (publicIds, invalidateCache = true) => {
  try {
    const deleteOptions = {
      resource_type: "image",
      type: "upload",
      invalidate: invalidateCache,
    };

    if (typeof publicIds === "string") {
      const result = await cloudinary.uploader.destroy(
        publicIds,
        deleteOptions
      );
      return {
        public_id: publicIds,
        result: result.result,
      };
    }

    if (Array.isArray(publicIds)) {
      const results = await cloudinary.api.delete_resources(publicIds, {
        ...deleteOptions,
        resource_type: "image",
      });

      return {
        deleted: results.deleted,
        partial: results.partial,
        failed: results.failed,
      };
    }

    throw new Error(
      "Invalid input: publicIds must be a string or array of strings"
    );
  } catch (error) {
    throw new Error(`Error deleting from Cloudinary: ${error.message}`);
  }
};

export default deleteFromCloudinary;
