const express = require("express");
const router = express.Router();
const controller = require("../controllers/resendVMG.controller.js");

router.get("/", controller.create);

module.exports = router;