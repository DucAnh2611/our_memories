const jwt = require("jsonwebtoken");
const { JwtConfig } = require("../configs");

const generateToken = (payload, key, expires) => {
    if (!key) {
        throw new Error("Key is required to generate token!");
    }
    const token = jwt.sign(payload, key, {
        algorithm: JwtConfig.algorithm,
        expiresIn: expires,
    });

    return token;
};

const verifyToken = (token, key) => {
    if (!key) {
        throw new Error("Key is required to verify token!");
    }
    return jwt.verify(token, key);
};

module.exports = {
    generate: generateToken,
    verify: verifyToken,
};
