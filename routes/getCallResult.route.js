const express = require("express");
const router = express.Router();
const controller = require("../controllers/callResult.controller.js");
const queryCusInfo = require("../Config/middleware/queryCusInfo.js");

router.post("/",controller.create);

module.exports = router