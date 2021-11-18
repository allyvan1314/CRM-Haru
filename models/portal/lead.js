const mongoose = require('mongoose');

const Joi = require('@hapi/joi');

const leadSchema = new mongoose.Schema({
    loan_amount: {
        type: String,
        require: true,
    },
    loan_duration: {
        type: String,
        require: true,
    },
    cus_name: {
        type: String,
        required: true,
    },
    cus_phone: {
        type: String,
        required: true,
    },
    cus_gender: {
        type: String,
        required: true,
    },
    cus_id: {
        type: String,
        required: true,
    },
    cus_dob: {
        type: String,
        required: true,
    },
    cus_cur_city: {
        type: String
    },
    cus_cur_district: {
        type: String
    },
    cus_cur_ward: {
        type: String,
        required: true,
    },
    cus_cur_address: {
        type: String,
        required: true,
    },
    cus_income: {
        type: String,
        required: true,
    },
    cus_income_type: {
        type: String,
        required: true,
    },
    cus_email: {
        type: String
    },
    user: {
        type: String
    }
})

const Lead = mongoose.model('Lead', leadSchema);

const validateLead = (lead) => {
    const schema = Joi.object({
        loan_amount: Joi.string()
            .regex(/^(1000000[0-9]|100000[1-9][0-9]|10000[1-9][0-9]{2}|1000[1-9][0-9]{3}|100[1-9][0-9]{4}|10[1-9][0-9]{5}|1[1-9][0-9]{6}|[2-4][0-9]{7}|50000000)$/)
            .required(),
        loan_duration: Joi.string()
            .regex(/^([6-9]|[12][0-9]|3[0-6])$/)
            .required(),
        cus_name: Joi.string().required(),
        cus_phone: Joi.string()
            .regex(/^0(3|5|7|8|9)[0-9]{8}$/)
            .required(),
        cus_gender: Joi.string().required(),
        cus_id: Joi.string()
            .regex(/^([0-9]{9})$|^([0-9]{12})$/)
            .required(),
        cus_dob: Joi.string().required(),
        cus_cur_city: Joi.string().required(),
        cus_cur_district: Joi.string().required(),
        cus_cur_ward: Joi.string().required(),
        cus_cur_address: Joi.string().required(),
        cus_income: Joi.string().required(),
        cus_income_type: Joi.string().required(),
    })

    return Joi.validate(lead, schema,{allowUnknown:true});
}


module.exports.Lead = Lead;
module.exports.validate = validateLead;