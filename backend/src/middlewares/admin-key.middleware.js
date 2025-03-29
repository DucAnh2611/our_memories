const { AppConfig } = require("../configs");

function AdminKeyMiddleware(req, res, next) {
    const { adminkey } = req.headers;
    if (!adminkey) {
        return res.status(401).json({
            success: false,
            message: "Admin key is required!",
        });
    }

    const appAdminKey = AppConfig.adminKey;
    if (!appAdminKey) {
        return res.status(500).json({
            success: false,
            message: "Admin key is not configured!",
        });
    }

    if (!(adminkey === appAdminKey)) {
        return res.status(401).json({
            success: false,
            message: "Admin key is incorrect!",
        });
    }

    next();
}

module.exports = AdminKeyMiddleware;
