function handleSuccess(data, message) {
    return {
        data: data,
        error_code: 0,
        message: message,
        status: 200,
    };
}

function handleNullPhoneError(data, message) {
    return {
        data: data,
        error_code: 1,
        message: message,
        status: 400,
    };
}

function handleInvalidPhoneError(data, message) {
    return {
        data: data,
        error_code: 2,
        message: message,
        status: 400,
    };
}

function handleInfoError(data, message) {
    return {
        data: data,
        error_code: 3,
        message: message,
        status: 400,
    };
}


module.exports = {
    handleSuccess,
    handleNullPhoneError,
    handleInvalidPhoneError,
    handleInfoError
};
