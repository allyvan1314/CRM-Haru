const axios = require('axios');
const express = require('express');
const bodyParser = require('body-parser');
var xhub = require('express-x-hub');

const router = express.Router();

// const app = express();
// const port = 3000;

// Enter the Page Access Token from the previous step
const FACEBOOK_PAGE_ACCESS_TOKEN = 'EAAEbeW79Bo0BAAK64SxU4LdXYZAyb7fMnaZA4T2dpVOFzrU2MVwHOFasfAnKUsdk6uZAQuBYvAKZBDj57ZCJZAdDhTLnTiaAwr4JBhukpiFU0RswAQgXgfCMwwPOhmkqzcBq2AD8OpOPTIE9j7buyTqWCOI6iL25NW0feYhetBYeNwgonH0GPujfpgkTie6Gbj4M29w0AVeAZDZD';

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

    // if (!req.isXHubValid()) {
    //     console.log('Warning - request header X-Hub-Signature not present or invalid');
    //     res.sendStatus(401);
    //     return;
    // }

    // console.log('request header X-Hub-Signature validated');
    // // Process the Facebook updates here
    // received_updates.unshift(req.body);
    res.sendStatus(200);
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

    // Extract fields
    for (const field of response.data.field_data) {
        // Get field name & value
        const fieldName = field.name;
        const fieldValue = field.values[0];

        // Store in lead array
        leadForm.push(`${fieldName}: ${fieldValue}`);
    }

    // Implode into string with newlines in between fields
    const leadInfo = leadForm.join('\n');

    // Log to console
    console.log('A new lead was received!\n', leadInfo);

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