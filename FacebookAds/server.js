const axios = require('axios');
const express = require('express');
const bodyParser = require('body-parser');
var xhub = require('express-x-hub');
const fbLead = require("./fbmodels");
const fbLeadRepository = require("./fbrepository");
const router = express.Router();
const dotenv = require("dotenv");
const sendLog = require("../models/api/sendLog.model.js");
const sendLogRepository = require("../repository/sendLog.repository.js");

// const app = express();
// const port = 3000;

// Enter the Page Access Token from the previous step
const FACEBOOK_PAGE_ACCESS_TOKEN = process.env.FACEBOOK_PAGE_ACCESS_TOKEN;

// Accept JSON POST body
router.use(bodyParser.json());

// GET /webhook
router.get('/webhook', (req, res) => {
    // Facebook sends a GET request
    // To verify that the webhook is set up
    // properly, by sending a special challenge that
    // we need to echo back if the "verify_token" is as specified
    if (req.query['hub.verify_token'] === 'CUSTOM_WEBHOOK_VERIFY_TOKEN') {
        res.send(req.query['hub.challenge']);
        return;
    }
})

// POST /webhook
router.post('/webhook', async (req, res) => {
    console.log("================ DIGITAL - FB ==================")
    // Facebook will be sending an object called "entry" for "leadgen" webhook event
    console.log('Facebook request body:', req.body);

    if (!req.body.entry) {
        return res.status(500).send({
            error: 'Invalid POST data received'
        });
    }
    let leadType = "";
    // Travere entries & changes and process lead IDs
    for (const entry of req.body.entry) {
        for (const change of entry.changes) {
            // define lead form
            if (change.value.form_id === "275686054524805")
                leadType = "lead0612";
            if (change.value.form_id === "231276709136039")
                leadType = "mess1312";
            if (change.value.form_id === "970485890483632")
                leadType = "lead1212";
            if (change.value.form_id === "1018123219063016")
                leadType = "lead_lv2_v02";
            if (change.value.form_id === "348578430331399")
                leadType = "lead_lv2_v01";
            if (change.value.form_id === "324642926314402")
                leadType = "lead_lv3_p";
            if (change.value.form_id === "1043886249670521")
                leadType = "lead_01_p";
            if (change.value.form_id === "1069273733653961")
                leadType = "lead_01_pp";

            //console.log(leadType);
            // Process new lead (leadgen_id)
            await processNewLead(change.value.leadgen_id, leadType);
        }
    }

    // Success
    res.send({
        success: true
    });
})

// app.listen(port, () => {
//     console.log(`Example app listening at http://localhost:${port}`)
// });

