const { default: mongoose } = require("mongoose");

const GroupSchema = mongoose.Schema(
    {
        users: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
                required: true,
            },
        ],
        admin: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        data: {
            type: Object,
            required: false,
            default: {},
        },
    },
    { timestamps: true }
);

const GroupModel = mongoose.model("Group", GroupSchema);

module.exports = {
    model: GroupModel,
    schema: GroupSchema,
};
