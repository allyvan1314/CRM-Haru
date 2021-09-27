const express = require("express");
const router = express.Router();
const controller = require("../controllers/survey.controller.js");


router.post("/", controller.createSurvey);

module.exports = router;