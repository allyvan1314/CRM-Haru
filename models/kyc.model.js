const mongoose = require("mongoose");

const eachSurvey = new mongoose.Schema({
    _id : false,
    question: String,
    answer: String,
})

const kycSchema = new mongoose.Schema(
    {
        phone: {
            type: String,
            require: true,
        },
        name: String,
        birthday: String,
        gender: Number,
        survey: [eachSurvey],
    },
    
);

module.exports = mongoose.model("kyc", kycSchema);