const { default: axios } = require("axios");
const express = require("express");
const router = express.Router();
const apiAdapter = require("./apiAdapter");

const BASE_URL = "http://otp.voip24h.vn/v2";
const api = apiAdapter(BASE_URL);

router.post("/create", (req, res) => {
    if (req.headers.token === undefined) {
        api.post(req.originalUrl).then((resp) => {
            res.send(resp.data);
        });
    } else {
        api.post(req.originalUrl, req.body, {
            headers: {
                token: req.headers.token,
            },
        }).then((resp) => {
            res.send(resp.data);
        });
    }
});
module.exports = router
