const mongoose = require("mongoose");

const fbLeadSchema = new mongoose.Schema(
    {
        Phone:String,
        Province:String,
        Name:String,
        Gender:String,
        LoanAmount:String,
        LoanTenor:String
    },
    { timestamps: true }
);

module.exports = mongoose.model("fbLead", fbLeadSchema);