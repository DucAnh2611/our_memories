const env = require("../libs/env");

module.exports = {
    saltRounds: parseInt(env.BCRYPT_SALT_ROUNDS || 0),
    userPasswordKey: env.BCRYPT_USER_PASSWORD_KEY || null,
};
