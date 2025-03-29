const env = require("../libs/env");

module.exports = {
    AppConfig: require("./app"),
    CookieConfig: require("./cookie"),
    DatabaseConfig: require("./db"),
    JwtConfig: require("./jwt"),
    BcryptConfig: require("./bcrypt"),
};
