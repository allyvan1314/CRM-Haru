const { default: axios } = require("axios");
const express = require("express");
const router = express.Router();
const apiAdapter = require("./apiAdapter");

const BASE_URL = "http://otp.voip24h.vn/v2/";
const api = apiAdapter(BASE_URL);

router.post("/create", (req, res) => {
    api.post(req.originalUrl, req.body).then(resp => {
        res.send(resp.data)
    })
});
module.exports = router
