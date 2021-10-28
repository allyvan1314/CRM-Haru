const leadStatus = require('../models/leadStatus.model.js');
const leadStatusRepository = require('../repository/leadStatus.repository');
const response = require("../Config/responsive/handle");
const sendLog = require("../models/sendLog.model.js")
const sendLogRepository = require("../repository/sendLog.repository.js");
const { crossOriginResourcePolicy } = require('helmet');

module.exports.create = async (req, res) => {
    let {
        status,
        reason,
        requestid
    } = req.body;

    

    let json = req.body.reason;
    function IsJsonString(str) {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    }
    if (IsJsonString(json)) {
        const obj = JSON.parse(json);
        reason = obj;
        let info = new leadStatus({
            status,
            reason,
            requestid
        });
        await leadStatusRepository.addLeadStatus(info)
        res.send(response.handleSuccess({requestid},"Success 👌"))
        return;
    }
    else{
        let info = new leadStatus({
            status,
            reason,
            requestid
        });
        await leadStatusRepository.addLeadStatus(info)
        res.send(response.handleSuccess({requestid},"Success  "))
        return;
    }

} 