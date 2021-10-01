const kyc = require("../models/kyc.model")
const kycRepository = require("../repository/kyc.repository")

module.exports.createKyc = async (req, res) => {
    let { name, birthday, gender, kycResult } = req.body;

    var arrayKyc = JSON.parse(JSON.stringify(req.body.kycResult))
    //console.log(arrayKyc[0].question);
    let info = new kyc({
        name, birthday, gender, kycResult
    });

    await kycRepository.addKyc(info)

    res.send({
        data: info,
        error_code: 0,
        message: "add kyc success",
        status: 200,
    });
};