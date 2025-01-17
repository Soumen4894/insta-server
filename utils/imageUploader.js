// const cloudinary = require('cloudinary').v2
// const path = require("path")
// const photo = "./aikatan.jpeg"

// exports.uploadImageToCloudinary  = async (file, folder, height, quality) => {
//     // const options = {folder};
//     // if(height) {
//     //     options.height = height;
//     // }
//     // if(quality) {
//     //     options.quality = quality;
//     // }
//     // options.resource_type = "auto";
//     // console.log(options)

//     // return await cloudinary.uploader.upload(file.tempFilePath, options);
//     try {
//         // return await cloudinary.v2.uploader.upload(file.tempFilePath, options); 
//         // const result = await cloudinary.uploader.upload(photo)
//         // console.log(result)
//         return await cloudinary.uploader.upload(photo)

//     } catch (error) {
//         throw new Error(`Cloudinary upload failed: ${error.message}`);
//     }
// }