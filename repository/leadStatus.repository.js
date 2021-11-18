const leadStatus = require("../models/api/leadStatus.model")

async function addLeadStatus(leadStatus){
    try {
        await leadStatus.save();
    } catch (error) {
        console.log(error);
    }
}

async function getLeadStatusByRequestID(requesid) {
    return await leadStatus.find({ requestid: requesid }).sort({_id:-1});
}

module.exports={
    addLeadStatus,
    getLeadStatusByRequestID
}