const mongoose = require("mongoose");

const cusInfoSchema = new mongoose.Schema(
    {
        PHONE_NUMBER: String,
        CUSTOMER_ID : Number,
        FULL_NAME : String,
        ID_CARD : String,
        PHONE_NUMBER_ID : Number,
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
    },
);

module.exports = mongoose.model("cusInfo", cusInfoSchema);