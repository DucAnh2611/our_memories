const mongoose = require("mongoose");
const { DatabaseConfig } = require("../configs");

async function initDB() {
    try {
        const conn = await mongoose.connect(DatabaseConfig.mongo.url);
        console.log("[DB] Database connected!");

        return conn;
    } catch (e) {
        console.error("[DB] Database connection error:", e.message);
        return null;
    }
}

module.exports = { initDB };
