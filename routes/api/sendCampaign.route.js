const express = require("express");
const router = express.Router();
const sendCampaign = require("../../redirect/sendCampaign/sendCampaign.js")

router.use((req, res, next) => {
    console.log("Called: ", req.originalUrl)
    next();
});

router.use(sendCampaign)
module.exports = router