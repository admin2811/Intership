const Stream = require('../models/Stream');
const cloudinary = require('../config/cloudinary');
const axios = require('axios');
const { XMLParser } = require('fast-xml-parser');
const mongoose = require('mongoose');
const ffmpegPath = require("@ffmpeg-installer/ffmpeg").path;
const ffprobePath = require('@ffprobe-installer/ffprobe').path;
const ffmpeg = require("fluent-ffmpeg");
ffmpeg.setFfmpegPath(ffmpegPath);
ffmpeg.setFfprobePath(ffprobePath);
exports.createStream = async (req, res) => {
  try{
    console.log("File received:", req.file);
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
    const { userId } = req.params;
    if (!userId) {
      return res.status(400).json({ error: 'Invalid or missing userId' });
    }
    const objectId = new mongoose.Types.ObjectId(userId.trim());
    const streams = await Stream.find({ userId: objectId });
    if (streams.length === 0) {
      return res.status(404).json({ message: 'No streams found for this user.' });
    }
    return res.status(200).json({ data: streams });
  } catch (error) {
    console.error("Error in getAllStreamByUser:", error.message);
    return res.status(500).json({ error: 'An error occurred while fetching streams.' });
  }
};

// API để lấy trạng thái stream
exports.getStreamStatus = (req, res) => {
  const { key } = req.query;
  if (!key) {
    return res.status(400).json({ status: "error", message: "Stream key is required." });
  }
  const isStreaming = !!activeStreams[key];
  res.status(200).json({ status: "success", message: 'Stream is ended' ,isStreaming });
};

let activeStreams = {};
let clients = [];
let infoAudio = {}
exports.startStream = async (req, res) => {
  const { key, videoUrl, action } = req.body;
  infoAudio = await getAudioMetadata(videoUrl);
  console.log("Audio metadata:", infoAudio);
  console.log("Request body:", req.body);
  if (!key) {
    return res.status(400).json({ status: "error", message: "Stream key is required." });
  }
  if (action === 'start' && !videoUrl) {
    return res.status(400).json({ status: "error", message: "Video URL is required for starting the stream." });
  }
  try {
    if (action === "stop") {
      if (activeStreams[key]) { 
        activeStreams[key].kill('SIGKILL');
        delete activeStreams[key];
        clients.forEach(client => {
          const message = { message: `Stream ${key} ended.` };  // Đóng gói trong đối tượng JSON
          client.write(`data: ${JSON.stringify(message)}\n\n`);
        })
        return res.status(200).json({
          status: "success",
          message: `Stream ${key} stopped successfully.`,
          isStreaming: false, 
        });
      } else {
        return res.status(404).json({
          status: "error",
          message: `Stream ${key} is not active.`,
        });
      }
    }
    if (activeStreams[key]) {
      return res.status(400).json({
        status: "error",
        message: `Stream ${key} is already active.`,
        isStreaming: true,
      });
    }
    const rtmpUrl = `rtmp://localhost:1935/live/${key}`;
    const ffmpegProcess = ffmpeg(videoUrl)
      .output(rtmpUrl)
      .outputOption([
        '-c:v libx264',
        '-preset veryfast',
        '-f flv',
        '-s 1280x720'
      ])
      .inputOptions(['-re'])
      .on('start', () => {
        console.log(`Stream ${key} started.`);
      })
      .on('error', (err) => {
        console.error(`Error with stream ${key}:`, err.message);
        if (!res.headersSent) {
          res.status(500).json({
            status: "error",
            message: `Failed to start stream ${key}.`,
          });
        }
      })
      .on('stderr', (stderrLine) => {
        console.log(`Stderr output: ${stderrLine}`);
      })
      .on('end', () => {
        console.log(`Stream ${key} ended.`);
        delete activeStreams[key];
        clients.forEach(client => {
          const message = {
            key: key,
            message: `Stream ${key} ended.`,
            isStreaming: false, 
          };
          client.write(`data: ${JSON.stringify(message)}\n\n`);
        });
      });  
    ffmpegProcess.run();
    activeStreams[key] = ffmpegProcess;
    return res.status(200).json({
      status: "success",
      message: `Stream ${key} started.`,
      isStreaming: true,
    })

  } catch (error) {
    console.error("An error occurred:", error.message);
    if (!res.headersSent) {
      return res.status(500).json({
        status: "error",
        message: "An unexpected error occurred.",
      });
    }
  }
};


exports.sseStream = (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders();
  clients.push(res);
  req.on('close', () => {
    clients = clients.filter(client => client !== res);
  });
};


