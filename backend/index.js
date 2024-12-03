  const { default: mongoose } = require("mongoose");
  const connectDB  = require("./config/db")
  const axios = require("axios")
  const http = require("http");
  const WebSocket = require("ws");
  const express = require("express")
  const cors = require("cors"); 
  const fs = require("fs")
  const { OBSWebSocket } = require('obs-websocket-js');
  const obs = new OBSWebSocket();
  const wss = new WebSocket.Server({ port: 8080 });
  const { XMLParser } = require('fast-xml-parser');
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
  const streamRoutes = require('./routes/streamRoutes')
  app.use('/api/cpu', cpuRoutes);
  app.use("/api/auth", require("./routes/auth"));
  app.use('/api/streams', streamRoutes);
  app.use(errorHandler);

// Hàm kiểm tra trạng thái stream
// const checkStreamStatus = (streamKey) => {
//   return new Promise((resolve) => {
//     const streamUrl = `http://localhost:80/live?port=1935&app=live&stream=${streamKey}`;
//     const url = new URL(streamUrl);
//     const options = {
//       hostname: url.hostname,
//       port: url.port,
//       path: url.pathname + url.search,
//       method: "GET",
//     };
//     const request = http.request(options, (response) => {
//       resolve({ streamKey, status: response.statusCode === 200 });
//     });

//     request.on("error", (err) => {
//       console.error(`Error checking status for ${streamKey}:`, err.message);
//       resolve({ streamKey, status: false });
//     });

//     request.end();
//   });
// };

// // Tạo WebSocket server
const server = new WebSocket.Server({ port: 3000 });
console.log("WebSocket server is running on ws://localhost:3000");

const connectedClients = new Set(); // Tập hợp các client đã kết nối
const globalStreamKeys = new Set(); // Tập hợp toàn bộ các stream keys từ mọi client
const streamStatuses = new Map(); // Map lưu trạng thái hiện tại của từng stream key

// Hàm kiểm tra trạng thái stream
async function getStreamInfo() {
  try {
    const response = await axios.get("http://localhost:80/stat", {
      headers: { Accept: "application/xml" },
    });
    const parser = new XMLParser();
    const jsonData = parser.parse(response.data);
    const server = jsonData["http-flv"].server;
    const applications = Array.isArray(server.application)
      ? server.application
      : [server.application];
    const liveApp = applications.find((app) => app.name === "live");
    if (!liveApp) {
      return { status: "error", message: 'Application "live" not found' };
    }
    const liveStreams = (
      Array.isArray(liveApp.live?.stream)
        ? liveApp.live.stream
        : liveApp.live?.stream
        ? [liveApp.live.stream]
        : []
    ).map((stream) => stream.name);

    return {
      streamNames: liveStreams,
    };
  } catch (error) {
    console.error("Error fetching stream info:", error.message);
    return { status: "error", message: "Failed to fetch stream info" };
  }
}

// WebSocket connection handler
server.on("connection", (socket) => {
  console.log("New client connected");
  connectedClients.add(socket);

  socket.on("message", async (message) => {
    try {
      const data = JSON.parse(message);

      if (data.type === "sync-stream-keys") {
        console.log("Received stream keys:", data.streamKeys);
        // Lưu stream keys vào socket và cập nhật globalStreamKeys
        socket.streamKeys = data.streamKeys;
        for (const key of data.streamKeys) {
          globalStreamKeys.add(key); // Thêm vào tập hợp toàn cầu
        }

        // Kiểm tra trạng thái ngay lập tức cho tất cả stream keys
        await checkStreamStatuses();
      }
    } catch (error) {
      console.error("Error processing message:", error.message);
    }
  });

  socket.on("close", () => {
    console.log("Client disconnected");
    connectedClients.delete(socket);
  });
});

// Kiểm tra trạng thái của tất cả stream keys và gửi về client nếu có thay đổi
async function checkStreamStatuses() {
  const { streamNames } = await getStreamInfo(); // Lấy danh sách stream names từ getStreamInfo()

  for (const streamKey of globalStreamKeys) {
    const currentStatus = streamNames.includes(streamKey); // Xác định trạng thái hiện tại
    const previousStatus = streamStatuses.get(streamKey); // Trạng thái trước đó

    if (currentStatus !== previousStatus) {
      const statusMessage = {
        key: streamKey,
        status: currentStatus,
        message: `Stream ${streamKey} is ${currentStatus ? "active" : "inactive"}`,
        isStreaming: currentStatus,
      };

      // Gửi thông báo đến tất cả client có liên quan
      for (const client of connectedClients) {
        if (client.streamKeys && client.streamKeys.includes(streamKey)) {
          client.send(JSON.stringify(statusMessage));
          console.log(
            `Sent message for stream key "${streamKey}": ${statusMessage.message}`
          );
        }
      }
      // Cập nhật trạng thái mới của stream
      streamStatuses.set(streamKey, currentStatus);
    }else{
      console.log(`No change in status for stream key "${streamKey}"`)
    }
  }
}

// Định kỳ kiểm tra trạng thái stream keys
setInterval(async () => {
  await checkStreamStatuses(); // Kiểm tra trạng thái chung cho tất cả stream keys
}, 5000); // Kiểm tra mỗi 5 giây

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