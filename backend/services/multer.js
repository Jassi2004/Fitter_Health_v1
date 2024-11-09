const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let folderPath = path.join('uploads');

    if (req.baseUrl.includes('/profile')) {
      folderPath = path.join('uploads', 'profile');
    } else if (req.baseUrl.includes('/post')) {
      if (file.mimetype.startsWith('image')) {
        folderPath = path.join('uploads', 'posts', 'images');
      } else if (file.mimetype.startsWith('video')) {
        folderPath = path.join('uploads', 'posts', 'videos');
      }
    }

    cb(null, folderPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image') || file.mimetype.startsWith('video')) {
    cb(null, true);
  } else {
    cb(new Error('Only images and videos are allowed'), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 1024 * 1024 * 50 } // 50 MB
});

module.exports = upload;  // Export upload middleware
