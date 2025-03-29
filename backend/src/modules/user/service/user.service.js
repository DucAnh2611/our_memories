const { JwtConfig, BcryptConfig } = require("../../../configs");
const { user } = require("../../../db/models");
const { bcryptHelper, JwtHelper } = require("../../../helpers");

const UserRepository = user.model;

const UserService = {
    async find() {
        const users = await UserRepository.find({}).select("-password");
        return {
            success: true,
            status: 200,
            message: "Get all users successfully!",
            data: users,
        };
    },
    async detail(accessId, id) {
        if (accessId !== id && !!id) {
            return {
                success: false,
                status: 401,
                message: "You don't have permission to view this user!",
            };
        }
        const user = await UserRepository.findOne({ _id: id }).select(
            "-password"
        );
        if (!user) {
            return {
                success: false,
                status: 404,
                message: "User not found!",
            };
        }
        return {
            success: true,
            status: 200,
            message: "Get user successfully!",
            data: user.toObject(),
        };
    },
    async login({ username, password }) {
        const user = await UserService.existUsername(username, "non_exist");
        if (!user) {
            return {
                success: false,
                status: 401,
                message: "User not found!",
            };
        }

        const isMatchPassword = await bcryptHelper.compare(
            password,
            user.password,
            BcryptConfig.userPasswordKey
        );
        if (!isMatchPassword) {
            return {
                success: false,
                status: 401,
                message: "Password is incorrect!",
            };
        }

        const userData = user.toObject();

        return {
            success: true,
            status: 200,
            message: "Login successfully!",
            data: {
                token: JwtHelper.generate(
                    {
                        _id: userData._id,
                        username: userData.username,
                    },
                    JwtConfig.key,
                    JwtConfig.expiresIn
                ),
            },
        };
    },
    async logout(accessId) {
        const user = await UserRepository.findOne({ _id: accessId });
        if (!user) {
            return {
                success: false,
                status: 401,
                message: "User not found!",
            };
        }
        return {
            success: true,
            status: 200,
            message: "Logout successfully!",
        };
    },
    async create({ username, password }) {
        const user = await UserService.existUsername(username, "exist");
        if (!user) {
            return {
                success: false,
                status: 401,
                message: "User existed!",
            };
        }

        const newUser = await UserRepository.create({
            username: username,
            password,
        });

        return {
            success: true,
            status: 200,
            message: "Create user successfully!",
            data: {
                _id: newUser._id,
                username: newUser.username,
            },
        };
    },
    async update(accessId, { id, password, data }) {
        if (accessId !== id && !!id) {
            return {
                success: false,
                status: 401,
                message: "You don't have permission to update this user!",
            };
        }

        const user = await UserRepository.findOne({ _id: id });
        if (!user) {
            return {
                success: false,
                status: 404,
                message: "User not found!",
            };
        }

        await UserRepository.findByIdAndUpdate(
            id,
            { password, data },
            {
                new: true,
            }
        );

        return {
            success: true,
            status: 200,
            message: "Update user successfully!",
        };
    },
    async delete(accessId, { ids }) {
        await UserRepository.deleteMany({ _id: { $in: ids } });
        return {
            success: true,
            status: 200,
            message: "Delete user successfully!",
        };
    },
    async existUsername(username, throwOn = "non_exist") {
        const user = await UserRepository.findOne({ username: username });
        if (
            (throwOn === "non_exist" && !user) ||
            (throwOn === "exist" && user)
        ) {
            return false;
        }

        return user || true;
    },
    async checkExist(ids) {
        if (!Array.isArray(ids) || ids.length === 0) {
            return false;
        }

        userCount = await UserRepository.countDocument({ _id: { $in: ids } });

        if (userCount.length !== ids.length) {
            return false;
        }
        return true;
    },
};

module.exports = UserService;
