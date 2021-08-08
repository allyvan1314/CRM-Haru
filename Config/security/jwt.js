const jwt = require("jsonwebtoken");

function createToken(userId) {
    return jwt.sign({ _id: userId }, process.env.TOKEN_KEY);
}

function decodeToken(token) {
    try {
        return jwt.verify(token, process.env.TOKEN_KEY);
    }
    catch(err) {
        console.log(err);
        return error
    }
    
}

module.exports = {
    createToken,
    decodeToken
};
