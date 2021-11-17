const express = require("express");
const router = express.Router();
const controller = require("../../controllers/api/leadStatus.controller.js");

router.post("/", controller.create);
module.exports = router;