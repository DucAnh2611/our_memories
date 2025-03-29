const bcrypt = require("bcrypt");

const generateSalt = async (saltRounds) => {
    if (!saltRounds) {
        throw new Error("Salt rounds not provided!");
    }
    return await bcrypt.genSalt(saltRounds);
};

const hash = async (data, key = "", saltRounds) => {
    const salt = await generateSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(JSON.stringify(data) + key, salt);
    return hashedPassword;
};

const compare = async (data, storedHash, key) => {
    return await bcrypt.compare(JSON.stringify(data) + key, storedHash);
};

const bcryptHelper = {
    getSalt: generateSalt,
    compare,
    hash,
};

module.exports = bcryptHelper;
