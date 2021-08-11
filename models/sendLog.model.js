const mongoose = require("mongoose");

const sendLogSchema = new mongoose.Schema(
    {
        PHONE_NUMBER: String,
        CUSTOMER_ID : Number,
        FULL_NAME : String,
        KEY_PRESS: String,
        ID_CARD : String,
        GENDER : Number,
        INCOME : Number,
        BIRTHDAY : String,
        ADDRESS : String,
        PROVINCE : Number,
        DISTRICT : Number,
        COMPANY_NAME : String,
        COMPANY_ADDRESS : String,
        LOAN_AMOUNT : Number,
        JOB : Number,
        SOURCE : Number,
        TELCO : Number,
        SCORE_RANGE : String,
        SCORE : Number,
        MARITAL : Number,
        EDUCATION : Number,
        FLAG: Number,
        SEND_DATE: Date,
        IS_SEND: Boolean,
    },
);

module.exports = mongoose.model("sendLog", sendLogSchema);