const leadStatus = require("../models/api/leadStatus.model")

async function addLeadStatus(leadStatus){
    try {
        await leadStatus.save();
    } catch (error) {
        console.log(error);
    }
}

module.exports={
    addLeadStatus,
}