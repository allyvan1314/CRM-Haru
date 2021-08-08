const cusInfo = require("../models/cusInfo.model.js");

async function getCusInfo(phoneNumber){
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
    getCusInfo,
    addCusInfo,
};
