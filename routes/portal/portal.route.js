const express = require('express');
const {getAllLeads, getAddLeadView,addLead} = require('../../controllers/portal/leadController');


const router = express.Router();

//====================================================
//              A P P   R O U T E S
//====================================================


router.get('/allLeads', getAllLeads);
router.get('/addLead', getAddLeadView);
router.post('/addLead', addLead);
module.exports = {
    routes: router
}