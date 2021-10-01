const sendLog = require("../models/sendLog.model.js");

async function addSendLog(sendLog) {
    try {
        await sendLog.save();
    } catch (err) {
        console.log(err);
    }
}

async function getLogByPhone(phone) {
    return await sendLog.find({ PHONE_NUMBER: phone });
}

module.exports = {
    addSendLog,
    getLogByPhone,
};