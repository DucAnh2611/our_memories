const { default: mongoose } = require("mongoose");

const ScheduleSchema = mongoose.Schema(
    {
        day: {
            type: Number,
            required: true,
        },
        month: {
            type: Number,
            required: true,
        },
        year: {
            type: Number,
            required: true,
        },
        originDate: {
            type: Date,
            required: true,
        },
        group: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Group",
            required: true,
        },
        data: {
            type: Object,
            required: false,
            default: {},
        },
    },
    {
        timestamps: true,
    }
);

const ScheduleModel = mongoose.model("Schedule", ScheduleSchema);

module.exports = {
    model: ScheduleModel,
    schema: ScheduleSchema,
};
