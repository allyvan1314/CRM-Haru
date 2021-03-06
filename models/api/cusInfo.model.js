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
        PROVINCE : String,
        DISTRICT : String,
        COMPANY_NAME : String,
        COMPANY_ADDRESS : String,
        LOAN_AMOUNT : Number,
        JOB : String,
        SOURCE : Number,
        TELCO : Number,
        SCORE_RANGE : String,
        SCORE : Number,
        MARITAL : Number,
        EDUCATION : Number,
        FLAG: Number,
    },
);

module.exports = mongoose.model("cusInfo", cusInfoSchema);