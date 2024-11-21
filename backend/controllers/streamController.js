const Stream = require('../models/Stream');
const cloudinary = require('../config/cloudinary');
const mongoose = require('mongoose');
exports.createStream = async (req, res) => {
  try{
    console.log("File received:", req.file);  // Log file nhận được từ Multer
    console.log("Request body:", req.body); 
    const { userId, name, key } = req.body;
    if (!userId || !key || !name) {
      return res.status(400).json({ message: "Missing required fields (userId, key)." });
    }
    if(!req.file || !req.file.buffer){
      return res.status(400).json({ message: "No video Upload" })
    }

    const existingStream = await Stream.findOne({ userId, key });
    if (existingStream) {
      return res.status(400).json({ message: "Stream key already exists." });
    }

    const result = await cloudinary.uploader.upload_stream({resource_type : 'video'}, async (error, result) => {
      if (error) {
        console.error('Error uploadig to Cloudinary: ', error); 
        return res.status(500).json({ error: 'Error uploading to Cloudinary'});
      }
      //Lưu thông tin
        const stream = new Stream({
          userId: req.body.userId,
          name: req.body.name || "Untitled Stream",
          key: req.body.key,
          videoUrl: result.secure_url,
        });
        await stream.save();
        res.status(200).json({ message: "Stream created successfully"});
    }).end(req.file.buffer)
  }catch(error){
    console.error("Error creating stream: ", error);
    res.status(500).json({ error: "Internal server error"});
  }
};

exports.getAllStreamByUser = async (req, res) => {
  try {
    const { userId } = req.params; // Lấy userId từ route parameters

    // Kiểm tra tính hợp lệ của userId
    if (!userId) {
      return res.status(400).json({ error: 'Invalid or missing userId' });
    }

    // Chuyển đổi userId từ string sang ObjectId
    const objectId = new mongoose.Types.ObjectId(userId.trim());

    // Truy vấn dữ liệu từ MongoDB theo userId
    const streams = await Stream.find({ userId: objectId });

    // Trả kết quả về client
    if (streams.length === 0) {
      return res.status(404).json({ message: 'No streams found for this user.' });
    }

    return res.status(200).json({ data: streams });
  } catch (error) {
    console.error("Error in getAllStreamByUser:", error.message);
    return res.status(500).json({ error: 'An error occurred while fetching streams.' });
  }
};
