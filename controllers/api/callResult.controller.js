const callResult = require("../../models/api/callResult.model");
const callResultRepository = require("../../repository/callResult.repository");
const response = require("../../Config/responsive/handle");
const cusInfo = require("../../models/api/cusInfo.model.js");
const cusInfoRepository = require("../../repository/cusInfo.repository.js");
const sendLog = require("../../models/api/sendLog.model.js");
const sendLogRepository = require("../../repository/sendLog.repository.js");
const axios = require('axios');
const dotenv = require("dotenv");

module.exports.create = async (req, res) => {
    let { msgid, campaign, group, contact, phone, callid, keypress, duration, billsec, calldate, status, disposition, cid } = req.query;

    let info = new callResult({
        msgid, campaign, group, contact, phone, callid, keypress, duration, billsec, calldate, status, disposition, cid
    });

    await callResultRepository.addCallResult(info)
    res.sendStatus(200)

    
    if (keypress === "1" || keypress === "1,1" || keypress === "1,1,1") {
        let cusInfo = await cusInfoRepository.findCusInfo(phone)
        let PHONE_NUMBER = phone;
        let CUSTOMER_ID = cusInfo.CUSTOMER_ID;
        let FULL_NAME = cusInfo.FULL_NAME;
        let KEY_PRESS = keypress;
        let ID_CARD = cusInfo.ID_CARD;
        let ADDRESS = cusInfo.ADDRESS;
        let GENDER = cusInfo.GENDER;
        let BIRTHDAY = cusInfo.BIRTHDAY;
        let PROVINCE = cusInfo.PROVINCE;
        let DISTRICT = cusInfo.DISTRICT;
        let INCOME = cusInfo.INCOME;
        let JOB = cusInfo.JOB;
        let FLAG = cusInfo.FLAG;
        let SEND_DATE = Date.now();
        let IS_SEND = true;
        let ERROR_CODE = "";
        let ERROR_MSG = "";
        let REQ_ID = "";
        let CHANNEL = "VMS"


        const dataSend = {
            cmd: process.env.CMD_VMG,
            campaignId: process.env.CAMPAIGN_VMG_VMS,
            token: process.env.TOKEN_VMG,
            fullname: FULL_NAME,
            nationalId: ID_CARD,
            address: ADDRESS,
            phoneNumber: PHONE_NUMBER,
            gender: GENDER,
            yearOfBirth: BIRTHDAY,
            province: PROVINCE,
            district: DISTRICT,
            income: INCOME,
            job: JOB,
            flag: FLAG
        }
        await axios.post(process.env.URL_VMG, dataSend)
            .then((res) => {
                console.log("========== VMS ==========");
                console.log(PHONE_NUMBER);
                console.log(`Status: ${res.status}`);
                console.log('Body: ', res.data);
                ERROR_CODE = res.data.errorCode;
                ERROR_MSG = res.data.errorMessage;
                REQ_ID = res.data.requestId;
                //console.log(ERROR_CODE);
            }).catch((err) => {
                console.error(err);
            });
        let sendLogInfo = new sendLog({ PHONE_NUMBER, CUSTOMER_ID, KEY_PRESS, FULL_NAME, ID_CARD, ADDRESS, GENDER, BIRTHDAY, PROVINCE, DISTRICT, INCOME, JOB, FLAG, SEND_DATE, IS_SEND, ERROR_CODE,ERROR_MSG,REQ_ID, CHANNEL });
        await sendLogRepository.addSendLog(sendLogInfo)
    }
    else {
        let PHONE_NUMBER = phone;
        let KEY_PRESS = keypress;
        let SEND_DATE = Date.now();
        let IS_SEND = false;

        let sendLogInfo = new sendLog({ PHONE_NUMBER, KEY_PRESS, SEND_DATE, IS_SEND });
        await sendLogRepository.addSendLog(sendLogInfo)
        console.log("========== VMS ==========");
        console.log(PHONE_NUMBER);
        console.log("not send");
    }

};