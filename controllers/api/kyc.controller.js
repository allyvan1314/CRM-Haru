const kyc = require("../../models/api/kyc.model")
const kycRepository = require("../../repository/kyc.repository")
const response = require("../../Config/responsive/handle")
const sendLog = require("../../models/api/sendLog.model.js")
const sendLogRepository = require("../../repository/sendLog.repository.js")

module.exports.createKyc = async (req, res) => {
    let { phone, name, birthday, gender, survey } = req.body;

    //var arrayKyc = JSON.parse(JSON.stringify(req.body.kycResult))
    //console.log(arrayKyc[0].question);
    let info = new kyc({
        phone, name, birthday, gender, survey
    });
    let id = info._id.toHexString();

    if(phone == null ){
        res.send(response.handleNullPhoneError(null, "Phone Number null"));
        return;
    }

    if((name == null || name == "") && (birthday == null ||birthday == "") && (gender == null || gender == ""))
    {
        res.send(response.handleInfoError(null,"Info invalid"));
        return;
    }

    let data = sendLogRepository.getLogByPhone(phone)
    data.then( async function(result) {
        //console.log(result) // "Some User token"
        if(result == ""){
            res.send(response.handleInvalidPhoneError(null, "Phone Number invalid"));
            return;
        }
        else{
            await kycRepository.addKyc(info)
            res.send(response.handleSuccess({id,phone},"Success"))
            return;
        }
     })
    //console.log(data)
    

    

    
};