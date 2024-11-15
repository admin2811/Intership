const express = require('express');
const router = express.Router();
const { upload, uploadVideo } = require('../controllers/streamController');

router.post('/start-streams', upload.single('video'), uploadVideo);

module.exports = router;
