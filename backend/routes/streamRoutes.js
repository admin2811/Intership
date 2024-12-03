const express = require("express");
const multer = require('multer')
const { createStream, getAllStreamByUser, startStream, getStreamStatus , getStreamInfomation, sseStream, createLive} = require("../controllers/streamController");
const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/create", (req, res, next) => {
    console.log("File:", req.file); // Log file nhận đượcs
    console.log("Body:", req.body); // Log body
    next();
  }, upload.single('video'), createStream);

router.get("/user_streams/:userId", getAllStreamByUser)
router.post("/watch_stream", startStream)
router.post("/create_live",(req, res, next) => {
  console.log("File:", req.file); // Log file nhận được
  console.log("Body:", req.body); // Log body
  next();
}, upload.single('video'), createLive)
router.get("/status", getStreamStatus);
router.get("/streamInfo",getStreamInfomation)
router.get('/sse-stream', sseStream);
module.exports = router