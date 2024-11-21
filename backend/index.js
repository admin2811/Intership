  const { default: mongoose } = require("mongoose");
  const connectDB  = require("./config/db")
  const express = require("express")
  const cors = require("cors"); 
  const streamRoutes = require('./routes/streamRoutes')
  //const ffmpegPath = require("@ffmpeg-installer/ffmpeg").path;
  //const ffmpeg = require("fluent-ffmpeg");
  //ffmpeg.setFfmpegPath(ffmpegPath);
  const { errorHandler } = require("./middlewares/error");
  require("dotenv").config();
  connectDB();
  const app = express();
  const PORT = process.env.PORT || 5000;  
  
  app.use(cors());
  app.use(express.json())
  app.use(cors({origin: "*"}))
  app.use(express.urlencoded({extended: true}))
  
  const cpuRoutes = require('./routes/cpuRoutes');
  app.use('/api/cpu', cpuRoutes);
  app.use("/api/auth", require("./routes/auth"));
  app.use('/api/streams', streamRoutes);
  app.use(errorHandler);

  //Defined
/*const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
    },
  })
  const upload = multer({ storage: storage });

app.post('/api/upload',upload.single('video') ,(req, res) => {
      if(!req.file) {
        return res.status(400).json({message: "No file uploaded"})
      }
      const streamKey = req.body.key;
        if (!streamKey) {
          return res.status(400).json({ message: 'Stream key is required.' });
      }
      const videoPath = path.join(__dirname, req.file.path);
      const rtmpUrl = `rtmp://localhost:1935/live/${streamKey}`;
      ffmpeg(videoPath)
        .output(rtmpUrl)
        .outputOption([
          '-c:v libx264',
          '-preset veryfast',
          '-f flv'
        ])
        .inputOptions(['-re'])
        .on('start', () => {
          console.log(`FFmpeg started with stream key: ${streamKey}`);
          console.log(`Video path: ${videoPath}`);
        })
        .on('stderr', (stderrLine) => {
          console.log('Stderr output: ' + stderrLine);
        })
        .on('error', (err) => {
          console.error('An error occurred: ' + err.message);
          res.status(500).json({ message: 'An error occurred.' });
        })
        .on('end', () => {
          console.log('FFmpeg has finished streaming.');
          res.status(200).json({ message: 'Stream ended.' });
        })
        .run();
  })
*/

  if(require.main == module){
    const server = app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    })

    process.on("unhandledRejection", (err, promise) => {
      console.log(`Logged Error: ${err}`);
      server.close(() => process.exit(1));
    });
    
  }
  module.exports = app;