const jwt = require("../security/jwt");

module.exports = function auth(req, res, next) {
    const token = req.header("token");
    if (!token) {
        return res.status(401).json({ message: "Access denied" });
    }

    try {
        const verified = jwt.decodeToken(token);
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).json({ message: "Invalid token" });
    }
};
