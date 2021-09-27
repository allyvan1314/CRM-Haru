const survey = require("../models/survey.model.js");

async function addSurvey(survey) {
    try {
        await survey.save();
    } catch (err) {
        console.log(err);
    }
}


module.exports = {
    addSurvey,
};