const express = require("express");
const router = express.Router();
const controller = require("../../controllers/api/callResult.controller.js");
const queryCusInfo = require("../../Config/middleware/queryCusInfo.js");

router.get("/",controller.create);

module.exports = router