const express = require("express");
const db = require("../db");
const router = express.Router();

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const [rows] = await db.query("SELECT * FROM factories WHERE id = ?", [id]);

    if (!rows.length) {
      return res.status(404).json({ message: "Factory not found" });
    }

    const factory = rows[0];

    const [teaTypeRow] = await db.query("SELECT name FROM tea_types WHERE id = ?", [factory.tea_type_id]);
    const teaTypeName = teaTypeRow.length ? teaTypeRow[0].name : "Unknown";
res.json({
  id: factory.id,
  name: factory.name,
  teaType: teaTypeName,
  tea_type_id: factory.tea_type_id,  // ✅ THIS LINE IS REQUIRED
  quality: factory.quality,
  quantityKg: factory.quantity_kg,
  pricePerKg: factory.price_per_kg,
  fuelAvailable: factory.fuel_available,
  contact: factory.contact,
});

  } catch (err) {
    console.error("Error fetching factory:", err);
    res.status(500).json({ message: "Server error while fetching factory" });
  }
});

module.exports = router;
