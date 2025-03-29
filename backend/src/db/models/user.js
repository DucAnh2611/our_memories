const { default: mongoose } = require("mongoose");
const { bcryptHelper } = require("../../helpers");
const { BcryptConfig, AppConfig } = require("../../configs");

const UserSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
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

UserSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        let key = BcryptConfig.userPasswordKey;

        this.password = await bcryptHelper.hash(
            this.password,
            key,
            BcryptConfig.saltRounds
        );
    }
    next();
});

UserSchema.pre("update", async function (next) {
    if (this.isModified("password")) {
        let key = BcryptConfig.userPasswordKey;

        this.password = await bcryptHelper.hash(
            this.password,
            key,
            BcryptConfig.saltRounds
        );
    }
    next();
});

const UserModel = mongoose.model("User", UserSchema);

module.exports = {
    model: UserModel,
    schema: UserSchema,
};
