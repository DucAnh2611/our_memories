const env = require("../libs/env");

module.exports = {
    port: env.PORT || 3001,
    enviroment: env.ENVIROMENT || "dev",
    cors: {
        origin: JSON.parse(env.CORS_ORIGIN || '["*"]') || "*",
        methods: env.CORS_METHODS || "GET,HEAD,PUT,PATCH,POST,DELETE",
        credentials: env.CORS_CREDENTIALS || false,
    },
    adminKey: env.ADMIN_KEY || null,
};
