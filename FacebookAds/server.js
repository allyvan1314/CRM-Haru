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
    // Facebook will be sending an object called "entry" for "leadgen" webhook event
    console.log('Facebook request body:', req.body);

    if (!req.body.entry) {
        return res.status(500).send({ error: 'Invalid POST data received' });
    }

    // Travere entries & changes and process lead IDs
    for (const entry of req.body.entry) {
        for (const change of entry.changes) {
            // define lead form
            if (change.value.form_id==="275686054524805")
                console.log("lead form 06-12-2021")
            // Process new lead (leadgen_id)
            await processNewLead(change.value.leadgen_id);
        }
    }

    // Success
    res.send({ success: true });
})

// app.listen(port, () => {
//     console.log(`Example app listening at http://localhost:${port}`)
// });

// Process incoming leads
async function processNewLead(leadId) {
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
        leadMap.set(`${fieldName}`,`${fieldValue}`)
    }

    // Implode into string with newlines in between fields
    //const leadInfo = leadForm.join('\n');
    //let LEAD = leadInfo;
    //console.log(response);

    let phone =leadMap.get('số_điện_thoại_liên_hệ');
    let name = leadMap.get('họ_tên');
    let province = leadMap.get('tỉnh/_thành_phố_đăng_sinh_sống');
    let ERROR_CODE = "";
    let ERROR_MSG = "";
    let REQ_ID = "";
    let CHANNEL = "DIGITAL";

    //console.log(leadForm);
    //console.log(leadMap.get('số_điện_thoại_liên_hệ'));
    let info = new fbLead({
        Phone:phone,
        Name:name,
        Province:province
    });
    await fbLeadRepository.addFbLead(info)
    let dataSend = {
        cmd: process.env.CMD_VMG,
        campaignId: process.env.CAMPAIGN_VMG_DIGITAL,
        token: process.env.TOKEN_VMG,
        fullname: name,
        phoneNumber: phone,
        province: province
    }
    await axios.post(process.env.URL_VMG, dataSend)
        .then((res) => {
            console.log("========== DIGITAL ==========");
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
        PHONE_NUMBER:phone,
        FULL_NAME:name,
        ID_CARD:null,
        ADDRESS:null,
        GENDER:null,
        BIRTHDAY:null,
        PROVINCE:province,
        DISTRICT:null,
        EMAIL:null,
        INCOME:null,
        INCOME_TYPE:null,
        LOAN_AMOUNT:null,
        LOAN_TENOR:null,
        SEND_DATE:Date.now(),
        ERROR_CODE,
        ERROR_MSG,
        REQ_ID,
        CHANNEL:"DIGITAL"
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