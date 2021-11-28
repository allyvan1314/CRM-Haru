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
        INCOME_TYPE: String,
        BIRTHDAY : String,
        ADDRESS : String,
        PROVINCE : String,
        DISTRICT : String,
        EMAIL:String,
        COMPANY_NAME : String,
        COMPANY_ADDRESS : String,
        LOAN_AMOUNT : Number,
        LOAN_TENOR: String,
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
        ERROR_CODE: String,
        ERROR_MSG: String,
        REQ_ID:String,
        CHANNEL:String,
    },
);

module.exports = mongoose.model("sendLog", sendLogSchema);