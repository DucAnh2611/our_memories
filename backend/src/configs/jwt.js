const env = require("../libs/env");

module.exports = {
    key: env.JWT_KEY || "",
    algorithm: env.JWT_ALGORITHM || "HS256",
    expiresIn: env.JWT_EXPIRES_IN || "1h",
};
