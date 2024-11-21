const express = require("express");
const multer = require('multer')
const { createStream, getAllStreamByUser } = require("../controllers/streamController");
const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/create", (req, res, next) => {
    console.log("File:", req.file); // Log file nhận được
    console.log("Body:", req.body); // Log body
    next();
  }, upload.single('video'), createStream);

router.get("/user_streams/:userId", getAllStreamByUser)

module.exports = router