const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../public/uploads/'));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Hàm xử lý tải lên video
const uploadVideo = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No video file uploaded' });
  }

  const streamKey = req.body.streamKey; // Nhận dữ liệu khác nếu cần
  console.log('Received video:', req.file.filename);
  console.log('Stream key:', streamKey);
  const fileUrl = `http://localhost:5000/uploads/${req.file.filename}`;
  res.status(200).json({ message: 'Video uploaded successfully', fileName: req.file.filename, fileUrl });
};

module.exports = {
  upload,
  uploadVideo,
};