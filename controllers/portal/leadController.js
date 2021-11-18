const {
    Lead,
    validate
} = require('../../models/portal/lead.js')
const sendLog = require("../../models/api/sendLog.model.js");
const sendLogRepository = require("../../repository/sendLog.repository.js");
const axios = require('axios')


const getAllLeads = async (req, res, next) => {
    const list = await Lead.find().exec();
    res.render('leadlist', {
        leads: list,
        username: req.user.username,
    });
}

const getAddLeadView = (req, res, next) => {
    res.render('addLead', {
        username: req.user.username,
    });
}

const addLead = async (req, res, next) => {
    const {
        error
    } = validate(req.body);
    if (error) return res.status(422).send(error.details[0].message);
    const data = req.body;
    let phone = data.cus_phone;
    var lead = await new Lead({
        loan_amount: data.loan_amount,
        loan_duration: data.loan_duration,
        cus_name: data.cus_name,
        cus_phone: data.cus_phone,
        cus_gender: data.cus_gender,
        cus_id: data.cus_id,
        cus_dob: data.cus_dob,
        cus_cur_city: data.cus_cur_city,
        cus_cur_district: data.cus_cur_district,
        cus_cur_ward: data.cus_cur_ward,
        cus_cur_address: data.cus_cur_address,
        cus_income: data.cus_income,
        cus_income_type: data.cus_income_type,
        cus_email: data.cus_email,
    });
    lead = await lead.save();
    let sendLog = await sendLogRepository.getLogByPhone(phone)
    if (sendLog.length == 0) {
        console.log(phong + " - not send");
        res.redirect('/allLeads');
    } else {
        const start_time = sendLog[0].SEND_DATE,
            end_time = Date.now()

        const total = new Date(end_time).getTime() - new Date(start_time).getTime();
        const hours = (Math.floor((total) / 1000)) / 3600;
        const days = hours / 24;

        if (days > 30) {
            let ERROR_CODE = "",
                ERROR_MSG = "",
                REQ_ID = "";
            let dataSend = {
                cmd: process.env.CMD_VMG,
                campaignId: process.env.CAMPAIGN_VMG_DIGITAL,
                token: process.env.TOKEN_VMG,
                fullname: data.cus_name,
                nationalId: data.cus_id,
                address: data.cus_cur_address,
                phoneNumber: data.cus_phone,
                gender: (data.cus_gender == "Nam" ? 1 : 2),
                yearOfBirth: data.cus_dob,
                province: data.cus_cur_city,
                district: data.cus_cur_district,
                income: data.cus_income,
                loanAmount: data.cus_loan_amount
            }
            await axios.post(process.env.URL_VMG, dataSend)
                .then((res) => {
                    console.log(`Status: ${res.status}`);
                    console.log('Body: ', res.data);
                    ERROR_CODE = res.data.errorCode;
                    ERROR_MSG = res.data.errorMessage;
                    REQ_ID = res.data.requestId;
                    //console.log(ERROR_CODE);
                }).catch((err) => {
                    console.error(err);
                });
            let sendLogInfo = new sendLog({
                PHONE_NUMBER: data.cus_phone,
                FULL_NAME: data.cus_name,
                ID_CARD: data.cus_id,
                ADDRESS: data.cus_cur_address,
                GENDER: data.cus_gender,
                BIRTHDAY: data.cus_dob,
                PROVINCE: data.cus_cur_city,
                DISTRICT: data.cus_cur_district,
                INCOME: data.cus_income,
                SEND_DATE: Date.now(),
                CHANNEL: "DIGITAL",
                ERROR_CODE: ERROR_CODE,
                ERROR_MSG: ERROR_MSG,
                REQ_ID: REQ_ID,
            });
            await sendLogRepository.addSendLog(sendLogInfo)
            res.redirect('/allLeads');
        } else {
            res.redirect('/allLeads');
        }
    }
}


module.exports = {
    getAllLeads,
    getAddLeadView,
    addLead
}