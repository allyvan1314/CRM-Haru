const survey = require("../models/survey.model")
const surveyRepository = require("../repository/survey.repository")

module.exports.createSurvey = async (req, res) => {
    let { name, birthday, gender, surveyResult } = req.body;

    var arraySurvey = JSON.parse(JSON.stringify(req.body.surveyResult))
    //console.log(arraySurvey[0].question);
    let info = new survey({
        name, birthday, gender, surveyResult
    });

    await surveyRepository.addSurvey(info)

    res.send({
        data: info,
        error_code: 0,
        message: "add survey success",
        status: 200,
    });
};