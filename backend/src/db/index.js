const mongoose = require("mongoose");
const { DatabaseConfig } = require("../configs");

let connFailed = true;

async function initDB() {
    try {
        const conn = await mongoose.connect(DatabaseConfig.mongo.url);
        console.log("[DB] Database connected!");
        connFailed = false;

        return conn;
    } catch (e) {
        connFailed = true;
        console.error("[DB] Database connection error:", e.message);
        return null;
    }
}

module.exports = { initDB, connFailed };
