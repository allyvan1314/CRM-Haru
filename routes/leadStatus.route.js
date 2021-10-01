const express = require("express");
const router = express.Router();
const controller = require("../controllers/resendVMG.controller.js");

router.post("/", (req, res) => {
    res.send("lót thing ");
  });
module.exports = router;