const { CookieConfig } = require("../../../configs");
const { timeToMilliseconds } = require("../../../utils/time");
const UserService = require("../service/user.service");

const UserController = {
    find: async (req, res) => {
        const { id: accessId } = req.access;

        const result = await UserService.find(accessId);

        return res.status(result.status).json(result);
    },
    detail: async (req, res) => {
        const { id: accessId } = req.access;
        const { id } = req.params;

        const result = await UserService.detail(accessId, id);

        return res.status(result.status).json(result);
    },
    login: async (req, res) => {
        const { username, password } = req.body;

        const result = await UserService.login({ username, password });

        if (result.success) {
            res.cookie(
                CookieConfig.name,
                JSON.stringify({ token: result.data.token }),
                {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "prod",
                    sameSite: "strict",
                    maxAge: timeToMilliseconds(CookieConfig.expires),
                }
            );
        }

        return res.status(result.status).json(result);
    },
    create: async (req, res) => {
        const { username, password } = req.body;

        const result = await UserService.create({ username, password });

        return res.status(result.status).json(result);
    },
    update: async (req, res) => {
        const { password, data } = req.body;
        const { id: userId } = req.params;
        const { id: accessId } = req.access;

        const result = await UserService.update(accessId, {
            id: userId,
            password,
            data,
        });

        return res.status(result.status).json(result);
    },
    delete: async (req, res) => {
        const { ids } = req.body;
        const { id: accessId } = req.access;

        const result = await UserService.delete(accessId, { ids });

        return res.status(result.status).json(result);
    },
    logout: async (req, res) => {
        const { id: accessId } = req.access;

        const result = await UserService.logout(accessId);
        if (result.success) {
            res.clearCookie(CookieConfig.name);
        }

        return res.status(result.status).json(result);
    },
};

module.exports = UserController;