// Process incoming leads
async function processNewLead(leadId, leadType) {
    let response;

    try {
        // Get lead details by lead ID from Facebook API
        response = await axios.get(`https://graph.facebook.com/v12.0/${leadId}/?access_token=${FACEBOOK_PAGE_ACCESS_TOKEN}`);
    } catch (err) {
        // Log errors
        return console.warn(`An invalid response was received from the Facebook API:`, err.response.data ? JSON.stringify(err.response.data) : err.response);
    }

    // Ensure valid API response returned
    if (!response.data || (response.data && (response.data.error || !response.data.field_data))) {
        return console.warn(`An invalid response was received from the Facebook API: ${response}`);
    }

    // Lead fields
    const leadForm = [];
    let leadMap = new Map();
    // Extract fields
    for (const field of response.data.field_data) {
        // Get field name & value
        const fieldName = field.name;
        const fieldValue = field.values[0];

        // Store in lead array
        leadForm.push(`${fieldName}: ${fieldValue}`);
        leadMap.set(`${fieldName}`, `${fieldValue}`)
    }

    // Implode into string with newlines in between fields
    //const leadInfo = leadForm.join('\n');
    //let LEAD = leadInfo;
    //console.log(response);
    let phone = "";
    let name = "";
    let province = "";
    let gender = "";
    let dob = "";
    let district = "";
    let ward = "";
    let street = "";
    let ERROR_CODE = "";
    let ERROR_MSG = "";
    let REQ_ID = "";
    let CHANNEL = "DIGITAL";

    let sendLogGender = 2;
    switch (leadType) {
        case "lead0612":
            console.log(leadType);
            phone = leadMap.get('s???_??i???n_tho???i_li??n_h???');
            name = leadMap.get('h???_t??n');
            province = leadMap.get('t???nh/_th??nh_ph???_????ng_sinh_s???ng');
            break;
        case "mess1312":
            console.log(leadType);
            phone = leadMap.get('phone');
            name = leadMap.get('name');
            province = leadMap.get('city');
            break;
        case "lead1212":
            console.log(leadType);
            phone = leadMap.get('phone');
            name = leadMap.get('name');
            province = leadMap.get('city');
            break;
        case "lead_lv2_v02":
            console.log(leadType);
            phone = leadMap.get('number_phone');
            name = leadMap.get('full_name');
            province = leadMap.get('city');
            district = leadMap.get('district');
            ward = leadMap.get('ward');
            address = leadMap.get('street');
            sendLogGender = gender = leadMap.get('gender') == 'male' ? 1 : 0;
            dob = leadMap.get('birth_date');
            break;
        case "lead_lv2_v01":
            console.log(leadType);
            phone = leadMap.get('number_phone');
            name = leadMap.get('full_name');
            province = leadMap.get('city');
            sendLogGender = gender = leadMap.get('gender') == 'male' ? "1" : "0";
            dob = leadMap.get('birth_date');
            break;
        case "lead_lv3_p":
            console.log(leadType);
            phone = leadMap.get('number_phone');
            name = leadMap.get('full_name');
            province = leadMap.get('city');
            sendLogGender = gender = leadMap.get('gender') == 'male' ? "1" : "0";
            dob = leadMap.get('birth_date');
            break;
        case "lead_01_pp":
            console.log(leadType);
            phone = leadMap.get('phone');
            name = leadMap.get('name');
            break;
        case "lead_01_p":
            console.log(leadType);
            phone = leadMap.get('phone');
            name = leadMap.get('name');
            sendLogGender = gender = leadMap.get('gender') == 'male' ? "1" : "0";
            break;
        default:
            break;
    }

    //console.log(leadForm);
    //console.log(leadMap.get('s???_??i???n_tho???i_li??n_h???'));
    let info = new fbLead({
        Phone: phone,
        Name: name,
        Province: province,
        District: district,
        DOB: dob,
        Address: street
    });
    await fbLeadRepository.addFbLead(info)
    let dataSend = {
        cmd: process.env.CMD_VMG,
        campaignId: process.env.CAMPAIGN_VMG_DIGITAL,
        token: process.env.TOKEN_VMG,
        fullname: name,
        phoneNumber: phone,
        province: province,
        district: district,
        address: street,
        gender: gender,
        yearOfBirth: dob

    }
    await axios.post(process.env.URL_VMG, dataSend)
        .then((res) => {
            console.log(phone);
            console.log(`Status: ${res.status}`);
            console.log('Body: ', res.data);
            ERROR_CODE = res.data.errorCode;
            ERROR_MSG = res.data.errorMessage;
            REQ_ID = res.data.requestId;
        }).catch((err) => {
            console.error(err);
        });


    // Log to console
    let sendLogInfo = new sendLog({
        PHONE_NUMBER: phone,
        FULL_NAME: name,
        ID_CARD: null,
        ADDRESS: street,
        GENDER: sendLogGender,
        BIRTHDAY: dob,
        PROVINCE: province,
        DISTRICT: district,
        EMAIL: null,
        INCOME: null,
        INCOME_TYPE: null,
        LOAN_AMOUNT: null,
        LOAN_TENOR: null,
        SEND_DATE: Date.now(),
        ERROR_CODE,
        ERROR_MSG,
        REQ_ID,
        CHANNEL: "DIGITAL"
    });
    await sendLogRepository.addSendLog(sendLogInfo)
    //console.log('A new lead was received!\n', leadInfo);

    // Use a library like "nodemailer" to notify you about the new lead
    // 
    // Send plaintext e-mail with nodemailer
    // transporter.sendMail({
    //     from: `Admin <admin@example.com>`,
    //     to: `You <you@example.com>`,
    //     subject: 'New Lead: ' + name,
    //     text: new Buffer(leadInfo),
    //     headers: { 'X-Entity-Ref-ID': 1 }
    // }, function (err) {
    //     if (err) return console.log(err);
    //     console.log('Message sent successfully.');
    // });
}

module.exports = router;