const cusInfoController = require('../../controllers/cusInfo.controller.js')
const CusInfo = require("../../models/cusInfo.model");
const cusInfoRepository = require("../../repository/cusInfo.repository.js");

module.exports = async function querryCusInfo(req, res, next) {
    const keypress = req.body.keypress;
    const phone = req.body.phone;
    let cusInfo = await cusInfoRepository.getCusInfo(phone)
    if (keypress == 1) {
        //let phone = req.body.PHONE_NUMBER
        
        res.send({
            data: cusInfo,
            error_code: 0,
            status: 200,
        });
        

        // let cusInfo = cusInfoController.getCusInfo(req.body.phoneNumber);
        // res.send({
        //     data: cusInfo,
        //     error_code: 0,
        //     status: 200,
        // });

        // try {

        // } catch (err) {
        //     res.status(400).json({ message: "Invalid " });
        // }
        // return res.status(200).json({ message: "will sent" });
    }
    else {
        return res.status(400).json({ message: "not will sent" });
    }
};
