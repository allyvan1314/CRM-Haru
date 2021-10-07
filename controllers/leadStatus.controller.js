const leadStatus = require('../models/leadStatus.model.js');
const leadStatusRepository = require('../repository/leadStatus.repository');
const response = require("../Config/responsive/handle");
const sendLog = require("../models/sendLog.model.js")
const sendLogRepository = require("../repository/sendLog.repository.js")

module.exports.create = async (req, res) => {
    let {phone,vmg_receive_date,vmg_code,fico_lead_import_date,fico_lead_status,fico_lead_message,fico_app_date,
        fico_app_status,fico_decision_date,fico_loan_status,fico_disbursed_LA,fico_disbursed_date} = req.body;

    let info = new leadStatus({
        phone,vmg_receive_date,vmg_code,fico_lead_import_date,fico_lead_status,fico_lead_message,fico_app_date,
        fico_app_status,fico_decision_date,fico_loan_status,fico_disbursed_LA,fico_disbursed_date
    });
    let id = info._id.toHexString();

    if(phone == null ){
        res.send(response.handleNullPhoneError(null, "Phone Number null"));
        return;
    }

    let data = sendLogRepository.getLogByPhone(phone)
    data.then( async function(result) {
        //console.log(result) // "Some User token"
        if(result == ""){
            res.send(response.handleInvalidPhoneError(null, "Phone Number invalid"));
            return;
        }
        else{
            await leadStatusRepository.addLeadStatus(info)
            res.send(response.handleSuccess({id,phone},"Success"))
            return;
        }
        })

}