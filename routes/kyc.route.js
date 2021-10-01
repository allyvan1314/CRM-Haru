const express = require("express");
const router = express.Router();
const controller = require("../controllers/kyc.controller.js");


router.post("/", controller.createKyc);

module.exports = router;