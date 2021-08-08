function handleError(data, message) {
    return {
        data: data,
        error_code: 0,
        message: message,
        status: 400,
    };
}

function handleSuccess(data, message) {
    return {
        data: data,
        error_code: 1,
        message: message,
        status: 200,
    };
}

module.exports = {
    handleError,
    handleSuccess,
};
