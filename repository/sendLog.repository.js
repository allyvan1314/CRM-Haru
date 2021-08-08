const sendLog = require("../models/sendLog.model.js");

async function addSendLog(sendLog) {
    try {
        await sendLog.save();
    } catch (err) {
        console.log(err);
    }
}


module.exports = {
    addSendLog,
};