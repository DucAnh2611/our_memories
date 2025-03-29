const timeToMilliseconds = (input = "") => {
    const match = input.match(/^(\d+)([dhms])$/);

    if (!match) {
        throw new Error(
            "Invalid format. Use <amount><d|h|m|s>, e.g., '5d', '3h', '10m', '30s'"
        );
    }

    const amount = parseInt(match[1], 10);
    const unit = match[2];

    if (unit === "s") return amount * 1000;

    const nextUnit = { d: "h", h: "m", m: "s" };
    const multiplier = { d: 24, h: 60, m: 60 };

    return amount * multiplier[unit] * timeToMilliseconds(`1${nextUnit[unit]}`);
};

module.exports = { timeToMilliseconds };
