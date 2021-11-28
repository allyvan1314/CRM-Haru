const {
    Lead,
    validate
} = require('../../models/portal/lead.js')
const sendLog = require("../../models/api/sendLog.model.js");
const sendLogRepository = require("../../repository/sendLog.repository.js");
const leadStatus = require("../../models/api/leadStatus.model")
const leadStatusRepository = require("../../repository/leadStatus.repository.js");
const axios = require('axios');
const swal = require('sweetalert');


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
    let PHONE_NUMBER = data.cus_phone;
    let FULL_NAME = data.cus_name;
    let ID_CARD = data.cus_id;
    let ADDRESS = data.cus_cur_address;
    let GENDER = data.cus_gender == "Nam" ? 1 : 2;
    let BIRTHDAY = data.cus_dob;
    let PROVINCE = data.cus_cur_city;
    let DISTRICT = data.cus_cur_district;
    let INCOME = data.cus_income == "" ? 0 : parseInt(data.cus_income.replace(/,/g, ''));
    let LOAN_AMOUNT = data.loan_amount == "" ? 0 : parseInt(data.loan_amount.replace(/,/g, ''));
    let SEND_DATE = Date.now();
    let ERROR_CODE = "";
    let ERROR_MSG = "";
    let REQ_ID = "";
    let CHANNEL = "DIGITAL"
    let user = req.user.username;
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
        cus_email: data.cus_email == null ? "" : data.cus_email,
        user: user,
        source: data.source,
        medium: data.medium,

    });
    lead = await lead.save();
    let sendLogCheck = await sendLogRepository.getLogByPhone(PHONE_NUMBER)
    if (sendLogCheck.length == 0) {
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
            email: data.cus_email,
            income: data.cus_income.replace(/,/g, ''),
            loanAmount: data.loan_amount.replace(/,/g, ''),
            loanTenor: data.loan_duration,
            incomeType: data.cus_income_type,

        }
        await axios.post(process.env.URL_VMG, dataSend)
            .then((res) => {
                console.log("========== DIGITAL ==========");
                console.log(`Status: ${res.status}`);
                console.log('Body: ', res.data);
                ERROR_CODE = res.data.errorCode;
                ERROR_MSG = res.data.errorMessage;
                REQ_ID = res.data.requestId;
                console.log(user);
            }).catch((err) => {
                console.error(err);
            });
        let sendLogInfo = new sendLog({
            PHONE_NUMBER,
            FULL_NAME,
            ID_CARD,
            ADDRESS,
            GENDER,
            BIRTHDAY,
            PROVINCE,
            DISTRICT,
            INCOME,
            LOAN_AMOUNT,
            SEND_DATE,
            ERROR_CODE,
            ERROR_MSG,
            REQ_ID,
            CHANNEL
        });
        await sendLogRepository.addSendLog(sendLogInfo)
        res.redirect('/allLeads');
    } else {
        const start_time = sendLogCheck[0].SEND_DATE,
            end_time = Date.now()

        const total = new Date(end_time).getTime() - new Date(start_time).getTime();
        const hours = (Math.floor((total) / 1000)) / 3600;
        const days = hours / 24;

        if (days > 30) {
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
                email: data.cus_email,
                income: data.cus_income.replace(/,/g, ''),
                loanAmount: data.loan_amount.replace(/,/g, ''),
                loanTenor: data.loan_duration,
                incomeType: data.cus_income_type,
            }
            await axios.post(process.env.URL_VMG, dataSend)
                .then((res) => {
                    console.log("========== DIGITAL ==========");
                    console.log(`Status: ${res.status}`);
                    console.log('Body: ', res.data);
                    ERROR_CODE = res.data.errorCode;
                    ERROR_MSG = res.data.errorMessage;
                    REQ_ID = res.data.requestId;
                    console.log(user);
                }).catch((err) => {
                    console.error(err);
                });
            let sendLogInfo = new sendLog({
                PHONE_NUMBER,
                FULL_NAME,
                ID_CARD,
                ADDRESS,
                GENDER,
                BIRTHDAY,
                PROVINCE,
                DISTRICT,
                INCOME,
                LOAN_AMOUNT,
                SEND_DATE,
                ERROR_CODE,
                ERROR_MSG,
                REQ_ID,
                CHANNEL
            });
            await sendLogRepository.addSendLog(sendLogInfo)
            res.redirect('/allLeads');
        } else {
            res.redirect('/allLeads');
        }
    }
}

const checkLeadView = async (req, res, next) => {
    res.render('checkLead', {
        found: "",
        phone: "",
        channel: "",
        send_date: "",
        vmg_status: "",
        final_status: ""
    });
}

const checkLead = async (req, res, next) => {
    const phone = req.body.cus_phone;
    let sendLogInfo = await sendLogRepository.getLogByPhone(phone);
    // let data = ""
    if (sendLogInfo.length == 0) {
        res.render('checkLead', {
            found: "Không tìm thấy khách hàng",
            phone: "",
            channel: "",
            send_date: "",
            vmg_status: "",
            final_status: ""
        });
    } else {
        let leadStatus = await leadStatusRepository.getLeadStatusByRequestID(sendLogInfo[0].REQ_ID)
        let final_status = ""
        if (leadStatus.length == 0) {
            if(sendLogInfo[0].ERROR_MSG == null) {
                final_status = "Chưa gửi VMG"
            }
            else
            final_status = "Đã gửi VMG"
        } else {
            if (leadStatus[0].status == "4") {
                final_status = " Gửi Fico thành công"
            } else {
                final_status = "Fico từ chối"
            }
        }
        res.render('checkLead', {
            found: "",
            phone: sendLogInfo[0].PHONE_NUMBER,
            channel: sendLogInfo[0].CHANNEL == "DIGITAL" ? "DIGITAL" : "VMS",
            send_date: sendLogInfo[0].SEND_DATE,
            vmg_status: sendLogInfo[0].ERROR_MSG,
            final_status: final_status
        });
    }
}

const getImportExcelView = (req, res, next) => {
    res.render('importExcel', {
        username: req.user.username,
    });
}

const importExcel = (req, res, next) => {
    // if (! req.file || ! req.file.path) {
    //     return res.sendStatus(400);
    //   }
    // var paths = req.files.map(file => file.path)

    // console.log(req.file);
    // console.log(paths);
}



module.exports = {
    getAllLeads,
    getAddLeadView,
    addLead,
    checkLeadView,
    checkLead,
    getImportExcelView,
    importExcel
}