const mongoose = require("mongoose");

const callResultSchema = new mongoose.Schema(
    {
        msgid: String,
        campaign: String,
        group : String,
        contact : String,
        phone : String,
        callid : String,
        keypress: String,
        duration : String,
        billsec : String,
        calldate : String,
        status : String,
        disposition: String,
        cid : String,
    },
    { timestamps: true }
);

module.exports = mongoose.model("callResult", callResultSchema);