import multer from 'multer';
import path from 'path';
// import {} from '../../../client/uni/public/images'
const fs = require('fs-extra');
// Define the storage configuration
const storage = multer.diskStorage({
  destination: async function (req, file, cb) {
    const id = req.params.id; // Assuming the id is passed as a URL parameter
    const uploadPath = path.resolve(__dirname, '../../../client/uni/public/images');

    console.log(uploadPath)
    try {
      await fs.ensureDir(uploadPath); // Ensure the directory exists
      cb(null, uploadPath);
      // console.log(uploadPath)
    } catch (err) {
      console.error('Failed to create directory', err);
      // cb(err);
    }
  },
  filename: function (req, file, cb) {
    const id = req.params.id
    const fileExtension = path.extname(file.originalname);
    cb(null, `${id}.png`);
  }
});

// Create the multer instance with the storage configuration
export const upload = multer({ storage: storage });


