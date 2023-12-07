import multer from "multer";
import path from 'path';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadsPath = path.join(process.cwd(), 'uploads'); // Use process.cwd() to get the current working directory
    cb(null, uploadsPath);
  },
  filename: (req, file, cb) => {
    const filename = `${Date.now()}-${file.originalname}`;
    cb(null, filename);
  },
});

const uploadPicture = multer({
  storage: storage,
  limits: {
    fileSize: 15 * 1000000 //8MB
  },
  fileFilter: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    if(ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg'){
      return cb(new Error('Only images are allowed'));
    }
    cb(null,true);
  },
});

export { uploadPicture };
