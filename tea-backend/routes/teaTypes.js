// routes/teaTypes.js
const express = require("express");
const router = express.Router();
const db = require("../db");

// GET all tea types
router.get("/", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM tea_types");
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch tea types" });
  }
});

// OPTIONAL: GET a single tea type by ID
router.get("/:id", async (req, res) => {
  const teaTypeId = req.params.id;

  try {
    const [rows] = await db.query("SELECT * FROM tea_types WHERE id = ?", [teaTypeId]);
    if (rows.length === 0) {
      return res.status(404).json({ error: "Tea type not found" });
    }
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch tea type" });
  }
});

// ADD a new tea type
router.post("/", async (req, res) => {
  const { name, quality, quantity, price } = req.body;

  try {
    await db.query(
      "INSERT INTO tea_types (name, quality, quantity, price) VALUES (?, ?, ?, ?)",
      [name, quality, quantity, price]
    );
    res.status(201).json({ message: "Tea type added successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add tea type" });
  }
});

// UPDATE a tea type
router.put("/:id", async (req, res) => {
  const teaTypeId = req.params.id;
  const { name, quality, quantity, price } = req.body;

  try {
    await db.query(
      "UPDATE tea_types SET name = ?, quality = ?, quantity = ?, price = ? WHERE id = ?",
      [name, quality, quantity, price, teaTypeId]
    );
    res.json({ message: "Tea type updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update tea type" });
  }
});

// DELETE a tea type
router.delete("/:id", async (req, res) => {
  const teaTypeId = req.params.id;

  try {
    await db.query("DELETE FROM tea_types WHERE id = ?", [teaTypeId]);
    res.json({ message: "Tea type deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete tea type" });
  }
});

module.exports = router;
