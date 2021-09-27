const mongoose = require("mongoose");

const eachSurvey = new mongoose.Schema({
    _id : false,
    question: String,
    answer: String,
})

const surveySchema = new mongoose.Schema(
    {
        name: String,
        birthday: String,
        gender: Number,
        surveyResult: [eachSurvey],
    },
    
);

module.exports = mongoose.model("survey", surveySchema);