const fbLead = require("./fbmodels");

async function addFbLead(fbLead) {
    try {
        await fbLead.save();
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    addFbLead
};