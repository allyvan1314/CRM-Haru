const mongoose = require("mongoose")
const leadStatusSchema = new mongoose.Schema({
    phone: String,
    vmg_receive_date: String,
    vmg_code: String,
    fico_lead_import_date: String,
    fico_lead_status: String,
    fico_lead_message: String,
    fico_app_date: String,
    fico_app_status: String,
    fico_decision_date: String,
    fico_loan_status: String,
    fico_disbursed_LA: String,
    fico_disbursed_date: String,
})

module.exports = mongoose.model("leadStatus",leadStatusSchema)