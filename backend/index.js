const connectDB = require("./config/db")
const express = require("express")
const cors = require("cors");
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
app.use(errorHandler);

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