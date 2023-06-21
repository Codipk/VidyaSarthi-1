const cloudinary = require('cloudinary').v2



exports.uploadImageToCloudinary = async (file, folder, height, quality) => {

  const options = { folder };
  if (height) {
    options.height = height;
  }
  if (quality) {
    options.quality = quality;
  }
  options.resource_type = "auto";
  console.log(`Image Uploaded Successfully in ${folder}`);
  console.log("TempFilePath: ", file.tempFilePath);
  return await cloudinary.uploader.upload(file.tempFilePath, options);

}