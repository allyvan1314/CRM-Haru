const kyc = require("../models/kyc.model.js");

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