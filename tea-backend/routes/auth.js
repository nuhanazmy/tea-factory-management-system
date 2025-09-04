const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../db");

const router = express.Router();

// Secret key for JWT
const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key_here";

// REGISTER Route (Missing in your code — this must be added)
router.post("/register", async (req, res) => {
  const {
    userType,
    orgName,
    regNo,
    address,
    location,
    incharge,
    contact,
    email,
    username,
    password
  } = req.body;

  if (
    !userType ||
    !orgName ||
    !regNo ||
    !address ||
    !location ||
    !incharge ||
    !contact ||
    !email ||
    !username ||
    !password
  ) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    // Check for existing user
    const [existingUser] = await db.query("SELECT id FROM users WHERE username = ?", [username]);
    if (existingUser.length > 0) {
      return res.status(409).json({ error: "Username already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.query(
      `INSERT INTO users (username, password, role, email, orgName, regNo, address, location, incharge, contact)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [username, hashedPassword, userType, email, orgName, regNo, address, location, incharge, contact]
    );

    return res.status(201).json({ message: "Registration successful." });
  } catch (err) {
    console.error("Error during registration:", err);
    return res.status(500).json({ error: "Server error during registration." });
  }
});

// LOGIN Route (you already have this)
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const [rows] = await db.query("SELECT * FROM users WHERE username = ?", [username]);

    if (!rows.length) {
      return res.status(401).json({ error: "Invalid credentials." });
    }

    const user = rows[0];
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ error: "Invalid credentials." });

    const payload = {
      id: user.id,
      role: user.role,
      username: user.username,
    };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1d" });

    res.json({
      token,
      user: payload,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error." });
  }
});

module.exports = { router };
