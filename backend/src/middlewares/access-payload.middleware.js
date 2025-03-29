function AccessPayloadMiddleware(req, res, next) {
    const { access } = req;
    if (!access) {
        return res.status(401).json({
            status: 401,
            success: false,
            message: "Unauthorized access!",
        });
    }

    return next();
}

module.exports = AccessPayloadMiddleware;
