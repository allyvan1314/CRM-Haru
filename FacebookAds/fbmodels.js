const mongoose = require("mongoose");

const fbLeadSchema = new mongoose.Schema(
    {
        Lead: String
    },
    { timestamps: true }
);

module.exports = mongoose.model("fbLead", fbLeadSchema);