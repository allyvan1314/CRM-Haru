const { checkSchema } = require("express-validator");

function signValidation() {
    return checkSchema({
        email: {
            isEmail: {
                bail: true,
                errorMessage: "Email invalid",
            },
        },
        password: {
            isLength: {
                errorMessage: "Password must be greater 6 letter",
                options: {
                    min: 6,
                },
            },
        },
    });
}

module.exports = signValidation();
