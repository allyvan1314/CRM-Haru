const { default: AdminBro } = require('admin-bro');
const AdminBroMongoose = require('admin-bro-mongoose');

AdminBro.registerAdapter(AdminBroMongoose);

const AdminCompany = require('./companies/company.admin');
const {CallResult}=require('./callresults/callresult.entity');
const {SendLog} =require('./sendlogs/sendlog.entity');
/** @type {import('admin-bro').AdminBroOptions} */
const options = {
  resources: [
    AdminCompany,
    CallResult,
    SendLog
  ],

};

module.exports = options;