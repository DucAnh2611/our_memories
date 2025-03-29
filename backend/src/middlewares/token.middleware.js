const { CookieConfig, JwtConfig } = require("../configs");
const jwtHelper = require("../helpers/jwt.helper");

const CookieMiddleware =
    ({ checkExist = false }) =>
    async (req, res, next) => {
        const cookieData = req.cookies[CookieConfig.name];
        if (!cookieData || !accessPayload.token) {
            return res.status(401).json({
                status: 401,
                success: false,
                message: "Unauthorized",
            });
        }

        try {
            const accessPayload = JSON.parse(cookieData);

            const verified = jwtHelper.verify(
                accessPayload.token,
                JwtConfig.key
            );
            if (!verified) {
                return res.status(401).json({
                    status: 401,
                    success: false,
                    message: "Unauthorized",
                });
            }

            req.access = verified;
            if (checkExist) {
                const user = await UserService.existUsername(
                    verified.username,
                    "exist"
                );
                if (!user) {
                    return res.status(401).json({
                        status: 401,
                        success: false,
                        message: "User is not exist!",
                    });
                }
            }

            return next();
        } catch (error) {
            console.log("[COOKIE_MIDDLEWARE] Error: ", error);
            return res.status(500).json({
                status: 500,
                success: false,
                message: "Internal Server Error",
            });
        }
    };

module.exports = CookieMiddleware;
