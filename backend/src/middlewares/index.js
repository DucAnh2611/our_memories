const AccessPayloadMiddleware = require("./access-payload.middleware");
const AdminKeyMiddleware = require("./admin-key.middleware");
const CookieMiddleware = require("./token.middleware");

module.exports = {
    AppSetupMiddleware: require("./app.middleware"),
    AdminKeyMiddleware,
    CookieMiddleware,
    AccessPayloadMiddleware,
};
