const fbLead = require("./fbmodels");
const fbLeadRepository = require("./fbrepository");

//PHONE_NUMBER, CUSTOMER_ID, FULL_NAME, ID_CARD, PHONE_NUMBER_ID, GENDER, INCOME, BIRTHDAY, ADDRESS, PROVINCE, DISTRICT, COMPANY_NAME, COMPANY_ADDRESS, LOAN_AMOUNT, JOB, SOURCE, TELCO, SCORE_RANGE, SCORE, MARITAL, EDUCATION

module.exports.createFbLead = async (req, res) => {
    let { 
    } = req.body;

    let info = new cusInfo({
        PHONE_NUMBER, CUSTOMER_ID, FULL_NAME, ID_CARD, PHONE_NUMBER_ID, GENDER, INCOME, BIRTHDAY, ADDRESS, PROVINCE, DISTRICT, COMPANY_NAME, COMPANY_ADDRESS, LOAN_AMOUNT, JOB, SOURCE, TELCO, SCORE_RANGE, SCORE, MARITAL, EDUCATION, FLAG

    });

    await cusInfoRepository.addCusInfo(info)
    
    res.send({
        data: info,
        error_code: 0,
        message: "add Cus Info success",
        status: 200,
    });
};