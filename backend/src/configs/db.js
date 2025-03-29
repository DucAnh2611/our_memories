const env = require("../libs/env");

module.exports = {
    mongo: {
        url: env.MONGO_URI || "mongodb://localhost:27017/our_memories",
    },
};