exports.getStreamInfomation = async (req, res) => {
  try {
    const streamInfo = await getStreamInfo();
    if (streamInfo.error) {
      return res.status(500).json({
        status: 'error',
        message: streamInfo.error,
      });
    }
    return res.status(200).json({
      status: 'success',
      data: streamInfo,
    });
  } catch (error) {
    console.error('Error in getStreamInfomation:', error.message);
    return res.status(500).json({
      status: 'error',
      message: 'Failed to fetch stream information.',
    });
  }
}
async function getStreamInfo() {
  try {
    const response = await axios.get('http://localhost:80/stat', {
      headers: { Accept: 'application/xml' },
    });
    const parser = new XMLParser();
    const jsonData = parser.parse(response.data);
    const server = jsonData['http-flv'].server;
    const bwin = jsonData['http-flv'].bw_in;
    const bwout = jsonData['http-flv'].bw_out;
    console.log('bwin:', bwin, 'bwout:', bwout);
    const applications = Array.isArray(server.application) ? server.application : [server.application];
    const liveApp = applications.find((app) => app.name === 'live');
    if (!liveApp) {
      return { status: 'error', message: 'Application "live" not found' };
    }
    const liveStreams = (Array.isArray(liveApp.live?.stream)
      ? liveApp.live.stream
      : liveApp.live?.stream
      ? [liveApp.live.stream]
      : []
    ).map((stream) => {
      const bwAudioBits = stream.bw_audio || 0; // bps
      const bwVideoBits = stream.bw_video || 0; // bps
      const bwInBits = bwin || 0; // bps
      const bwOutBits = bwout || 0; // bps
      const convertToReadableUnit = (bits) => {
        if (bits < 1000000) {
          return `${(bits / 1000).toFixed(2)} Kb/s`;
        } else {
          return `${(bits / 1000000).toFixed(2)} Mb/s`;
        }
      };

      // Tính toán các giá trị với đơn vị phù hợp
      const bwAudio = convertToReadableUnit(bwAudioBits);
      const bwVideo = convertToReadableUnit(bwVideoBits);
      const bwIn = convertToReadableUnit(bwInBits);
      const bwOut = convertToReadableUnit(bwOutBits);

      return {
        streamName: stream.name,
        nclients: stream.nclients || 0,
        bytesIn: stream.bytes_in || 0,
        bytesOut: stream.bytes_out || 0,
        bwIn: bwIn, // Giá trị đã chuyển đổi
        bwOut: bwOut, // Giá trị đã chuyển đổi
        bwAudio: bwAudio, // Giá trị đã chuyển đổi
        bwVideo: bwVideo, // Giá trị đã chuyển đổi
        clients: Array.isArray(stream.client)
          ? stream.client.map((client) => ({
              clientId: client.id || null,
              clientAddress: client.address || '',
              clientTime: client.time || 0,
              clientFlashVersion: client.flashver || '',
            }))
          : stream.client
          ? [
              {
                clientId: stream.client.id || null,
                clientAddress: stream.client.address || '',
                clientTime: stream.client.time || 0,
                clientFlashVersion: stream.client.flashver || '',
              },
            ]
          : [],
        metaData: {
          video: {
            width: stream.meta?.video?.width || 0,
            height: stream.meta?.video?.height || 0,
            frameRate: stream.meta?.video?.frame_rate || 0,
            codec: stream.meta?.video?.codec || '',
            profile: stream.meta?.video?.profile || '',
            level: stream.meta?.video?.level || '',
            bitRate: stream.meta?.video?.bit_rate || 0,
          },
          audio: {
            /*codec: stream.meta?.audio?.codec || '',
            profile: stream.meta?.audio?.profile || '',
            channels: stream.meta?.audio?.channels || 0,
            sampleRate: stream.meta?.audio?.sample_rate || 0,*/
            infoAudio
          },
        },
      };
    });

    return {
      applicationName: liveApp.name,
      streams: liveStreams,
    };
  } catch (error) {
    console.error('Error fetching stream info:', error.message);
    return { status: 'error', message: 'Failed to fetch stream info' };
  }
}

function getAudioMetadata(videoUrl) {
  return new Promise((resolve, reject) => {
    ffmpeg(videoUrl).ffprobe((err, data) => {
      if (err) {
        console.error("Error running ffprobe:", err.message);
        return reject(err);
      }
      const audioStream = data.streams.find((stream) => stream.codec_type === "audio");
      if (!audioStream) {
        return resolve({ profile: null, codec: null, channels: null, sampleRate: null });
      }

      resolve({
        profile: audioStream.profile || "Unknown",
        codec: audioStream.codec_name || "Unknown",
        channels: audioStream.channels || 0,
        sampleRate: audioStream.sample_rate || 0,
      });
    });
  });
}
