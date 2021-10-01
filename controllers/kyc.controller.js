const kyc = require("../models/kyc.model")
const kycRepository = require("../repository/kyc.repository")
const response = require("../Config/responsive/handle")
const sendLog = require("../models/sendLog.model.js")
const sendLogRepository = require("../repository/sendLog.repository.js")

module.exports.createKyc = async (req, res) => {
    let { phone, name, birthday, gender, survey } = req.body;

    //var arrayKyc = JSON.parse(JSON.stringify(req.body.kycResult))
    //console.log(arrayKyc[0].question);
    let info = new kyc({
        phone, name, birthday, gender, survey
    });

    if(phone == null ){
        res.send(response.handleNullPhoneError(null, "Phone Number null"));
        return;
    }

    if(name == null && birthday == null && gender == null)
    {
        res.send(response.handleInfoError(null,"Info invalid"));
        return;
    }

    let data = sendLogRepository.getLogByPhone(phone)
    data.then(function(result) {
        //console.log(result) // "Some User token"
        if(result == ""){
            res.send(response.handleInvalidPhoneError(null, "Phone Number invalid"));
            return;
        }
        else{
            res.send(response.handleSuccess(info,"Success"))
            return;
        }
     })
    //console.log(data)
    

    await kycRepository.addKyc(info)

    
};