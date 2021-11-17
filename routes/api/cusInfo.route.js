const express = require("express");
const router = express.Router();
const controller = require("../controllers/cusInfo.controller.js");

router.get("/", controller.getCusInfo);
router.post("/up", controller.createCusInfo);

module.exports = router;