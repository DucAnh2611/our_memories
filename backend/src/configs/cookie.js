const env = require("../libs/env");

module.exports = {
    name: env.COOKIE_NAME || "our_memories",
    expires: env.COOKIE_EXPIRE || "7d",
};
