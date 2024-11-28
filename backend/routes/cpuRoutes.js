const express = require("express");
const { getSystemDiskInfo } = require("../controllers/cpuController");
const router = express.Router();

router.get("/load", getSystemDiskInfo);
module.exports = router;