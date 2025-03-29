const UserService = require("../../user/service/user.service");
const { group } = require("../../../db/models");
const GroupRepository = group.model;

const GroupService = {
    async list(accessId) {
        const groups = await GroupRepository.find({ users: accessId })
            .populate("users", "-password -__v -createdAt -updatedAt")
            .populate("admin", "-password -__v -createdAt -updatedAt");
        return {
            success: true,
            status: 200,
            message: "Get groups successfully!",
            data: groups,
        };
    },
    async detail(accessId, groupId) {
        const isInGroup = await GroupRepository.isInGroup([accessId], groupId);
        if (!isInGroup) {
            return {
                success: false,
                status: 401,
                message: "You are not in this group!",
            };
        }

        const group = await GroupRepository.findOne({ _id: groupId })
            .populate("users", "-password -__v -createdAt -updatedAt")
            .populate("admin", "-password -__v -createdAt -updatedAt");
        if (!group) {
            return {
                success: false,
                status: 404,
                message: "Group not found!",
            };
        }

        return {
            success: true,
            status: 200,
            message: "Get group successfully!",
            data: { ...group.toObject() },
        };
    },
    async create(accessId, { userIds, data }) {
        const isValidIds = await UserService.checkExist([...userIds, accessId]);
        if (!isValidIds) {
            return {
                success: false,
                status: 401,
                message: "Users not found!",
            };
        }
        const group = await GroupRepository.create({
            users: [...userIds, accessId],
            data: data,
            admin: accessId,
        });

        return {
            success: true,
            status: 200,
            message: "Create group successfully!",
            data: {
                _id: group._id,
                users: group.users,
                data: group.data,
            },
        };
    },
    async update(accessId, { userIds, data, groupId, admin }) {
        const group = await GroupRepository.findOne({ _id: groupId });
        if (!group) {
            return {
                success: false,
                status: 404,
                message: "Group not found!",
            };
        }

        if (!group.admin.equals(accessId)) {
            return {
                success: false,
                status: 401,
                message: "You are not admin of this group!",
            };
        }

        const isInGroup = await GroupRepository.isInGroup([accessId], groupId);
        if (!isInGroup) {
            return {
                success: false,
                status: 401,
                message: "You are not in this group!",
            };
        }

        const isValidIds = await UserService.checkExist(userIds);
        if (!isValidIds) {
            return {
                success: false,
                status: 401,
                message: "Users not found!",
            };
        }

        const updatedGroup = await GroupRepository.updateOne(
            { _id: groupId },
            {
                users: userIds,
                data,
                admin,
            }
        );
        return {
            success: true,
            status: 200,
            message: "Update group successfully!",
            data: {
                _id: updatedGroup._id,
                users: updatedGroup.users,
                data: updatedGroup.data,
            },
        };
    },
    async delete(accessId, groupId) {
        const isInGroup = await GroupRepository.isInGroup([accessId], groupId);
        if (!isInGroup) {
            return {
                success: false,
                status: 401,
                message: "You are not in this group!",
            };
        }

        const group = await GroupRepository.findOne({ _id: groupId });
        if (!group.admin.equals(accessId)) {
            return {
                success: false,
                status: 401,
                message: "You are not admin of this group!",
            };
        }

        await GroupRepository.deleteMany({ _id: groupId });
        return {
            success: true,
            status: 200,
            message: "Delete group successfully!",
        };
    },

    async isInGroup(ids, groupId) {
        const group = await GroupRepository.findOne({ _id: groupId });
        if (!group) {
            return false;
        }

        const isInGroup = ids.every((id) => group.users.includes(id));

        return isInGroup;
    },
};

module.exports = GroupService;
