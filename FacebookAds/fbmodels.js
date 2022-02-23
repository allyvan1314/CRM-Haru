const mongoose = require("mongoose");

const fbLeadSchema = new mongoose.Schema(
    {
        Phone:String,
        Province:String,
        District:String,
        Name:String,
        DOB:Number,
        Address:String,
    },
    { timestamps: true }
);

module.exports = mongoose.model("fbLead", fbLeadSchema);