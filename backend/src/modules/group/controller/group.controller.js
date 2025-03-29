const GroupService = require("../service/group.service");

const GroupController = {
    async list(req, res) {
        const { accessId } = req.access;

        const list = await GroupService.list(accessId);

        return res.status(list.status).json(list);
    },
    async detail(req, res) {
        const { accessId } = req.access;
        const { id: groupId } = req.params;

        const detail = await GroupService.detail(accessId, groupId);

        return res.status(detail.status).json(detail);
    },
    async create(req, res) {
        const { accessId } = req.access;
        const { userIds, data } = req.body;

        const create = await GroupService.create(accessId, { userIds, data });

        return res.status(create.status).json(create);
    },
    async update(req, res) {
        const { accessId } = req.access;
        const { id: groupId } = req.params;
        const { data, admin, userIds } = req.body;

        const update = await GroupService.update(accessId, {
            groupId,
            data,
            admin,
            userIds,
        });

        return res.status(update.status).json(update);
    },
    async delete(req, res) {
        const { accessId } = req.access;
        const { id: groupId } = req.params;

        const remove = await GroupService.delete(accessId, groupId);

        return res.status(remove.status).json(remove);
    },
};

module.exports = GroupController;
