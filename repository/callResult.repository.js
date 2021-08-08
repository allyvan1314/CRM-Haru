const callResult = require("../models/callResult.model");
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