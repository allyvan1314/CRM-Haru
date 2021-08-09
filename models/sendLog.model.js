const mongoose = require("mongoose");

const sendLogSchema = new mongoose.Schema(
    {
        PHONE_NUMBER: String,
        CUSTOMER_ID : Number,
        FULL_NAME : String,
        KEY_PRESS: String,
        SEND_DATE: Date,
        IS_SEND: Boolean,
    },
);

module.exports = mongoose.model("sendLog", sendLogSchema);