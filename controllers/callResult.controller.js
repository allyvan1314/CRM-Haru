const callResult = require("../models/callResult.model");
const callResultRepository = require("../repository/callResult.repository");
const response = require("../Config/responsive/handle");
const cusInfo = require("../models/cusInfo.model.js");
const cusInfoRepository = require("../repository/cusInfo.repository.js");
const sendLog = require("../models/sendLog.model.js");
const sendLogRepository = require("../repository/sendLog.repository.js");
const axios = require('axios');

module.exports.create = async (req, res) => {
    let { campaign, group, contact, phone, callid, keypress, duration, talktimes, calldate, status, disposition, cid } = req.query;

    let info = new callResult({
        campaign, group, contact, phone, callid, keypress, duration, talktimes, calldate, status, disposition, cid
    });

    await callResultRepository.addCallResult(info)
    res.sendStatus(200)

    let cusInfo = await cusInfoRepository.findCusInfo(phone)
    if (keypress === "1" || keypress === "1,1" || keypress === "1,1,1") {
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


        let sendLogInfo = new sendLog({ PHONE_NUMBER, CUSTOMER_ID, KEY_PRESS, FULL_NAME, ID_CARD, ADDRESS, GENDER, BIRTHDAY, PROVINCE, DISTRICT, INCOME, JOB, FLAG, SEND_DATE, IS_SEND, });
        await sendLogRepository.addSendLog(sendLogInfo)

        const dataSend = {
            cmd: "getLeadgenDataFromPublisher",
            campaignId: "HARU_01",
            token: "4571ceb1d56d45fcb8ef185e4e1cee71",
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
        axios.post('https://dev.infosky.vn/ProcessRequest', dataSend)
            .then((res) => {
                console.log(`Status: ${res.status}`);
                console.log('Body: ', res.data);
            }).catch((err) => {
                console.error(err);
            });
    }
    else {
        let PHONE_NUMBER = phone;
        let CUSTOMER_ID = cusInfo.CUSTOMER_ID;
        let FULL_NAME = cusInfo.FULL_NAME;
        let KEY_PRESS = keypress;
        let SEND_DATE = Date.now();
        let IS_SEND = false;

        let sendLogInfo = new sendLog({ PHONE_NUMBER, CUSTOMER_ID, FULL_NAME, KEY_PRESS, SEND_DATE, IS_SEND });
        await sendLogRepository.addSendLog(sendLogInfo)
        console.log('not send');
    }

};