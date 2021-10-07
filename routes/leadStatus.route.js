const express = require("express");
const router = express.Router();
const controller = require("../controllers/leadStatus.controller.js");

router.post("/", controller.create);
module.exports = router;