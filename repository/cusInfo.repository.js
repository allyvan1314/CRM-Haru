const cusInfo = require("../models/api/cusInfo.model.js");

async function findCusInfo(phoneNumber){
    return await cusInfo.findOne({PHONE_NUMBER : phoneNumber});
}

async function addCusInfo(cusInfo) {
    try {
        await cusInfo.save();
    } catch (err) {
        console.log(err);
    }
}


module.exports = {
    findCusInfo,
    addCusInfo,
};
