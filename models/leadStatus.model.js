const mongoose = require("mongoose")
const leadStatusSchema = new mongoose.Schema({
    status: String,
    reason: JSON||String,
    requestid: String,
})
const reasonDetail = new mongoose.Schema({
    traceNo:String,
    code: Number,
    message: String,
    Date: String,
    data:Array
})

module.exports = mongoose.model("leadStatus",leadStatusSchema)