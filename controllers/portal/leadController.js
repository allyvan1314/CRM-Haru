const {Lead, validate} = require('../../models/portal/lead.js')
const sendLog=  require('../../models/api/sendLog.model')
const sendLogRepository = require("../../repository/sendLog.repository.js")
const getAllLeads = async (req,res,next) =>{
    const list = await Lead.find().exec();
    res.render('leadlist',{
        leads: list,
        username: req.user.username ,
    });
}

const getAddLeadView = (req, res, next) => {
    res.render('addLead',{
        username: req.user.username ,
    });
}

const addLead = async (req, res, next) => {
    const {error} = validate(req.body);
    if(error) return res.status(422).send(error.details[0].message);
    const data = req.body;
    let phone =  data.cus_phone;
    let lead = await new Lead({
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
    let sendLog = sendLogRepository.getLogByPhone(phone)

    res.redirect('/allLeads');
}


module.exports = {
    getAllLeads,
    getAddLeadView,
    addLead
}