const mysql = require("mysql2/promise");
require("dotenv").config();

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

db.getConnection()
  .then(() => console.log("✅ Connected to the database"))
  .catch((err) => console.error("❌ Database connection failed:", err));

module.exports = db;
