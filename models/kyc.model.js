const mongoose = require("mongoose");

const eachKyc = new mongoose.Schema({
    _id : false,
    question: String,
    answer: String,
})

const kycSchema = new mongoose.Schema(
    {
        name: String,
        birthday: String,
        gender: Number,
        kycResult: [eachKyc],
    },
    
);

module.exports = mongoose.model("kyc", kycSchema);