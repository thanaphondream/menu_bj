import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: 'daw1e3jbg',
  api_key: '767921645967569',
  api_secret: 'OvwF5cRLojuZ1hK2fgVlpME4wzU'
});

const CloudUpload = (fileBuffer: Buffer, fileName: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: 'MenuItem', public_id: fileName },
      (error, result) => {
        if (error) {
          console.error('Cloudinary upload error:', error);
          reject(error);
        } else if (result) {
          resolve(result.secure_url);
        }
      }
    );
    
    uploadStream.end(fileBuffer);
  });
};

export default CloudUpload;
