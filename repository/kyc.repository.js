const kyc = require("../models/api/kyc.model.js");

async function addKyc(kyc) {
    try {
        await kyc.save();
    } catch (err) {
        console.log(err);
    }
}


module.exports = {
    addKyc,
};