const mongoose = require("mongoose");

const callResultSchema = new mongoose.Schema(
    {
        campaign: String,
        group : String,
        contact : String,
        phone : String,
        callid : String,
        keypress: String,
        duration : String,
        talktimes : String,
        calldate : String,
        status : String,
        disposition: String,
        cid : String,
    },
    { timestamps: true }
);

const callResult = mongoose.model('callResult', callResultSchema);

module.exports = { callResultSchema, callResult };