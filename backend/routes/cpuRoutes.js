const express = require("express");
const {getCpuLoad } = require("../controllers/cpuController");
const router = express.Router();

router.get("/load", getCpuLoad);
module.exports = router;