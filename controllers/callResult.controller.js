const callResult = require("../models/callResult.model");
const callResultRepository = require("../repository/callResult.repository");
const response = require("../Config/responsive/handle");
const cusInfo = require("../models/cusInfo.model.js");
const cusInfoRepository = require("../repository/cusInfo.repository.js");
const sendLog = require("../models/sendLog.model.js");
const sendLogRepository = require("../repository/sendLog.repository.js");
const axios = require('axios');
const dotenv = require("dotenv");

module.exports.create = async (req, res) => {
    let { campaign, group, contact, phone, callid, keypress, duration, talktimes, calldate, status, disposition, cid } = req.query;

    let info = new callResult({
        campaign, group, contact, phone, callid, keypress, duration, talktimes, calldate, status, disposition, cid
    });

    await callResultRepository.addCallResult(info)


    // --- testing this function
    // const keypress = req.body.keypress;
    // const phone = req.body.phone;
    let cusInfo = await cusInfoRepository.getCusInfo(phone)
    if (keypress === "1" || keypress ==="1,1" ) {
        //let phone = req.body.PHONE_NUMBER

        // res.send({
        //     data: cusInfo,
        //     error_code: 0,
        //     status: 200,
        // });
        res.send({
            // data: cusInfo,
            // error_code: 0,
            message: "send CallResult success",
            status: 200,
        });

        let PHONE_NUMBER = phone;
        let CUSTOMER_ID = cusInfo.CUSTOMER_ID;
        let FULL_NAME = cusInfo.FULL_NAME;
        let KEY_PRESS = keypress;
        let SEND_DATE = Date.now();
        let IS_SEND = true;

        let sendLogInfo = new sendLog({ PHONE_NUMBER, CUSTOMER_ID, FULL_NAME, KEY_PRESS, SEND_DATE, IS_SEND });
        await sendLogRepository.addSendLog(sendLogInfo)

        const dataSend = {
            cmd: "getLeadgenDataFromPublisher",
            campaignId: "HARU_01",
            token: process.env.TOKEN_VMG,
            phoneNumber: PHONE_NUMBER
        }
        axios.post('https://dev.infosky.vn/ProcessRequest', dataSend)
            .then((res) => {
                //console.log(`Status: ${res.status}`);
                //console.log('Body: ', res.data);
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
        return res.status(400).json({ message: "send CallResult success!!!" });
    }
    // end of testing function


    // res.send({
    //     data: cusInfo,
    //     error_code: 0,
    //     message: "add CallResult success",
    //     status: 200,
    // });
};