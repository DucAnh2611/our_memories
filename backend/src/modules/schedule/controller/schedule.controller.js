const ScheduleService = require("../serivce/schedule.service");

const ScheduleController = {
    async list(req, res) {
        const { accessId } = req.access;
        const { groupId } = req.params;
        const { startDate, limit } = req.body;

        const list = await ScheduleService.list(accessId, groupId, {
            startDate,
            limit,
        });

        return res.status(list.status).json(list);
    },
    async detail(req, res) {
        const { accessId } = req.access;
        const { id: scheduleId } = req.params;

        const detail = await ScheduleService.detail(accessId, scheduleId);

        return res.status(list.status).json(detail);
    },
    async add(req, res) {
        const { accessId } = req.access;
        const { groupId } = req.params;
        const { data } = req.params;

        const added = await ScheduleService.add(accessId, groupId, data);

        return res.status(added.status).json(added);
    },
    async update(req, res) {
        const { accessId } = req.access;
        const { id: scheduleId } = req.params;
        const { data } = req.body;

        const updated = await ScheduleService.update(accessId, {
            scheduleId,
            data,
        });

        return res.status(updated.status).json(updated);
    },
    async delete(req, res) {
        const { accessId } = req.access;
        const { id: scheduleId } = req.params;

        const removed = await ScheduleService.delete(accessId, scheduleId);

        return res.status(removed.status).json(removed);
    },
};

module.exports = ScheduleController;
