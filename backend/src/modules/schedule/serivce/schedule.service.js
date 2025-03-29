const SCHEDULE_CONSTANT = require("../../../constants/schedule");
const { schedule } = require("../../../db/models");
const GroupService = require("../../group/service/group.service");

const ScheduleRepository = schedule.model;

const ScheduleService = {
    async list(accessId, groupId, { startDate, limit }) {
        const isInGroup = await GroupService.isInGroup([accessId], groupId);
        if (!isInGroup) {
            return {
                success: false,
                status: 401,
                message: "You are not in this group!",
            };
        }

        if (limit > SCHEDULE_CONSTANT.LIMIT_SCHEDULE_SEARCH_DAYS) {
            return {
                status: 400,
                success: false,
                message: "Limit dates reached!",
            };
        }

        const { day, month, year } = startDate;

        const [schedules, counts] = await ScheduleRepository.findAndCount({
            group: groupId,
            year: { $gte: year },
            month: { $gte: month },
            day: { $gte: day },
        })
            .sort({ originDate: 1 })
            .take(limit);

        return {
            success: true,
            status: 200,
            data: {
                items: schedules,
                total: counts,
            },
        };
    },
    async detail(accessId, scheduleId) {
        const schedule = await ScheduleRepository.findOne({
            _id: scheduleId,
        });
        if (!schedule) {
            return {
                success: false,
                status: 404,
                message: "Schedule not found!",
            };
        }

        const isInGroup = await GroupService.isInGroup(
            [accessId],
            schedule.group.toString()
        );
        if (!isInGroup) {
            return {
                success: false,
                status: 401,
                message: "You are not in this group!",
            };
        }

        return {
            success: true,
            status: 200,
            data: schedule,
        };
    },
    async add(accessId, groupId, scheduleDatas) {
        const isInGroup = await GroupService.isInGroup([accessId], groupId);
        if (!isInGroup) {
            return {
                success: false,
                status: 401,
                message: "You are not in this group!",
            };
        }

        const schedules = scheduleDatas.map((scheduleData) => {
            return {
                ...scheduleData,
                group: groupId,
            };
        });

        await ScheduleRepository.insertMany(schedules);

        return {
            success: true,
            status: 200,
            message: "Create schedule successfully!",
        };
    },
    async update(accessId, { scheduleId, data }) {
        const schedule = await ScheduleRepository.findOne({
            _id: scheduleId,
        });
        if (!schedule) {
            return {
                success: false,
                status: 404,
                message: "Schedule not found!",
            };
        }

        const isInGroup = await GroupService.isInGroup(
            [accessId],
            schedule.group.toString()
        );
        if (!isInGroup) {
            return {
                success: false,
                status: 401,
                message: "You are not in this group!",
            };
        }

        await ScheduleRepository.updateOne(
            { _id: scheduleId },
            { $set: { data } }
        );

        return {
            success: true,
            status: 200,
            message: "Update schedule successfully!",
        };
    },
    async delete(accessId, scheduleId) {
        const schedule = await ScheduleRepository.findOne({
            _id: scheduleId,
        });
        if (!schedule) {
            return {
                success: false,
                status: 404,
                message: "Schedule not found!",
            };
        }

        const isInGroup = await GroupService.isInGroup(
            [accessId],
            schedule.group.toString()
        );
        if (!isInGroup) {
            return {
                success: false,
                status: 401,
                message: "You are not in this group!",
            };
        }

        await ScheduleRepository.deleteOne({ _id: scheduleId });

        return {
            success: true,
            status: 200,
            message: "Delete schedule successfully!",
        };
    },
};

module.exports = ScheduleService;
