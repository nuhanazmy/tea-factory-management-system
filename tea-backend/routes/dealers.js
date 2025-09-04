const express = require("express");
const router = express.Router();
const db = require("../db");

// GET all dealers
router.get("/", async (req, res) => {
  try {
    const [dealers] = await db.query(
      "SELECT id, username AS name, contact, email, active FROM users WHERE role = 'dealer'"
    );
    res.json(dealers);
  } catch (err) {
    console.error("Error fetching dealers:", err);
    res.status(500).json({ error: "Server error fetching dealers." });
  }
});

// PUT to toggle dealer active status
router.put("/:id/status", async (req, res) => {
  const { id } = req.params;
  const { active } = req.body;

  try {
    await db.query("UPDATE users SET active = ? WHERE id = ? AND role = 'dealer'", [active, id]);
    res.json({ message: "Status updated successfully" });
  } catch (err) {
    console.error("Error updating status:", err);
    res.status(500).json({ error: "Failed to update status" });
  }
});

// DELETE a dealer
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await db.query("DELETE FROM users WHERE id = ? AND role = 'dealer'", [id]);
    res.json({ message: "Dealer deleted successfully" });
  } catch (err) {
    console.error("Error deleting dealer:", err);
    res.status(500).json({ error: "Failed to delete dealer" });
  }
});

module.exports = router;
