const callResult = require("../models/api/callResult.model");
async function addCallResult(callResult) {
    try {
        await callResult.save();
    } catch (err) {
        console.log(err);
    }
}


module.exports = {
    addCallResult,
};