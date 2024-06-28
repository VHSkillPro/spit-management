const jwt = require("jsonwebtoken");

const AT_SECRET_KEY = process.env.AT_SECRET_KEY;
const AT_LIFE = parseInt(process.env.AT_LIFE);

const RT_SECRET_KEY = process.env.RT_SECRET_KEY;
const RT_LIFE = parseInt(process.env.RT_LIFE);

const generateAT = (payload) => {
    return jwt.sign(payload, AT_SECRET_KEY, {
        expiresIn: AT_LIFE,
    });
};

const generateRT = (payload) => {
    return jwt.sign(payload, RT_SECRET_KEY, {
        expiresIn: RT_LIFE,
    });
};

const verifyAT = (accessToken) => {
    try {
        return jwt.verify(accessToken, AT_SECRET_KEY);
    } catch (error) {
        return null;
    }
};

const verifyRT = (refreshToken) => {
    try {
        return jwt.verify(refreshToken, RT_SECRET_KEY);
    } catch (error) {
        return null;
    }
};

module.exports = {
    generateAT,
    generateRT,
    verifyAT,
    verifyRT,
};
