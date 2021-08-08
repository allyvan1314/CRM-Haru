const backlist = ["[", "]", "{", "}", "$or", "$and", "$regex", "$ne"];

function checkSpecialCharacter(input) {
    if (Array.isArray(input)) {
        return false;
    } else {
        return checkContains(input);
    }

    return true;
}

function checkContains(input) {
    let flag = 0;
    backlist.forEach((item) => {
        if (input.includes(item)) {
            flag += 1;
        }
    });

    if (flag === 0) {
        return true;
    } else return false;
}

module.exports = checkSpecialCharacter;
