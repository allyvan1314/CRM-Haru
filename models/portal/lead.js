const mongoose = require('mongoose');

const Joi = require('@hapi/joi');

const leadSchema = new mongoose.Schema({
    loan_amount: {
        type: String,
    },
    loan_duration: {
        type: String,
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
    },
    cus_dob: {
        type: String,
    },
    cus_cur_city: {
        type: String
    },
    cus_cur_district: {
        type: String
    },
    cus_cur_ward: {
        type: String,
    },
    cus_cur_address: {
        type: String,
    },
    cus_income: {
        type: String,
    },
    cus_income_type: {
        type: String,
    },
    cus_email: {
        type: String
    },
    user: {
        type: String
    },
    source:{
        type: String,
    },
    medium:{
        type:String,
    }
}, {
    timestamps: true
})

const Lead = mongoose.model('Lead', leadSchema);

const validateLead = (lead) => {
    const schema = Joi.object({
        // loan_amount: Joi.string()
        //     .regex(/^(10,000,00[0-9]|10,000,0[1-9][0-9]|10,000,[1-9][0-9]{2}|10,00[1-9],[0-9]{3}|10,0[1-9][0-9],[0-9]{3}|10,[1-9][0-9]{2},[0-9]{3}|1[1-9],[0-9]{3},[0-9]{3}|[2-4][0-9],[0-9]{3},[0-9]{3}|50000000)$/)
        //     .required(),
        // loan_duration: Joi.string()
        //     .regex(/^([6-9]|[12][0-9]|3[0-6])$/)
        //     .required(),
        cus_name: Joi.string().required(),
        cus_phone: Joi.string()
            .regex(/^0(3|5|7|8|9)[0-9]{8}$/)
            .required(),
        cus_gender: Joi.string().required(),
        // cus_id: Joi.string()
        //     .regex(/^([0-9]{9})$|^([0-9]{12})$/)
        //     .required(),
        // cus_dob: Joi.string().required(),
        cus_cur_city: Joi.string().required(),
        // cus_cur_district: Joi.string().required(),
        // cus_cur_ward: Joi.string().required(),
        // cus_cur_address: Joi.string().required(),
        // cus_income: Joi.string()
        //     .regex(/^(3,000,00[0-9]|3,000,0[1-9][0-9]|3,000,[1-9][0-9]{2}|3,00[1-9],[0-9]{3}|3,0[1-9][0-9],[0-9]{3}|3,[1-9][0-9]{2},[0-9]{5}|[4-9],[0-9]{3},[0-9]{3}|[1-9][0-9],[0-9]{3},[0-9]{3}|100000000)$/)
        //     .required(),
        // cus_income_type: Joi.string().required(),
    })

    return Joi.validate(lead, schema, {
        allowUnknown: true
    });
}


module.exports.Lead = Lead;
module.exports.validate = validateLead;