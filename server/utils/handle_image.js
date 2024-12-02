const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const cloudinary_upload_image = async (image) => {
  try {
    const upload = await cloudinary.uploader.upload(image);
    return upload;
  } catch (error) {
    console.log(error);
  }
};

const remove_image_cloudinary = async (imageUrl) => {
  try {
    const removeImage = await cloudinary.uploader.destroy(
      imageUrl.split("/").pop().split(".")[0]
    );
    return removeImage;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  cloudinary_upload_image,
  remove_image_cloudinary,
};
